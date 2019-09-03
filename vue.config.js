const path = require('path')
function resolve (dir) {
  // return path.join(__dirname, '..', dir)
  return path.join(__dirname, dir)
}
// vue.config.js
//import Star from '../xyz/components/Star/Star.vue'
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'xyz': resolve('src'),
      }
    },
  },
  // 配置代理
  devServer: {
    proxy: {
      // 请求地址以/api开头
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true, //是否支持跨域
        pathRewrite: {
          '^/api': '', // rewrite path
        },
      },
    }
  }

}
