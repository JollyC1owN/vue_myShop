import { reqAddress, reqGetShops, reqGetCategorys } from '../api/index'
import { RECEIVE_ADDRESS, RECEIVE_SHOPS, RECEIVE_CATEGORYS, RECEIVE_USER, RESET_USER } from './mutayion-types'

export default {
  // 获取地理位置
  async getAddress ({ commit, state }) {
    // 1、发送异步请求数据
    const { longitude, latitude } = state
    const result = await reqAddress(longitude, latitude)
    if (result.code === 0) {
      const address = result.data
      // 2、拿到数据更新state中的数据
      commit(RECEIVE_ADDRESS, address)
    }
  },
  // 获取分类列表的数组
  async getCategorys ({ commit }, callback) {
    // 1、发送异步请求数据
    const result = await reqGetCategorys()
    if (result.code === 0) {
      const categorys = result.data
      // 2、拿到数据更新state中的数据
      commit(RECEIVE_CATEGORYS, categorys)
      // 在commit之后，因为commit更新数据，
      // 在数据更新之后调用，类似于watch
      /* callback只是一个形参名
        严格来说传了个函数，并且存在。再调用。防止没有报错 
      */
      typeof callback === 'function' && callback()
    }
  },
  // 获取商家的数组
  async getShops ({ commit, state }) {
    // 1、发送异步请求数据
    const { longitude, latitude } = state
    const result = await reqGetShops({ latitude, longitude })
    if (result.code === 0) {
      const shops = result.data
      // 2、拿到数据更新state中的数据
      commit(RECEIVE_SHOPS, shops)
    }
  },
  // 保存用户的同步action
  saveUser ({ commit }, user) {
    commit(RECEIVE_USER, user)
  },
  // 退出登录
  logout ({ commit }) {
    commit(RESET_USER)
  }
}
