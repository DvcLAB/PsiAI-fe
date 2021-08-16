<script>
import Swal from "sweetalert2";
import Avatar from "@/components/DvcAI/utility/avatar";
// import Switches from "vue-switches";

export default {
  components: { Avatar},
  data() {
    return {
      loadingState: false,
      isAdmin:false,
      role:''
    };
  },
  props: {
    dataset: {
      type: Object,
      default: () => {},
    },
  },
  computed:{
  },
  methods: {
    //删除私有数据集成员时确认弹窗
    deleteConfirm() {
      Swal.fire({
        icon:'question',
        title: '确认要删除该成员吗?',
        showCancelButton: true,
        confirmButtonText: `确认`,
        cancelButtonText: `取消`
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("删除成员")
        }
      })
    },
    changeRole() {
      this.isAdmin = !this.isAdmin
    }
  },
};
</script>
<template>
    <div class="media align-items-center">
        <div class="align-self-center me-3 mb-2">
            <Avatar size="xs" :src="dataset.user.avatar_url" :user-name="dataset.user.username"/>
        </div>
        <div v-if="dataset.user" class="media-body">
            <h5 class="font-size-14 mt-0 mb-0">
            {{ dataset.user.username }}
            </h5>
        </div>
        <ul class="list-inline font-size-17 contact-links mb-0">
            <li class="list-inline-item px-2" @click="changeRole">
                <!-- <switches v-model="isAdmin" color="success" class="ms-1 me-2" style="vertical-align: middle; margin: 0;" :title="isAdmin ? '管理员' : '用户'"></switches>
                <span class="font-size-12">{{role}}</span> -->
                <a title="管理员" class="text-warning" v-if="isAdmin">
                    <i class="mdi mdi-account-cog"></i>
                </a>
                <a title="用户" v-else>
                    <i class="mdi mdi-account"></i>
                </a>
            </li>
            <li class="list-inline-item px-2" @click="deleteConfirm">
                <a v-b-tooltip.hover title="删除">
                    <i class="mdi mdi-trash-can-outline"></i>
                </a>
            </li>
        </ul>
    </div>
</template>
