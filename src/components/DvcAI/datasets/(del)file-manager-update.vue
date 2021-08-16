<script>
import FileTemplate from "./file-template.vue"
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
  },
  data() {
    return {
      objStream: [],
      myString: '',
      myJson: {},
      bucketname: this.datasetname,
    };
  },
  components: {FileTemplate},
  mounted() {
    this.listFiles();
  },
  methods: {
    listFiles(){

      // 列举某一bucket中的文件对象
      this.objStream = [];
      var stream = s3Client.extensions.listObjectsV2WithMetadata(this.datasetname,'', false,'');
      stream.on('data', data => {
        this.objStream.push(data);
        console.log("objStream:"+this.objStream);
      })
    },
    // 展示上传文件的组件
    touploadFile() {
      this.$store.commit('datasets/touploadFile')
    },
  },
  
}
</script>

<template>
    <div class="card-body">
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
    <!-- end row -->
</template>
