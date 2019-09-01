import { reqAddress, reqGetShops, reqGetCategorys } from '../api/index'
import { RECEIVE_ADDRESS, RECEIVE_SHOPS, RECEIVE_CATEGORYS } from './mutayion-types'

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
  async getCategorys ({ commit }) {
    // 1、发送异步请求数据
    const result = await reqGetCategorys()
    if (result.code === 0) {
      const categorys = result.data
      // 2、拿到数据更新state中的数据
      commit(RECEIVE_CATEGORYS, categorys)
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
  }
}
