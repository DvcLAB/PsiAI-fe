<script>
import vue2Dropzone from "vue2-dropzone";
import FileTemplate from "./file-template.vue"
var Minio = require('minio')
 
// Instantiate the minio client with the endpoint
// and access keys as shown below.
 
 
var s3Client = new Minio.Client({
    endPoint:  's3.dvclab.com',
    accessKey: '7AU2ABLFK9VB2CWZB1JM',
    secretKey: 'WNS7mbQPqdb4l7GJsBcOtOWds5SnesvyleuKIoNl'
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
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
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
      var stream = s3Client.listObjectsV2(this.datasetname,'', true,'');
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
    uploadFile() {
      var buffer = 'Hello World'
      s3Client.putObject(this.bucketname, 'hello-file', buffer, function(err, etag) {
        return console.log(err, etag) // err should be null
      })
      this.listFiles();
      this.viewUpload = false
    },
  },
};
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
                    <!-- <label class="col-form-label col-lg-2">上传文件</label> -->
                    <div>
                      <vue-dropzone
                        id="dropzone"
                        ref="myVueDropzone"
                        :use-custom-slot="true"
                        :options="dropzoneOptions"
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
                      <button type="submit" class="btn btn-success me-2" @click="uploadFile">上传</button>
                      <button class="btn btn-secondary" @click="returnViewFile">取消</button>
                    </div>
                  </div>
                  
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