/* 管理商家shop功能模块相关的状态数据的vuex模块 */
import Vue from 'vue'
import {
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../../api/index'

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART
} from '../mutayion-types'

const state = {
  goods: [],//商品列表
  ratings: [],//商家评价列表
  info: {},//商家信息
  cartFoods: []  //购物车food数组
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
  [ADD_FOOD_COUNT] (state, { food }) {
    if (food.count) {
      food.count++
    } else {
      // 给food添加一个属性，属性名是count
      // 新添加的数据没有数据绑定，在页面中不会更新
      // food.count = 1
      // 为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新
      Vue.set(food, 'count', 1)
      // 将当前传入的food对象添加到购物车数组
      state.cartFoods.push(food)
    }
  },
  [REDUCE_FOOD_COUNT] (state, { food }) {
    // 不用判断小于0，因为小于0的时候，减的按钮就消失了
    // 判断大于0是避免连续点击多次，会一闪而过 -1 -2。。。
    if (food.count > 0) {
      food.count--
      // 一旦数据减为0,从购物车中移出food
      if (food.count == 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART] (state) {
    // 将购物车中所有food的count清空
    state.cartFoods.forEach(food => {
      // 不用删除属性，因为没有触发数据绑定
      // delete food.count
      // 所以改变数据值
      food.count = 0
    })
    // 把购物车数组清空 
    state.cartFoods = []
  }
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
  },
  // 增加或者减少购物的数量
  updateFoodCount ({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(ADD_FOOD_COUNT, { food })
    } else {
      commit(REDUCE_FOOD_COUNT, { food })
    }
  },
}

const getters = {
  // 使用计算属性：当它所依赖的属性变化的时候它就会执行。

  /*  但是每当我们点击增加或者减少按钮时，它依赖的属性就会变化，
     从而会触发该计算属性执行，从而计算属性中的循环，会执行，
     这样用计算属性的话，效率就会降低
    cartFoods (state) {
     const { goods } = state
     const arr = []
     goods.forEach(good => {
       good.food.forEach((food) => {
         if (food.count > 0) {
           arr.push(food)
         }
       })
     })
     return arr
   }  */


  // 总数量
  totalCount (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },
  // 总价格
  totalPrice (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
