import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import msite from './modules/msite'
import user from './modules/user'
import shop from './modules/shop'
Vue.use(Vuex)

export default new Vuex.Store({
	mutations,
	actions,
	getters,
	modules: {//vuex多模块编程
		msite: msite, // 子状态{}
		user: user, // 子状态{}
		shop: shop // 子状态{}
	}
})

/*
总state的状态数据结构：
{
	msite:{},
	user:{},
	shop:{}
}
获取的时候写法
state.user.user._id
state.shop.info
*/
