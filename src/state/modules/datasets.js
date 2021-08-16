
export const state = {
  // 数据集详情页展示基本信息和文件浏览时，页面布局弹性变化
  contentWidth: 'col-md-8',
  sideBarShow: true,
  oldPrefix: '',
  prefix: '',
  items: [],
  objStream: [],
  viewUpload: false,
  previewUrl: '',
  isFile: false,
  isImg: true,
  showMemberManage: false,
};

export const mutations = {
  // 数据集详情页展示基本信息和文件浏览时，页面布局弹性变化
  switchFileManager(state) {
    state.contentWidth = 'col-md-12'
    state.sideBarShow = false
  },
  switchBaseMsg(state) {
    state.contentWidth = 'col-md-8'
    state.sideBarShow = true
  },
  clearPrefix(state) {
    // 返回根列表
    state.prefix = '',
    state.items = [],
    state.isFile = false
  },
  skipToFolder(state,index) {
    //点击最后一层导航时页面不变化
    if(index+1 !== state.items.length) {
      // 更改全局items,prefix
      state.items.splice(index+1)
      state.prefix = state.items.join("/")+'/'
      // 更改面包屑导航的数组
      state.isFile = false
    }
  },
  // 双击文件夹进入下一级菜单时控制文件浏览页面元素变化
  enterFolder(state,setting) {
    // 更改全局prefix或文件name,如果是文件则隐藏列表组件，显示预览组件
    state.prefix = setting.prefix
    state.isFile = setting.isFile
    // 更改面包屑导航的数组使之与prefix同步
    state.items = state.prefix.split('/')
    if(!state.isFile) {state.items.pop()}
  },
  updateObjStream(state,data) {
    state.objStream.push(data);
  },
  clearObjStream(state) {
    state.objStream = [];
  },
  // 展示上传文件的组件
  touploadFile(state) {
    state.viewUpload = true
  },
  // 返回查看文件列表
  returnViewFile(state) {
    state.viewUpload = false
  },
  //预览图片
  previewUrl(state,url) {
    state.previewUrl = url;
    state.isImg =  /\.(xbm|tif|pjp|svgz|jpg|jpeg|ico|tiff|gif|svg|jfif|webp|png|bmp|pjpeg|avif)/.test(url);
  },
  showMemberManage(state,ifShow) {
    state.showMemberManage = ifShow
    console.log(state.showMemberManage)
  }
};


