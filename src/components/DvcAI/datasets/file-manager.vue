<script>
import vue2Dropzone from "vue2-dropzone";
import FileUpdate from "./file-manager-update.vue"
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
        url: 'http://localhost',
        method: 'PUT',
        autoProcessQueue: false,
        // thumbnailWidth: 150,
        // maxFilesize: 500,
        

      },
      signurl: '',
      objStream: [],
    };
  },
  components: {vueDropzone: vue2Dropzone, FileUpdate},
  mounted() {
    // this.listFiles();
  },
  methods: {
    listFiles(){

      // 列举某一bucket中的文件对象
      this.objStream = [];
      var stream = s3Client.extensions.listObjectsV2WithMetadata(this.datasetname,'', false,'');
      stream.on('data', data => {
        this.objStream.push(data);
        console.log("objStream:"+data);
      })
    },

    // 返回查看文件列表
    returnViewFile() {
      this.$store.commit('datasets/returnViewFile')
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
    },


    // 使用vue-dropzone
    sending(file, xhr) {
      const _send = xhr.send
      xhr.send = () => {
        _send.call(xhr, file)
      }
    },
    uploadFilee(bucket) {
      var files = this.$refs.myVueDropzone.getAcceptedFiles()
      console.log('files'+files);
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // Retrieve a URL from our server.
        this.retrieveNewURL(bucket, file, (file, url) => {
            // Upload the file to the server.
          this.$refs.myVueDropzone.dropzone.options.url = url;
          this.$refs.myVueDropzone.processQueue();
        })
      }
    },

    uploadFileee(bucket) {
      this.uploadFilee(bucket)
      // console.log("出来了")
      // this.objStream = []
      // this.listFiles()
      // this.returnViewFile()
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
              <FileUpdate v-if="!this.$store.state.datasets.viewUpload" :datasetname="datasetname" :key="this.$store.state.datasets.objStream.length"/>
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
                      <vue-dropzone
                        ref="myVueDropzone"
                        id="dropzone"
                        :options="dropzoneOptions"
                        @vdropzone-sending="sending"
                        :use-custom-slot="true"
                        method="PUT"
                      >
                      <!-- <vue-dropzone
                      :use-custom-slot="true"
                      > -->
                        <div class="dropzone-custom-content">
                          <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                          <h5>拖拽文件到此处或点击上传</h5>
                        </div>
                      </vue-dropzone>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12 text-center">
                      <!-- <textarea v-model="signurl" placeholder="Signed URL" class="signedurl"></textarea> -->
                      <button type="submit" @click="uploadFilee(datasetname)" class="btn btn-success me-2">上传</button>
                      <button class="btn btn-secondary" @click="returnViewFile">取消</button>
                    </div>
                  </div>
                  
                </div>
                <div class="mt-3">
                  <div class="file-upload">
                    <div class="btn btn-success me-2">选择文件</div>
                    <input name="upfile" class="file-upload-input" id="selecto"  type="file" multiple>
                    <!-- <input type="file" id="selector" multiple> -->
                  </div>
                  
                  <button @click="upload(datasetname)" class="btn btn-secondary">上传</button>
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
<style>
 .file-upload {
        /* width: 60px; */
        height: 26px;
        position: relative;
        /* overflow: hidden; */
        /* border: 1px solid #0F996B ; */
        display: inline-block;
        border-radius: 4px;
        font-size: 12px;
        color: #0F996B;
        text-align: center;
        line-height: 26px;
        /* float: right; */
        margin: 10px 0 auto auto;
    }
.file-upload-input {
        background-color: transparent;
        position: absolute;
        width: 999px;
        height: 999px;
        top: -10px;
        right: -10px;
        cursor: pointer;
    }
.signedurl {
  margin-top: 30px;
  border: 1px solid #ccc;
  width: 97%;
  height: 200px;
  padding: 10px;
}
</style>