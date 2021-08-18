<script>
import Autocomplete from '@trevoreyre/autocomplete-vue';
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
      objStream: [],
      //数据集文件浏览部分的面包屑导航
      items: this.$store.state.datasets.items,
      sortLowToHigh: true,
      isImg: true,
      loadingState: false,
      checkedArr: []
    };
  },
  components: {FileTemplateList, FilePreview, Autocomplete},
  mounted() {
    this.listFiles();
    this.$store.commit('datasets/clearDeleteFiles');
  },
  computed: {
    //全选checkbox的选中和取消
    checked: {
      get() {
        var deleteFiles = this.$store.state.datasets.deleteFiles
        console.log("this.$store.state.datasets.deleteFiles" + deleteFiles)
        console.log("this.checkedArr" + this.checkedArr)
        if (deleteFiles == this.checkedArr) {
          return true
        }else{
          return false
        }
      },
      set (value) {
        this.$store.commit('datasets/checked', value)
      }
    },

    // 控制批量删除按钮的出现和消失
    manage: {
      get() {
        var deleteFiles = this.$store.state.datasets.deleteFiles
        if(deleteFiles.length == 0) {
          return false
        }else {
          return true
        }
      }
    }
  },
  methods: {
    listFiles(){
      // 列举某一bucket中的文件对象
      this.objStream = [];
      this.checkedArr= [];
      var stream = s3Client.extensions.listObjectsV2WithMetadata(this.datasetname,this.$store.state.datasets.prefix, false,'');
      stream.on('data', data => {
        this.objStream.push(data);
        this.checkedArr.push(data.name ? data.name : data.prefix)
        console.log(data)
        console.log("this.checkedArr"+this.checkedArr)
      })
      this.isImg = true;
      return this.objStream;
    },

    // 展示上传文件的组件
    touploadFile() {
      this.$store.commit('datasets/touploadFile');
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

    //根据搜索框输入值查找文件
    searchFiles(q){
      this.objStream = [];
      var stream = s3Client.extensions.listObjectsV2WithMetadata(this.datasetname,q, false,'');
      stream.on('data', data => {
        this.objStream.push(data);
        console.log(data)
      })
      this.isImg = true;
      return this.objStream;
    },
    // autocomplete 搜索函数
    search(input) {
      this.loadingState = true;
      this.searchFiles(input)
      // return new Promise((resolve) => {
      //   this.getContainers({
      //     params: {
      //       page: 1,
      //       status: ['Running','New','Init','Deployed','Repo_Clone_Success','Pip_Install_Success','Dataset_Load_Success','Jupyterlab_Start_Success','Port_Forwarding_Success','Failure','Paused','Deleted'],
      //       q: input,
      //       uid: ''
      //     }
      //   })
      //   .then((res) => {
      //     if(res.code === 1) {
      //       this.containers = res.data;
      //       this.meta = res._meta;
      //       this.curPage = res._meta.page;
      //       this.curTotal = this.containers.length;
      //       this.loadingState = false;
      //       return resolve(res.data);
      //     } else {
      //       this.loadingState = false;
      //       return resolve([]);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     this.loadingState = false;
      //     return resolve([])
      //   })
      // })
    },

    // 选择搜索内容，input显示内容
    getResultValue(result) {
      return result.container_name;
      // console.log(result)
      // this.searchContent = result ? result.id : '';
      // return result ? result.id : ''
    },

    // 选择搜索内容触发事件
    handleSubmit(result) {
      if(!result) {
        this.containers = [];
      } else {
        // this.searchContent = result.id ? result.id : '';
        // let content = this.searchContent;
        this.getContainerById(result.id)
        .then((res) => {
            if(res.code === 1) {
              let data = res.data;
              if(Array.isArray(data)) {
                this.containers = data;
              } else {
                this.containers = [data];
              }
            } else {
              this.containers = [];
            }
        })
        .catch((err) => {
          console.log(err);
          this.containers = [];
        })
      }
    },

    deleteChecked() {
      let deleteFiles = this.$store.state.datasets.deleteFiles
      deleteFiles.forEach((fileName,index) => {
        s3Client.removeObject(this.datasetname, fileName, function(err) {
          if (err) {
            return console.log('Unable to remove object', err)
          }
          console.log('Removed the object:')
        });
        console.log("name:"+fileName+"index:"+index);
      })
      this.listFiles();
    }

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
                <!-- <div class="position-relative">
                  <input
                    type="text"
                    class="form-control bg-light border-light rounded"
                    placeholder="搜索文件..."
                  />
                  <i class="bx bx-search-alt search-icon"></i>
                </div> -->
                <autocomplete
                  aria-label="搜索文件..."
                  placeholder="搜索文件..."
                  :search="search"
                  :get-result-value="getResultValue"
                  :debounce-time="500"
                  solo-inverted
                  @submit="handleSubmit"
                  >
                  <template #result="{ result, props }">
                    <li
                      v-bind="props"
                      class="search-result"
                    >
                      <div class="row d-flex align-items-center">
                        <div class="col-12 col-md-4">
                          <h6 class="mb-0"><i class="bx bx-cube me-1"></i>{{result.container_name}}</h6>
                        </div>
                        <div class="col-12 col-md-4">
                          <span><i class="bx bx-layer me-1"></i>{{result.image.name}}</span>
                        </div>
                        <div class="col-12 col-md-4 d-none d-md-block">
                          <div class="d-flex align-items-center">
                            <Avatar size="xxs" :src="result.user.avatar_url" :user-name="result.user.username" class="me-2"/>
                            <span class="d-inline-block text-truncate">{{result.user.username}}</span>
                          </div>
                        </div>
                        <div class="col-12 d-md-none">
                          <span class="d-block text-truncate mb-0">
                            <i class="bx bx-user me-1"></i>{{result.user.username}}
                          </span>
                        </div>
                      </div>
                    </li>
                  </template>
                </autocomplete>
              </div>
              <div class="btn btn-primary mb-2" title="上传文件" @click="touploadFile">
                <i class="bx bx-upload" style="font-size: 15px;"></i>
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
                <th scope="col" style="width:5%">
                  <input type="checkbox" class="me-2" style="vertical-align:middle" id="checkbox" v-model="checked" @change="$store.commit('datasets/changeAllChecked',checkedArr)">
                  <!-- <label for="checkbox" style="vertical-align:middle; margin:0">全选</label> -->
                </th>
                <th scope="col" style="width:40%" @click="sortByName">名称<i class="bx bxs-sort-alt"></i></th>
                <th scope="col" style="width:15%" @click="sortBySize">大小<i class="bx bxs-sort-alt"></i></th>
                <th scope="col" style="width:25%" @click="sortByTime">更新时间<i class="bx bxs-sort-alt"></i></th>
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
      <div v-if="manage" class="mt-2">
        <div title="管理" style="padding-left: 0.75em; line-height: 38px;">
          <b-button variant="danger me-2" style="float: right" @click="deleteChecked">删除</b-button>
        </div>
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
</style>
