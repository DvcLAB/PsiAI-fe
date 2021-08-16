<script>
import FileTemplateList from "./file-template-list.vue"
import FilePreview from "./file-preview.vue"
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
    },
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      objStream: [],
      myString: '',
      myJson: {},
      bucketname: this.datasetname,
      //数据集文件浏览部分的面包屑导航
      items: this.$store.state.datasets.items,
      sortLowToHigh: true,
      isImg: true
    };
  },
  components: {FileTemplateList, FilePreview},
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
        console.log(data)
      })
      this.isImg = true;
      return this.objStream;
    },

    // 展示上传文件的组件
    touploadFile() {
      this.$store.commit('datasets/touploadFile')
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
    },

  },
  
}
</script>

<template>
  <div v-if="!$store.state.datasets.viewUpload">
    <!-- 文件浏览 -->
    <div class="card-body" v-if="!$store.state.datasets.viewPreview">
      <!-- 面包屑导航和搜索框上传跳转按钮 -->
      <div>
        <div class="row mb-3">
          <!-- 面包屑导航 -->
          <div class="col-xl-8 col-sm-6">
            <div class="mt-2 page-title-left">
              <h5>
                <a class="link_a" @click="$store.commit('datasets/clearPrefix')">{{datasetname}}</a>
                <span v-for="(folderName,index) in items" :key="index">
                  <i class="bx bx-chevron-right" style="font-size: 15px;vertical-align: middle;"></i>
                  <a class="link_a" @click="$store.commit('datasets/skipToFolder',index)">{{folderName}}</a></span>
              </h5>
            </div>
          </div>
          <!-- 搜索文件和上传文件跳转按钮 -->
          <div class="col-xl-4 col-sm-6">
            <form
              class="mt-4 mt-sm-0 float-sm-end d-flex align-items-center"
            > 
              <!-- <div class="btn btn-primary mb-2" title="上传文件" @click="listFile">
                测试搜索
              </div>  -->
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
    <!-- 文件预览 -->
    <FilePreview :datasetname="datasetname" v-else/>
  </div>
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
