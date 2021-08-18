<script>
import FileUpdate from "./file-manager-update.vue"
import FileUpload from "./file-upload.vue"

export default {
  props: {
    datasetname: {
      type: String,
      default: '',
    }
  },
  components: { FileUpdate, FileUpload },
  
}
</script>

<template>
    <div class="d-xl-flex">
      <div class="w-100">
        <div class="d-md-flex">
          <div class="w-100">
            <div class="card">
              <!-- 文件浏览 -->
              <FileUpdate v-if="!this.$store.state.datasets.viewUpload" :datasetname="datasetname" :key="this.$store.state.datasets.objStream.length"/>
              <!-- 上传文件 -->
              <FileUpload :datasetname="datasetname" v-else/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style>
 .file-upload {
        /* width: 60px; */
        height: 26px;
        position: relative;
        /* overflow: hidden; */
        /* border: 1px solid #0F996B ; */
        display: inline-block;
        border-radius: 4px;
        font-size: 12px;
        color: #0F996B;
        text-align: center;
        line-height: 26px;
        /* float: right; */
        margin: 10px 0 auto auto;
    }
.file-upload-input {
        background-color: transparent;
        position: absolute;
        width: 999px;
        height: 999px;
        top: -10px;
        right: -10px;
        cursor: pointer;
    }
.signedurl {
  margin-top: 30px;
  border: 1px solid #ccc;
  width: 97%;
  height: 200px;
  padding: 10px;
}
</style>