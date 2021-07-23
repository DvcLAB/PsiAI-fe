<script>
import Config from "./config";
import FileManager from "@/components/DvcAI/datasets/file-manager";
/**
 * Dataset Card Content component
 */

export default {
  components: { Config, FileManager},
  props: {
    dataset: {
      type: Object,
      default: () => {},
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
};
</script>
<template>
<div class="custom-tab">

  <b-tabs pills fill content-class="text-muted mt-4">
    <b-tab active class="border-0">
      <template v-slot:title>
        <!-- 仅在sm尺寸的屏幕上可见，inline-block元素生成一个块元素框，它将与周围的内容一起流动，就好像它是一个单独的内联框 -->
        <span class="d-inline-block d-sm-none">
          <i class="bx bx-spreadsheet"></i>
        </span>
        <!-- 仅在sm尺寸不显示 -->
        <span class="d-none d-sm-inline-block">基本信息</span>
      </template>
      <Config :dataset="dataset" :isAdmin="isAdmin"/>
    </b-tab>
    <b-tab class="border-0">
      <template v-slot:title>
        <span class="d-inline-block d-sm-none">
          <i class="bx bx-file"></i>
        </span>
        <span class="d-none d-sm-inline-block">文件浏览</span>
      </template>
      <FileManager/>
    </b-tab>
  </b-tabs>
  
</div>
</template>
