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
        uploadMultiple: true
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
        console.log("objStream:"+data)
      })
    },

    // 返回查看文件列表
    returnViewFile() {
      console.log("返回查看文件列表")
      this.$store.commit('datasets/returnViewFile')
    },

    multipleSuccess(files, response){
      console.log("response"+response)
      console.log("files"+files)
      this.returnViewFile()
    },

    // 使用vue-dropzone
    sending(file, xhr) {
      const _send = xhr.send
      xhr.send = () => {
        _send.call(xhr, file)
      }
    },
    retrieveNewURL(bucket, file, cb) {
      var fileName = file.name;
      s3Client.presignedPutObject(bucket,fileName, 24*60*60, function(err, presignedUrl) {
        if (err) return console.log(err)
        cb(file, presignedUrl);
      });
    },
    uploadFile(bucket) {
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
                        @vdropzone-success-multiple="multipleSuccess"
                      >
                      <!-- <vue-dropzone
                      :use-custom-slot="true"
                      @vdropzone-complete-multiple="returnViewFile"
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
                      <button type="submit" @click="uploadFile(datasetname)" class="btn btn-success me-2">上传</button>
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