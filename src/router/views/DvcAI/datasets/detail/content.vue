<script>
import Config from "./config";
import FileManager from "@/components/DvcAI/datasets/file-manager";
// import FileManagerList from "@/components/DvcAI/datasets/file-manager-list";
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
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.switchBaseMsg();
    this.clearPrefix();
  },
  methods: {
    // 点击文件浏览之后，左边的内容框扩展到占全屏，用户信息放到下一行显示，也占全行,这个函数调用vuex的mutation函数来修改共享数据，因为这个布局需要改的是父组件中的class
    switchFileManager(){
      this.$store.commit('datasets/switchFileManager')
    },
    // 点击基本信息时，页面布局恢复为用户信息占4/12,数据集基本信息占8/12
    switchBaseMsg() {
      this.$store.commit('datasets/switchBaseMsg')
    },
    // 每次刷新content组件时，filemanager组件的prefix需要清空，从而回到根目录下
    clearPrefix() {
      this.$store.commit('datasets/clearPrefix')
    }
  }
};
</script>
<template>
<div class="custom-tab">

  <b-tabs pills fill content-class="text-muted mt-4">
    <b-tab active class="border-0" @click="switchBaseMsg">
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
    <b-tab class="border-0" @click="switchFileManager">
      <template v-slot:title>
        <div @click="$store.commit('datasets/clearPrefix')">
          <span class="d-inline-block d-sm-none">
            <i class="bx bx-file"></i>
          </span>
          <span class="d-none d-sm-inline-block">文件浏览</span>
        </div>
      </template>
      <FileManager :datasetname="dataset.name" :isAdmin="isAdmin" :key="$store.state.datasets.prefix"/>
    </b-tab>
    <!-- <b-tab class="border-0" @click="switchFileManager">
      <template v-slot:title>
        <span class="d-inline-block d-sm-none">
          <i class="bx bx-file"></i>
        </span>
        <span class="d-none d-sm-inline-block">文件浏览</span>
      </template>
      <FileManagerList :datasetname="dataset.name" :isAdmin="isAdmin" :key="$store.state.datasets.prefix"/>
    </b-tab> -->
    
  </b-tabs>
  
  
</div>
</template>
