<script>
import Swal from "sweetalert2";
import PageHeader from "@/components/page-header";
import LoaderContainer from "@/components/DvcAI/loader-container";
import Rightsidebar from "./rightsidebar";
import Header from './header';
import Content from './content';
import appConfig from "@/app.config";
import { EventBus } from "@/utils/event-bus";

/**
 * Dataset Detail component
 */

export default {
  inject:['reload'],
  page: {
    title: "数据集详情",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { PageHeader, LoaderContainer, Rightsidebar, Header, Content},
  data() {
    return {
      title: "数据集详情",
      items: [
        {
          text: "数据集列表",
          to: { path: '/datasets' },
        },
        {
          text: "数据集详情",
          active: true
        }
      ],
      id: this.$route.params.id,
      dataset: null,
      loadingState: false,
    };
  },
  computed: {
    // 是否是管理员
    isAdmin() {
      return this.$keycloak.realmAccess.roles.includes("DOCKHUB_ADMIN");
    },
  },
  mounted(){
    this.getDataset();
    EventBus.$on('update', () => this.reload());
  },
  beforeDestroy() {
    EventBus.$off('update')
  },
  methods:{

    // 获取数据集信息
    getDataset() {
      this.loadingState = true;
      this.$request.get('datasets/'+ this.$route.params.id)
      .then(({data})=>{
        if(data.code === 1) {
          this.loadingState = false;
          this.dataset = data.data;
        } else {
          console.log(data)
          Swal.fire(
            "数据集信息获取失败!",
            "点击按钮返回数据集列表",
            "error"
          ).then((res) => {
            if(res.isConfirmed) {
              this.loadingState = false;
              this.backDatasetsList();
            }
          })
        }
      })
      .catch((err)=>{
        console.log(err)
        Swal.fire(
          "数据集信息获取失败!",
          "点击按钮返回数据集列表",
          "error"
        ).then((res) => {
          if(res.isConfirmed) {
            this.loadingState = false;
            this.backDatasetsList();
          }
        })
      })
    },

    // 返回数据集列表
    backDatasetsList() {
      this.$router.push({path: '/datasets'})
    },

    // 加载状态改变
    onLoading(state) {
      console.log(state)
      this.loadingState = state;
    },
  },
};
</script>
<template>
  <div>
    <PageHeader :title="dataset.name" :items="items" />
    <LoaderContainer :loading="loadingState">
      <div class="row font-size-14">
        
        <div class="col-12 col-md-8">
          <Header :dataset="dataset"/>
          <Content :dataset="dataset" :isAdmin="isAdmin"/>
        </div>

        <div class="col-12 col-md-4">
          <Rightsidebar :dataset="dataset" :isAdmin="isAdmin" @changeLoading="onLoading" />
        </div>

      </div>
    </LoaderContainer>
  </div>
</template>