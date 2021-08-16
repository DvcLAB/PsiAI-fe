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
            show:true,
            presignedUrl: ''
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
            // 删除bucket中的一个文件对象
            s3Client.removeObject(this.bucket, this.file.name, function(err) {
              if (err) {
                return console.log('Unable to remove object', err)
              }
              console.log('Removed the object')
            });
            this.show = false
            // this.$parent.objStream = this.$parent.objStream.filter((item) => {
            //     return !this.file.name.includes(item.name)
            // });
            // this.$parent.listFiles();
        },

        // 下载文件
        downLoadFile(bucket,fileName,suffix) {
            // var size = 0
            console.log(fileName)
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

        // 获取树形结构中各层文件夹名
        getViewName() {
            // viewName = file.name ? file.name : file.prefix;
            if(this.file.name) {
                this.viewName = this.file.name.substring(this.file.name.lastIndexOf('/') + 1);
            }else {
                this.viewName = this.file.prefix.replace(this.$store.state.datasets.prefix,'');
                this.viewName = this.viewName.replace('/','');
            }
        },

        //双击文件夹，进入下一级视图
        enterFolder() {
            if(!this.file.name) {
                // 如果这个元素不是文件而是一个文件夹，双击才进入下一级
                this.$store.commit('datasets/enterFolder',{
                    prefix:this.file.prefix,
                    isFile:false
                })
            }else{
                this.$store.commit('datasets/enterFolder',{
                    prefix:this.file.name,
                    isFile:true
                })
                this.$store.commit('datasets/fileMetadata',{
                    fileModified:this.file.lastModified,
                    fileSize:this.file.size
                })
                s3Client.presignedGetObject(this.bucket, this.file.name, 24*60*60, (err, presignedUrl) => {
                    if (err) return console.log(err)
                    this.previewUrl(presignedUrl)
                });
                
            }
        },
        previewUrl(url) {
            this.$store.commit('datasets/previewUrl',url);
        }
    }
}
</script>
<template>
    <tr @dblclick="enterFolder"  v-if="show">
        <td class="text-truncate">
        <a
            href="javascript: void(0);"
            class="text-dark fw-medium"
            ><i
            class="font-size-16 align-middle me-2"
            :class="getSuffix(file.name)"
            ></i>
            {{viewName}}</a
        >
        </td>
        <td class="text-truncate">{{formatFileSize(file.size)}}</td>
        <td class="text-success">{{ file.lastModified | moment("YYYY-MM-DD HH:mm:ss") }}</td>
        <td>
            <ul class="list-inline font-size-20 contact-links mb-0">
                <li class="list-inline-item px-2">
                    <a v-b-tooltip.hover title="下载" @click="downLoadFile(bucket,file.name,file.name.substring(file.name.lastIndexOf('.') + 1))">
                        <i class="bx bx-download"></i>
                    </a>
                </li>
                <li class="list-inline-item px-2">
                    <a v-b-tooltip.hover title="删除" @click="removeFile">
                        <i class="bx bx-trash"></i>
                    </a>
                </li>
            </ul>
        </td>
    </tr>
    <!-- end col -->
</template>