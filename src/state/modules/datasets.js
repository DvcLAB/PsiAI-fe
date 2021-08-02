
export const state = {
  // 数据集详情页展示基本信息和文件浏览时，页面布局弹性变化
  contentWidth: 'col-md-8',
  sideBarWidth: 'col-md-4',
  oldPrefix: '',
  prefix: '',
  items: [],
};

export const mutations = {
  // 数据集详情页展示基本信息和文件浏览时，页面布局弹性变化
  switchFileManager(state) {
    state.contentWidth = 'col-md-12'
    state.sideBarWidth = 'col-md-12'
  },
  switchBaseMsg(state) {
    state.contentWidth = 'col-md-8'
    state.sideBarWidth = 'col-md-4'
  },
  clearPrefix(state) {
    // 返回根列表
    state.prefix = '',
    state.items = []
  },
  skipToFolder(state,folderName) {
    // 更改全局prefix
    state.prefix = state.prefix.substring(-1,state.prefix.lastIndexOf(folderName) + folderName.length)+'/';
    // 更改面包屑导航的数组
    state.items = state.prefix.split('/')
    // 最后一个是空值，我们需要把它去掉
    state.items.pop()
  },
  // 双击文件夹进入下一级菜单时控制文件浏览页面元素变化
  enterFolder(state,prefix) {
    // 更改全局prefix
    state.prefix = prefix
    // 更改面包屑导航的数组使之与prefix同步
    state.items = state.prefix.split('/')
    state.items.pop()
  }
};


