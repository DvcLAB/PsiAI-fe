<script>
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
      bucket: this.datasetname,
      //数据集文件浏览部分的面包屑导航
      items: this.$store.state.datasets.items,
    };
  },
  components: {},
  mounted() {
  },
  methods: {
        // 下载文件
        downLoadFile(bucket,items) {
            var fileName = items[items.length-1];
            var suffix = items[items.length-1].substring(items[items.length-1].lastIndexOf('.') + 1);
            // var size = 0
            s3Client.getObject(bucket, fileName, function(err, dataStream) {
                if (err) {
                    return console.log(err)
                }
                const filename = fileName;
                const contentType = suffix;
                dataStream.on('data', data => {
                    // this.objStream.push(data);
                    //创建a标签
                    let linkElement = document.createElement("a");
                    //创建 blob对象 第一个参数 response.data是代表后端返回的文件流  ，第二个参数设置文件类型
                    let blob = new Blob([data], { type: contentType });
                    //生成生成下载链接  这个链接放在a标签上是直接下载，放在img上可以直接显示图片，视频同理
                    const url = window.URL.createObjectURL(blob);
                    console.log(url);
                    linkElement.setAttribute("href", url);
                    linkElement.setAttribute("target", '_blank');
                    linkElement.setAttribute("download", filename);
                    //模拟点击a标签 
                    if (typeof MouseEvent == "function") { 
                        var event = new MouseEvent("click", { 
                            view: window, bubbles: true, cancelable: false 
                        }); 
                        linkElement.dispatchEvent(event);
                    } 
                })
                
                // dataStream.on('end', function() {
                //     console.log('End. Total size = ' + size)
                // })
                dataStream.on('error', function(err) {
                    console.log(err)
                })
            })
        },
        // 返回
        goBack() {
            if(this.items.length == 1) {
                this.$store.commit('datasets/clearPrefix')
            }else {
                this.$store.commit('datasets/skipToFolder',this.items.length-2)
            }
        },

        // 格式化文件大小,默认单位是Byte
        formatFileSize(size) {
            let value = Number(size);
            if (size && !isNaN(value)) {
                const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
                let index = 0;
                let k = value;
                if (value >= 1024) {
                    while (k > 1024) {
                        k = k / 1024;
                        index++;
                    }
                }
                return `${(k).toFixed(1)}${units[index]}`;
            }
            return '-';
        },
    }
  
}
</script>

<template>
    <div class="card-body">
        <!-- 面包屑这一行 -->
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
                    <div class="btn btn-primary mb-2 me-2" title="下载文件" @click="downLoadFile(bucket, items)">
                        <i class="bx bx-download " style="font-size: 15px;"></i>
                    </div>
                    <div class="btn btn-primary mb-2" title="返回" @click="goBack">
                        <i class="bx bx-arrow-back " style="font-size: 15px;"></i>
                    </div>
                </form>
            </div>
            </div>
        </div>

        <!-- 图片预览 -->
        <div v-if="$store.state.datasets.isFile" style="text-align: center; margin-top: 20px;">
            <img
            id="datasetImg"
            v-if="$store.state.datasets.isImg"
            class="img-thumbnail"
            style="max-width: 60%;"
            :src="$store.state.datasets.previewUrl"
            data-holder-rendered="true"
            />
            <iframe
            v-else
            id="myframe"
            class="img-thumbnail"
            :src="$store.state.datasets.previewUrl"
            style="width: 90%;"
            >
            </iframe>
        </div>
      
        <hr  class="mt-2" />
        <!-- 图片描述信息 -->
        <div class="row mt-1 text-center">
            <div class="col-4">
                <span>文件类型:</span>{{items[items.length-1].substring(items[items.length-1].lastIndexOf('.') + 1).toUpperCase()}}
            </div>
            <div class="col-4">
                <span>文件大小:</span>{{formatFileSize($store.state.datasets.fileSize)}}
            </div>
            <div class="col-4">
                <span>修改时间:</span>{{ $store.state.datasets.fileModified | moment("YYYY-MM-DD HH:mm:ss") }}
            </div>
        </div>
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
