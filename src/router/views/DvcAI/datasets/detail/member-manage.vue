<script>
import Multiselect from "vue-multiselect";
import MemberItem from "@/components/DvcAI/datasets/member-item";
/**
 * Dataset Detail Rightsidebar component
 */

export default {
  components: { Multiselect, MemberItem },
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
    return {
      value1: null,
      added: false,
      options: [
        "Alaska",
        "Hawaii",
        "California",
        "Nevada",
        "Oregon",
        "Washington",
        "Arizona",
        "Colorado",
        "Idaho",
        "Montana",
        "Nebraska",
        "New Mexico",
        "North Dakota",
        "Utah",
        "Wyoming",
        "Alabama",
        "Arkansas",
        "Illinois",
        "Iowa",
      ],
    };
  },
  methods: {

  },
};
</script>
<template>
  <div v-if="dataset" class="card">
    <div class="card-body">
      <div class="media align-items-center">
        <h5 @click="added=false">
          成员管理
        </h5>
      </div>
      
      <hr v-if="dataset.user" class="mt-2" />
      <b-button variant="light" class="mb-2" v-if="!added" @click="added=true">
        <i class="bx bx-user-plus font-size-16 align-middle me-2"></i>
        添加用户
      </b-button>
      <multiselect
        v-model="value1"
        :options="options"
        :multiple="true"
        placeholder="搜索并添加用户"
        v-else
        class="mb-1"
      ></multiselect>
      <MemberItem :dataset="dataset"/>
      <MemberItem :dataset="dataset"/>
    </div>
  </div>
</template>
