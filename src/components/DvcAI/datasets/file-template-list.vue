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
            this.icon_class = this.icon.hasOwnProperty(suffix) ? this.icon[suffix] : 'mdi mdi-file-document text-primary';
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
            this.$parent.objStream = this.$parent.objStream.filter((item) => {
                return !this.file.name.includes(item.name)
            });
        },
    }
}
</script>
<template>
    <tr>
        <td class="text-truncate">
        <a
            href="javascript: void(0);"
            class="text-dark fw-medium"
            ><i
            class="font-size-16 align-middle me-2"
            :class="getSuffix(file.name)"
            ></i>
            {{file.name}}</a
        >
        </td>
        <td class="text-truncate">{{ file.lastModified | moment("YYYY-MM-DD HH:mm:ss") }}</td>
        <td class="text-truncate">{{formatFileSize(file.size)}}</td>
        <td>
        <b-dropdown
            toggle-class="font-size-16 text-muted p-0"
            menu-class="dropdown-menu-end"
            variant="white"
            right
        >
            <template #button-content>
            <i class="mdi mdi-dots-horizontal"></i>
            </template>

            <b-dropdown-item href="#">下载</b-dropdown-item>
            <!-- <b-dropdown-divider></b-dropdown-divider> -->
            <b-dropdown-item href="#" @click="removeFile">删除</b-dropdown-item>
        </b-dropdown>
        </td>
    </tr>
    <!-- end col -->
</template>