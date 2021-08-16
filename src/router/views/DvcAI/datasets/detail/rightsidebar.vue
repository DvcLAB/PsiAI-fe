<script>
import Swal from "sweetalert2";
import Avatar from "@/components/DvcAI/utility/avatar";
/**
 * Dataset Detail Rightsidebar component
 */

export default {
  components: { Avatar },
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
      loadingState: false,
      datasetStatusSelected: 'public',
      locationOptions: [
        { text: '公开', value: 'public', disabled: false },
        { text: '私有', value: 'private', disabled: false }
      ],
    };
  },
  computed:{
    canEdit() {
      return this.isAdmin
    },
  },
  methods: {

    // 删除数据集
    delDataset() {
      this.loadingState = true;
      this.$emit('changeLoading', true);
      let id = this.dataset.id;
      this.$request
        .delete("datasets/" + id)
        .then(({data}) => {
          if (data.code === 1) {
            Swal.fire("数据集删除成功!", "", "success").then((res) => {
              if (res.isConfirmed) {
                this.backDatasetsList();
              }
            });
          } else {
            Swal.fire("数据集删除失败!", "", "error");
          }
          this.loadingState = false;
          this.$emit('changeLoading', false);
        })
        .catch((err) => {
          this.loadingState = false;
          this.$emit('changeLoading', false);
          console.log(err);
        });
    },

    // 删除数据集确认弹窗
    delDatasetMsg() {
      Swal.fire({
        icon:'question',
        title: '确认删除此数据集?',
        showCancelButton: true,
        confirmButtonText: `确认`,
        cancelButtonText: `取消`
      }).then((result) => {
        if (result.isConfirmed) {
          this.delDataset();
        }
      })
    },

    // 返回数据集列表
    backDatasetsList() {
      this.$router.push({path: '/datasets'})
    },

    // 私有数据集切换到公开数据集时弹框确认
    confirmWindow() {
      if(this.datasetStatusSelected == "public") {
        Swal.fire({
          icon:'question',
          title: '确认要将私有数据集设为公开吗?',
          showCancelButton: true,
          confirmButtonText: `确认`,
          cancelButtonText: `取消`
        }).then((result) => {
          if (result.isConfirmed) {
            this.datasetStatusSelected = "public"
            this.$store.commit('datasets/showMemberManage',false)
          } else {
            this.datasetStatusSelected = "private"
            this.$store.commit('datasets/showMemberManage',true)
          }
        })
      } else if(this.datasetStatusSelected == "private") {
          this.$store.commit('datasets/showMemberManage',true)
      }
    }
  },
};
</script>
<template>
  <div v-if="dataset" class="card">
    <div class="card-body">
      <div class="media align-items-center">
        <div v-if="dataset.user" class="align-self-center me-3">
          <Avatar size="xs" :src="dataset.user.avatar_url" :user-name="dataset.user.username"/>
        </div>
        <div v-if="dataset.user" class="media-body">
          <h5 class="font-size-14 mt-0 mb-0">
            {{ dataset.user.username }}
          </h5>
          <p v-if="dataset.user && dataset.user.roles.includes('DOCKHUB_ADMIN')" class="mb-0">
            <span class="badge font-size-11 badge-soft-primary me-2">
              管理员
            </span>
          </p>
        </div>
      </div>
      <hr v-if="dataset.user" class="mt-2" />
      <p class="mb-1">
        <i class="bx bx-calendar me-1"></i>创建时间
        <span class="text-success">{{ dataset.create_time | moment("YYYY-MM-DD HH:mm:ss") }}</span>
      </p>
      <p class="mb-1">
        <i class="bx bx-calendar me-1"></i>最近更新
        <span class="text-success">{{ dataset.update_time | moment("YYYY-MM-DD HH:mm:ss") }}</span>
      </p>
      <div v-if="canEdit" class="mt-4">
        <b-form-radio-group
          id="location-radios"
          class="text-truncate check-group btn-item mb-0"
          size="md"
          v-model="datasetStatusSelected"
          @change="confirmWindow"
          :options="locationOptions"
          buttons
          button-variant="outline-primary"
          name="local-cloud-radios"
        >
        </b-form-radio-group>
        <!-- <b-button
          class="text-truncate i-text-middle btn-item me-2 mb-2"
          variant="outline-danger"
          size="md"
          @click="delDatasetMsg"
        >
          <i class="bx bx-trash font-size-16 align-middle me-1"></i>
          删除
        </b-button> -->
      </div>
    </div>
  </div>
</template>
