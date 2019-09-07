import Vue from 'vue'
import { Button } from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock/mock-server'
import './valifate'
import './filters/index.js'
// 需要全局注册的组件
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import CartControl from './components/CartControl/CartControl.vue'
import Split from './components/Split/Split.vue'

Vue.prototype.$eventBus = new Vue()
// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)
Vue.component(Button.name, Button)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
