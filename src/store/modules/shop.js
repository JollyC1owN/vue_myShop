/* 管理商家shop功能模块相关的状态数据的vuex模块 */

import {
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../../api/index'

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from '../mutayion-types'

const state = {
  goods: [],//商品列表
  ratings: [],//商家评价列表
  info: {}//商家信息
}
const mutations = {
  // mock
  [RECEIVE_GOODS] (state, goods) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state, ratings) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state, info) {
    state.info = info
  },
}
const actions = {
  /* mock的操作 */
  // 获取商品列表
  async getGoods ({ commit }, callback) {
    // 1、发送异步请求数据
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      // 2、拿到数据更新state中的数据
      commit(RECEIVE_GOODS, goods)
      typeof callback === 'function' && callback()
    }
  },
  // 用户评论
  async getRatings ({ commit }, callback) {
    // 1、发送异步请求数据
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      // 2、拿到数据更新state中的数据
      commit(RECEIVE_RATINGS, ratings)
      typeof callback === 'function' && callback()
    }
  },
  // 商家列表
  async getInfo ({ commit }, callback) {
    // 1、发送异步请求数据
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      // 2、拿到数据更新state中的数据
      commit(RECEIVE_INFO, info)
      typeof callback === 'function' && callback()
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
