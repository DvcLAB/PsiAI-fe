<script>
var Minio = require('minio')
 
// Instantiate the minio client with the endpoint
// and access keys as shown below.
 
 
var s3Client = new Minio.Client({
    endPoint:  's3.dvclab.com',
    accessKey: '7AU2ABLFK9VB2CWZB1JM',
    secretKey: 'WNS7mbQPqdb4l7GJsBcOtOWds5SnesvyleuKIoNl'
    // accessKey: '8cNAQJQvcO3x0TUOpyu',
    // secretKey: 'X681H4EC8EUKWJ9UCA0I73S9EJTJGV4ZS0V9BFV'
    // secretKey: 'W8J0Y8GJXOHC26NT3M24E8PHEK2D1OZ1WU1OFUX',
    // accessKey: 'TjwE46dr5LUG4QQYWPj' ,
    // sessionToken: 'RBjM/j4pW6IG0VbuQAkAfw+vDfTT11qjpsdAg6R+7XO6mHp7a6OwE69ZYZcQPH3vfMn3JH+oQ0YhEBXOuoi3dmr8Dq5JWCvkBcd1j1lAnKBjtMUGoaFNM5tzFAcoNH/ooLbSxIO5XwXDgwKRPaCnYKlP/c6Q3QAsr1OnN2iwNI/lPNs8z8YvNwg8VzdoKPaWr4PhctJhV26j4yk3zNU6WgttQ6B8DFzf22+pMlQ24P1TambeMLpfEge1qVCIQ/cqN4cWzKxA7Yve3cMsmC4otIPbpWO5j90P05itrPhWWUCOd6Rf758LCloRHwKUKcMmjgKybxPOGNtlmV5mn3Hv/u3YXKzM3eZpAgiaMQs1yvftpmC50ahnBVikGxCr1Fa29rNYaIHyXL4FDdFw26+eV8lRnA0Xpjg9ofHAbEVoMS3F/39AY8Tupv3eg0qTpx44AZV3GAQNFU06KOPaNzHUCA=='
})
export default {
    data() {
        return {
            icon_class: '',
            icon: {
                    "png":'bx bx-image-alt',
					"jpg": 'bx bx-image-alt',
					"jpeg": 'bx bx-image-alt',
                    "txt": 'bx bxs-file-txt',
                    "md": 'bx bxs-file-md',
                    "doc":'bx bxs-file-doc',
					"gif": 'bx bxs-file-gif',
                    "json": 'bx bxs-file-json',
                    "js": 'bx bxs-file-js',
                    "css":'bx bxs-file-css',
					"html": 'bx bxs-file-html',
                    "pdf": 'bx bxs-file-pdf',
                    "": 'bx bxs-folder',
                    "gz": 'bx bxs-folder',
				// {
                //     'png':'bx bx-image-alt'
                // },
                // {
				// 	icon_class: 'bx bx-image-alt',
				// 	suffix: 'jpg'
				// },
				// {
				// 	icon_class: 'bx bxs-file-txt',
				// 	suffix: 'txt'
				// },
				// {
				// 	icon_class: 'bx bxs-file-md',
				// 	suffix: 'md'
				// },
				// {
				// 	icon_class: 'bx bxs-file-doc',
				// 	suffix: 'doc'
				// },
				// {
				// 	icon_class: 'bx bxs-file-gif',
				// 	suffix: 'gif'
				// },
				// {
				// 	icon_class: 'bx bxs-file-json',
				// 	suffix: 'json'
				// },
				// {
				// 	icon_class: 'bx bxs-file-js',
				// 	suffix: 'js'
				// },
				// {
				// 	icon_class: 'bx bxs-file-css',
				// 	suffix: 'css'
				// },
				// {
				// 	icon_class: 'bx bxs-file-html',
				// 	suffix: 'html'
				// },
				// {
				// 	icon_class: 'bx bxs-file-pdf',
				// 	suffix: 'pdf'
				// },
				// {
				// 	icon_class: 'bx bxs-folder',
				// 	suffix: ''
				// }
            }
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
			// 截取路径“.”后面的字符串
			var suffix = filename.substring(filename.lastIndexOf('.') + 1);
            // 如果icon集合中没定义这种类型的文件的icon名，就统一用'bx bxs-file-blank'
            this.icon_class = this.icon.hasOwnProperty(suffix) ? this.icon[suffix] : 'bx bxs-file-blank';
            return this.icon_class;
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
            this.$parent.listFiles();
        },
    }
}
</script>
<template>
    <div class="col-xl-4 col-sm-6">
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

                            <b-dropdown-item href="#">Open</b-dropdown-item>
                            <b-dropdown-item href="#">Edit</b-dropdown-item>
                            <b-dropdown-item href="#"
                                >Rename</b-dropdown-item
                            >
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item href="#" @click="removeFile"
                                >Remove</b-dropdown-item
                            >
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
                            <a
                            href="javascript: void(0);"
                            class="text-body"
                            :title="file.name"
                            >{{file.name}}</a>
                        </h5>
                        <a class="text-muted text-truncate mb-0" @click="getSuffix(file.name)">
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