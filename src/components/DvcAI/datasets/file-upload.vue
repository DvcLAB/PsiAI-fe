<script>
import vue2Dropzone from "vue2-dropzone";
var Minio = require('minio')
var s3Client = new Minio.Client({
    endPoint:  's3.dvclab.com',
    accessKey: 'HNGU1VB7FDD4WYQ537BD',
    secretKey: 'gDaPHd6CwgDYUafDtE3rLgnz7CAJ1wxHu23DrNhT'
    })
export default {
  props: {
    datasetname: {
      type: String,
      default: '',
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
    };
  },
  components: {vueDropzone: vue2Dropzone},
  methods: {
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
      s3Client.presignedPutObject(bucket, fileName, 24*60*60, function(err, presignedUrl) {
        if (err) return console.log(err)
        cb(file, presignedUrl);
      });
    },
    uploadFile(bucket) {
      var files = this.$refs.myVueDropzone.getAcceptedFiles()
      console.log('files'+files);
      console.log('bucketname'+bucket)
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // Retrieve a URL from our server.
        this.retrieveNewURL(bucket, file, (file, url) => {
            // Upload the file to the server.
          this.$refs.myVueDropzone.dropzone.options.url = url;
          console.log("wo:::"+url)
          this.$refs.myVueDropzone.processQueue();
        })
      }
      
    },

    
  },
  
}
</script>

<template>
    <div class="row card-body">
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
            <div class="btn btn-primary mb-2" title="返回" @click="returnViewFile">
                <i class="bx bx-arrow-back" style="font-size: 15px;"></i>
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
    </div>
</template>
