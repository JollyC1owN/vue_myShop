import { RECEIVE_ADDRESS, RECEIVE_SHOPS, RECEIVE_CATEGORYS, RECEIVE_USER, RESET_USER, RECEIVE_TOKEN, RESET_TOKEN } from './mutayion-types'
export default {
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
  [RECEIVE_USER] (state, { user }) {
    state.user = user
  },
  [RESET_USER] (state) {
    state.user = {}
  },
  [RECEIVE_TOKEN] (state, token) {
    state.token = token
  },
  [RESET_TOKEN] (state) {
    state.token = ''
  }
}
