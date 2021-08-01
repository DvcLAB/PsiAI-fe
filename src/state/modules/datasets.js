// import Vue from 'vue'

export const state = {
  contentWidth:'col-md-8',
  sideBarWidth:'col-md-4'
};

// export const getters = {
//   // allTodos: state => state.todos,
// };

export const mutations = {
  switchFileManager(state) {
    state.contentWidth = 'col-md-12'
    state.sideBarWidth = 'col-md-12'
    console.log("执行了浏览文件")
  },
  switchBaseMsg(state) {
    state.contentWidth = 'col-md-8'
    state.sideBarWidth = 'col-md-4'
  },
};


