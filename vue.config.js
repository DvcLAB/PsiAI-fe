// import Vue from 'vue';
module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  devServer: {
    sockHost: 'http://localhost:8080/',
    // transportMode: 'ws',
    disableHostCheck: true,
    // proxy: {
    //   '/ip': {
    //     target: 'https://s3.dvclab.com',
    //     pathRewrite: {'^/ws' : ''},
    //     changeOrigin: true,     // target是域名的话，需要这个参数，
    //     secure: true,          // 设置支持https协议的代理
    //   },
    // },
    // proxy: {
    //   '/ws': {
    //     target: 'wss://j.dvclab.com:50000/',
        
    //     pathRewrite: {'^/ws' : ''},
    //     changeOrigin: true,     // target是域名的话，需要这个参数，
    //     secure: false,          // 设置支持https协议的代理
    //     onProxyReq: function(proxyReq) {
    //       proxyReq.setHeader("Cookie", "X-Authorization=" + + 'Bearer ');
    //     }
    //   },
    // }

  }
}
