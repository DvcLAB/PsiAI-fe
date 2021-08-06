<script>
var Minio = require('minio')
 
// Instantiate the minio client with the endpoint
// and access keys as shown below.
 
 
var s3Client = new Minio.Client({
    endPoint:  's3.dvclab.com',
    accessKey: 'HNGU1VB7FDD4WYQ537BD',
    secretKey: 'gDaPHd6CwgDYUafDtE3rLgnz7CAJ1wxHu23DrNhT'
})
export default {
    data() {
        return {
            icon_class: '',
            icon: {
                "png":'mdi mdi-image text-muted',
                "jpg": 'mdi mdi-image text-muted',
                "jpeg": 'mdi mdi-image text-muted',
                "txt": 'mdi mdi-text-box text-muted',
                "md": 'mdi mdi-file-document text-primary',
                "doc":'mdi mdi-file-document text-primary',
                "gif": 'mdi-gif text-primary',
                "json": 'bx bxs-file-json text-muted',
                "js": 'bx bxs-file-js text-muted',
                "css":'bx bxs-file-css text-muted',
                "html": 'mdi mdi-file-document text-primary',
                "pdf": 'mdi-file-pdf text-danger',
                "": 'mdi mdi-folder text-warning',
                "gz": 'mdi mdi-folder-zip text-warning',
            },
            viewName:'',
            show:true
        }
    },
    props: {
        file: {
            type: Object,
            default: () => {},
        },
        bucket: {
            type: String,
            default: '',
        },
        fileList: {
            type: Array,
            default: () => [],
        }
    },
    mounted() {
        this.getViewName();
    },
    methods: {
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

        //解析出类名
		getSuffix(filename) {
            if(filename) {
                // 截取路径“.”后面的字符串
                var suffix = filename.substring(filename.lastIndexOf('.') + 1);
                // 如果icon集合中没定义这种类型的文件的icon名，就统一用'bx bxs-file-blank'
                this.icon_class = this.icon.hasOwnProperty(suffix) ? this.icon[suffix] : 'mdi mdi-file-document text-primary';
                return this.icon_class;
            }else{
                return 'mdi mdi-folder text-warning';
            }
		},

        // 删除文件
        removeFile() {
            // this.$parent.objStream = this.$parent.objStream.filter((item) => {
            //     return !this.file.name.includes(item.name)
            // });
            // 删除bucket中的一个文件对象
            s3Client.removeObject(this.bucket, this.file.name, function(err) {
              if (err) {
                return console.log('Unable to remove object', err)
              }
              console.log('Removed the object')
            });
            this.show = false
        },

        // 下载文件
        downLoadFile(bucket,fileName,suffix) {
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
                    //生成生成下载链接  这个链接放在a标签上是直接下载，放在img上可以直接显示图片问价，视频同理
                    const url = window.URL.createObjectURL(blob);
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

        // 获取树形结构中各层文件夹名
        getViewName() {
            // viewName = file.name ? file.name : file.prefix;
            if(this.file.name) {
                this.viewName = this.file.name.substring(this.file.name.lastIndexOf('/') + 1);
            }else {
                this.viewName = this.file.prefix.substring(0,this.file.prefix.indexOf('/'));
            }
        }
    }
}
</script>
<template>
    <div class="col-xl-3 col-sm-4" v-if="show">
        <div class="card shadow-none border">
            <div class="card-body p-3">
                <div class="">
                    <div class="float-end ms-2">
                        <b-dropdown
                        toggle-class="font-size-16 text-muted p-0"
                        menu-class="dropdown-menu-end"
                        class="mb-2"
                        variant="white"
                        right
                        >
                            <template #button-content>
                                <i class="mdi mdi-dots-horizontal"></i>
                            </template>
                            <b-dropdown-item href="#" @click="downLoadFile(bucket,file.name,file.name.substring(file.name.lastIndexOf('.') + 1))">下载</b-dropdown-item>
                            <!-- <b-dropdown-divider></b-dropdown-divider> -->
                            <b-dropdown-item href="#" @click="removeFile">删除</b-dropdown-item>
                        </b-dropdown>
                    </div>
                    <div class="avatar-xs me-3 mb-3">
                        <div class="avatar-title bg-transparent rounded">
                        <i
                            class="font-size-24 text-warning" :class="getSuffix(file.name)"
                        ></i>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="overflow-hidden me-auto">
                        <h5 class="font-size-14 text-truncate mb-1">
                            <!-- <a
                            href="javascript: void(0);"
                            class="text-body"
                            :title="file.name"
                            >{{file.name}}</a> -->
                            <a
                            href="javascript: void(0);"
                            class="text-body"
                            >{{viewName}}</a>
                        </h5>
                        <a class="text-muted text-truncate mb-0">
                            12 Files
                        </a>
                        </div>
                        <div class="align-self-end ms-2">
                            <p class="text-muted mb-0">{{formatFileSize(file.size)}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end col -->
</template>