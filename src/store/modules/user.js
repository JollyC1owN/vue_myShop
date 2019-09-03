/* 管用户user功能模块相关的状态数据的vuex模块 */
import {
  reqAutoLogin
} from '../../api/index'
import {
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN,
} from '../mutayion-types'
const state = {
  user: {}, //当前登录用户
  token: localStorage.getItem('token_key'), // 当前登录用户的token

}
const mutations = {
  // 用户
  [RECEIVE_USER] (state, { user }) {
    state.user = user
  },
  [RESET_USER] (state) {
    state.user = {}
  },
  // token
  [RECEIVE_TOKEN] (state, token) {
    state.token = token
  },
  [RESET_TOKEN] (state) {
    state.token = ''
  },
}
const actions = {
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
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
