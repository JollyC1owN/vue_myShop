import { reqAddress, reqGetShops, reqGetCategorys, reqAutoLogin } from '../api/index'
import { RECEIVE_ADDRESS, RECEIVE_SHOPS, RECEIVE_CATEGORYS, RECEIVE_USER, RESET_USER, RECEIVE_TOKEN, RESET_TOKEN } from './mutayion-types'

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
    // 保存用户信息中的token
    const token = user.token
    // 把token保存到localStorage中
    localStorage.setItem('token_key', token)
    // 把token保存到state中
    commit(RECEIVE_TOKEN, token)
    // 删除user中的token,用户user中只保存用户的信息，不再保存token，token单独保存了
    delete user.token
    commit(RECEIVE_USER, { user })
  },
  // 退出登录
  logout ({ commit }) {
    // 把user、token、以及localStorage中的token都清空
    commit(RESET_USER)
    commit(RESET_TOKEN)
    localStorage.removeItem('token_key')
  },

  // 自动登录
  async autoLogin ({ commit, state }) {
    // 判断一下，有token，就携带着token去发自动登录的请求
    if (state.token) {
      const result = await reqAutoLogin()
      if (result.code === 0) {
        const user = result.data
        // 保存用户
        commit(RECEIVE_USER, { user })
      }
    }
  }
}
