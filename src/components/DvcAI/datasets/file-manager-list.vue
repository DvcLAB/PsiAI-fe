<script>
import vue2Dropzone from "vue2-dropzone";
import FileTemplateList from "./file-template-list.vue"
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
      //数据集文件浏览部分的面包屑导航
      items: this.$store.state.datasets.items,
      sortLowToHigh: true
    };
  },
  components: {vueDropzone: vue2Dropzone, FileTemplateList},
  mounted() {
    this.listFiles();
  },
  methods: {
    listFiles(){
      // 列举某一bucket中的文件对象
      this.objStream = [];
      var stream = s3Client.extensions.listObjectsV2WithMetadata(this.datasetname,this.$store.state.datasets.prefix, false,'');
      stream.on('data', data => {
        this.objStream.push(data);
      })
      return this.objStream;
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
      this.objStream = [];
      this.listFiles();
      this.viewUpload = false
    },

    // 列表排序
    sortByKey(key){
      this.sortLowToHigh = !this.sortLowToHigh;
      if(this.sortLowToHigh){
        return this.objStream.sort(function(a,b){
        var x = a[key];
        var y = b[key];
        // 从小到大
        return((x<y)?-1:((x>y)?1:0));
      })}else{
        return this.objStream.sort(function(a,b){
        var x = a[key];
        var y = b[key];
        // 从小到大
        return((x<y)?((x>y)?1:0):-1);
      })
      }
      
    },
    sortBySize() {
      this.sortByKey('size');
    },
    sortByName() {
      this.sortByKey('name');
    },
    sortByTime() {
      this.sortByKey('lastModified');
    }
}
};
</script>

<template>
    <div class="d-xl-flex">
      <div class="w-100">
        <div class="d-md-flex">
          <div class="w-100">
            <div class="card">
              <!-- 文件列表 -->
              <div class="card-body" v-if="!viewUpload">
                <div>
                  <div class="row mb-3">
                    <!-- 面包屑导航 -->
                    <div class="col-xl-6 col-sm-6">
                      <div class="mt-2 page-title-left">
                        <h5>
                          <a class="link_a" @click="$store.commit('datasets/clearPrefix')">{{datasetname}}</a>
                          <span v-for="folderName in items" :key="folderName">
                            <i class="bx bx-chevron-right" style="font-size: 15px;vertical-align: middle;"></i>
                            <a class="link_a" @click="$store.commit('datasets/skipToFolder',folderName)">{{folderName}}</a></span>
                        </h5>
                      </div>
                    </div>
                    <!-- 搜索文件和上传文件跳转按钮 -->
                    <div class="col-xl-6 col-sm-6">
                      <form
                        class="mt-4 mt-sm-0 float-sm-end d-flex align-items-center"
                      > 
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
                  <div class="table-responsive">
                    <table
                      class="table align-middle table-nowrap table-hover mb-0"
                      style="table-layout: fixed; "
                    >
                      <thead>
                        <tr>
                          <th scope="col" style="width:40%" @click="sortByName">名称<i class="bx bxs-sort-alt"></i></th>
                          <th scope="col" style="width:15%" @click="sortBySize">大小<i class="bx bxs-sort-alt"></i></th>
                          <th scope="col" style="width:30%" @click="sortByTime">更新时间<i class="bx bxs-sort-alt"></i></th>
                          <!-- 下载和删除按钮 -->
                          <th scope="col" style="width:15%"></th>
                        </tr>
                      </thead>
                      <transition-group name="flip-list" tag="tbody">
                        <FileTemplateList v-for="item in objStream" :key="item.name ? item.name : item.prefix" :file="item" :bucket="datasetname" :fileList="objStream" />
                      </transition-group>
                    </table>

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
<style scoped>
.link_a {
  color: #495057;
}
.link_a:hover {
  color: #556ee6;
  cursor:pointer;
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>