<script>
import vue2Dropzone from "vue2-dropzone";
import FileTemplate from "./file-template.vue"
var Minio = require('minio')
 
// Instantiate the minio client with the endpoint
// and access keys as shown below.
 
 
var s3Client = new Minio.Client({
    endPoint:  's3.dvclab.com',
    accessKey: 'HNGU1VB7FDD4WYQ537BD',
    secretKey: 'gDaPHd6CwgDYUafDtE3rLgnz7CAJ1wxHu23DrNhT'
    // secretKey: 'YYM1XF9VQMI3P90F0Q0RD6122GVEZJXXDTZMMII',
    // accessKey: 'IugELbZbxF9YTFgRPBr' ,
    // sessionToken: '2ISrrBv9aP2+pIs+Jj8kkyRUTpCIUP78U9Ge5I2WBiM+gpbAtLu2VCJB1vLdogPHSuLIlG9LEMp757xs1Iwy2c+1JWqNgImT2rV4XCdZx+4CplKpYfeEQNDmzuxdzmX5oFT1eL5NM32bGv0V8n5/75tzsBM5LuosFMrt4wHegH7JdK/m3TDhnSqcVE6uoM6ddNPhghP+8dtMj7sVK3dfT+LAW5YVbPITHjVnX3JSmY1Oc32ZHDTRR8WYpVwUgPFRMCB317AZAfcahDGahWXAWeq++JKtJaPtDno2rmDvDCAyS6/wB3FhaIGvZoylbjHrlSUzMaKRROhxU8/Er3oxfTnKmiEXoz06ajTn1Cs1AZTzooubegvkoV643P3PDlndH/vFfH05KM4W/+JAF0rSdDODUl3plffGPNLYBTOroRLqMkX6RH62xM27O+m0oFYTduX2gM2KC8Y+m/33Y+UGww=='
})
/**
 * File-manager component
 */
export default {
  props: {
    datasetname: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropzoneOptions: {
        url: "",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" },
        chunking: true,
        chunkSize: 500, // Bytes
        thumbnailHeight: 150,
        addRemoveLinks: true
      },
      viewUpload: false,
      objStream: [],
      myString: '',
      myJson: {},
      bucketname: this.datasetname,
    };
  },
  components: {vueDropzone: vue2Dropzone, FileTemplate},
  mounted() {
    this.listFiles();
  },
  methods: {
    listFiles(){
      // 创建一个新的bucket
      // s3Client.makeBucket('mybucket', 'us-east-1', function(err){
      //   if (err) return console.log('Error creating bucket.', err)
      //   console.log('Bucket created successfully in "us-east-1".')
      // })

      // 列举某一bucket中的文件对象
      this.objStream = [];
      var stream = s3Client.extensions.listObjectsV2WithMetadata(this.datasetname,'', false,'');
      stream.on('data', data => {
        this.objStream.push(data);
        console.log(this.objStream);
      })
    },
    // 展示上传文件的组件
    touploadFile() {
      this.viewUpload = true
    },
    // 返回查看文件列表
    returnViewFile() {
      this.viewUpload = false
    },
    // 上传文件
    uploadFilee() {
      // expires in a day.q
      var files = document.querySelector("#dropzone").files;
      console.log(files);
    },
      // `upload` iterates through all files selected and invokes a helper function called `retrieveNewURL`.
    upload(bucket) {
          // Get selected files from the input element.
          var files = document.querySelector("#selector").files;
          console.log(files);
          for (var i = 0; i < files.length; i++) {
              var file = files[i];
              // Retrieve a URL from our server.
              this.retrieveNewURL(bucket, file, (file, url) => {
                  // Upload the file to the server.
                  this.uploadFile(file, url);
              });
          }
    },
    retrieveNewURLL(bucket, file) {
        var fileName = file.name;
        s3Client.presignedPutObject(bucket,fileName, 24*60*60, function(err, presignedUrl) {
          if (err) return console.log(err);
          this.dropzoneOptions.url = presignedUrl;
          //return presignedUrl;
          // url = presignedUrl
        });
    },

    // `retrieveNewURL` accepts the name of the current file and invokes the `/presignedUrl` endpoint to
    // generate a pre-signed URL for use in uploading that file: 
    retrieveNewURL(bucket, file, cb) {
        var fileName = file.name;
        s3Client.presignedPutObject(bucket,fileName, 24*60*60, function(err, presignedUrl) {
          if (err) return console.log(err)
          cb(file, presignedUrl);
          // url = presignedUrl
        });
    },
    // ``uploadFile` accepts the current filename and the pre-signed URL. It then uses `Fetch API`
    // to upload this file to S3 at `play.min.io:9000` using the URL:
    uploadFile(file, url) {
        // if (document.querySelector('#status').innerText === 'No uploads') {
        //     document.querySelector('#status').innerHTML = '';
        // }
        fetch(url, {
            method: 'PUT',
            body: file
        }).then(() => {
            // If multiple files are uploaded, append upload status on the next line.
            // document.querySelector('#status').innerHTML += `<br>Uploaded ${file.name}.`;
            this.objStream = [];
            this.listFiles();
            this.viewUpload = false
        }).catch((e) => {
            console.error(e);
        });
    }
  },
  
}
</script>

<template>
    <div class="d-xl-flex">
      <div class="w-100">
        <div class="d-md-flex">
          <div class="w-100">
            <div class="card">
              <!-- 文件浏览 -->
              <div class="card-body" v-if="!viewUpload">
                <div>
                  <div class="row mb-3">
                    <div class="col-xl-3 col-sm-6">
                      <div class="mt-2">
                        <!-- <h5>文件浏览</h5> -->
                        <h5>{{datasetname}}</h5>
                      </div>
                    </div>
                    <div class="col-xl-9 col-sm-6">
                      <form
                        class="mt-4 mt-sm-0 float-sm-end d-flex align-items-center"
                      > 
                        <!-- <div class="btn btn-primary mb-2" title="上传文件" @click="listFiles">
                          测试
                        </div> -->
                        <div class="search-box mb-2 me-2">
                          <div class="position-relative">
                            <input
                              type="text"
                              class="form-control bg-light border-light rounded"
                              placeholder="搜索文件..."
                            />
                            <i class="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>
                        <div class="btn btn-primary mb-2" title="上传文件">
                          <i class="bx bx-upload " style="font-size: 15px;" @click="touploadFile"></i>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <!-- My File内容，文件浏览 -->
                <div>
                  <div class="row">
                    <FileTemplate  v-for="item in objStream" :key="item.id" :file="item" :bucket="datasetname" :fileList="objStream" />
                  </div>
                  <!-- end row -->
                </div>
                 </div>
              <!-- 上传文件 -->
              <div class="row card-body" v-else>
                <div>
                  <div class="row mb-3">
                    <div class="col-xl-3 col-sm-6">
                      <div class="mt-2">
                        <h5>上传文件</h5>
                      </div>
                    </div>
                    <div class="col-xl-9 col-sm-6">
                      <form
                        class="mt-4 mt-sm-0 float-sm-end d-flex align-items-center"
                      >
                        <div class="btn btn-primary mb-2" title="返回">
                          <i class="bx bx-arrow-back" style="font-size: 15px;" @click="returnViewFile"></i>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="mb-4">
                    <div>
                      <!-- <vue-dropzone
                        id="dropzone"
                        ref="myVueDropzone"
                        :use-custom-slot="true"
                        :options="dropzoneOptions"
                        @vdropzone-file-added="retrieveNewURLL(bucket, file)"
                      > -->
                      <vue-dropzone
                      :use-custom-slot="true"
                      >
                        <div class="dropzone-custom-content">
                          <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                          <h5>拖拽文件到此处或点击上传</h5>
                        </div>
                      </vue-dropzone>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12 text-center">
                      <button type="submit" class="btn btn-success me-2" @click="uploadFilee">上传</button>
                      <button class="btn btn-secondary" @click="returnViewFile">取消</button>
                    </div>
                  </div>
                  
                </div>
                <div class="mt-3">
                  <input type="file" id="selector" multiple>
                  <button @click="upload(datasetname)" class="btn btn-secondary">Upload</button>
                  <!-- <div id="status">No uploads</div> -->
                </div>
              </div>
            </div>
            <!-- end card -->
          </div>
          <!-- end w-100 -->
        </div>
        
      </div>

    </div>
    <!-- end row -->
</template>