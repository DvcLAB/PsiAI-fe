<script>
import DatasetItem from '@/components/DvcAI/datasets/dataset-item';

export default {
    components: {
        DatasetItem
    },
    props: {
        datasets: {
            type: Array,
            default: function () {
                return [];
            },
        },
        updating: {
            type: Boolean,
        },
    },
}
</script>
<template>

    <div v-if="datasets && datasets.length > 0">

      <div class="row">
        <div class="col-12">
          <div class="bg-white list-head-text">
            <div class="row align-items-center">
              <!-- <span class="col-md-1 d-none d-md-block">#</span> -->
              <span class="col-6 col-md-8">数据集名称</span>
              <span class="col-2 col-md-2">用户</span>
              <span class="col-4 col-md-2 text-end">创建时间</span>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <DatasetItem v-for="item in datasets" :key="item.id" :dataset="item"/>
        </div>
      </div>
    </div>

    <div v-else-if="datasets.length === 0 && !updating" class="text-center text-secondary mt-4">
      暂无数据集
    </div>

</template>
