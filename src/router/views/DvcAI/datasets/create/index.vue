<script>
import appConfig from "@/app.config";
// // import queryString from 'query-string';
// import PageHeader from "@/components/page-header";
// import LoaderContainer from "@/components/DvcAI/loader-container";

/**
 * Create Hosts component
 */
export default {
  page: {
    title: "创建数据集",
    meta: [{ name: "创建数据集", content: appConfig.description }]
  },
  data() {
    return {
      title: "创建数据集",
      linkItems: [
        {
          text: "数据集列表",
          to: { path: '/datasets' },
        },
        {
          text: "创建数据集",
          active: true,
        },
      ],
      loadingState: false,
      submitted: false,
    };
  },
  mounted() {
    console.log("进来了")
  },
  computed: {
  },

  methods: {

  }
};
</script>
<template>
<div>
    <div class="row">

      <div class="col-lg-12">

        <div class="card">
          <div class="card-body">
            
            我是数据集创建页
          </div>
        </div>
      </div>
    </div>
</div>
</template>
