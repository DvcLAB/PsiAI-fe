export const state = {
  contentWidth:'col-md-8',
  sideBarWidth:'col-md-4'
};

export const mutations = {
  switchFileManager(state) {
    state.contentWidth = 'col-md-12'
    state.sideBarWidth = 'col-md-12'
  },
  switchBaseMsg(state) {
    state.contentWidth = 'col-md-8'
    state.sideBarWidth = 'col-md-4'
  },
};


