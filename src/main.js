import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 需要全局注册的组件
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'

import './api'
// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
