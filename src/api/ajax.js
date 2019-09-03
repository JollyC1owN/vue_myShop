/* 发送ajax的函数（实际是axios），函数的返回值是promise对象 */
/*  
  处理的问题
    1、处理post请求的请求参数：转换成urlencode格式（默认用的是json格式）：请求拦截器
    2、让成功的结果不是response，而是response.data：响应拦截器的成功回调
		3、统一处理请求错误：响应拦截器的失败回调
		4、如果是需要携带token的请求，从state中取出token。
				1）没有：不发请求，直接进入失败的流程，提示用户登录
				2）有：添加到请求头中：Authorization = token
 */
import axios from "axios"
import qs from 'qs'
// 引入store对象，可以在下面获取到state
import store from '../store'
// 引入router对象，可以在下面使用router
import router from '../router'
import { Toast } from 'mint-ui'
// 配置默认值
// 你可以指定将应用于每个请求的配置默认值。
// 全局axios默认值
// axios.defaults.baseURL = 'http://localhost:4000'

// 请求超时的语法，超过20秒进入失败的逻辑
// axios.defaults.timeout = 20000

// 请求拦截器
// 接受两个参数：一个成功的回调，一个失败的回调
axios.interceptors.request.use(config => {
	// 1、处理post请求的请求参数：转换成urlencode格式（默认用的是json格式）：请求拦截器
	// method: 请求方式
	// data: 数据
	const { method, data } = config
	if (method.toUpperCase() === 'POST' && data instanceof Object) {
		config.data = qs.stringify(data)
	}
	// 4、如果是需要携带token的请求，从state中取出token。
	if (config.headers.needToken) {
		const token = store.state.user.token
		// 1）没有：不发请求，直接进入失败的流程
		if (!token) {
			const error = new Error('请登录您的帐户')
			error.status = 401   //没有权限 、 权限过期
			throw error
		} else {
			// 2）有：添加到请求头中：Authorization = token
			config.headers['Authorization'] = token
		}
	}
	return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
	return response.data
}, error => {
	// error的整体结构
	/* {
		message,
		request,
		response  //有值，说明发了请求后，返回错误，没有值则是发请求前的错误
	}*/
	// status是在上面自己加入的
	const { response, status, message } = error
	// 发请求前没有需要的token就失败   response没有值
	if (!response) {
		if (status === 401) {
			// 获取当前的路由;
			if (router.currentRoute.path !== '/login') {
				// 不在登录界面的时候提示
				Toast(message)
				// 跳转到登陆页面--编程式
				router.replace('/login')
			}
		}
	} else {
		// 发了请求发现token过期了 --401
		if (response.status === 401) {
			if (router.currentRoute.path !== '/login') {
				// 不在登录界面的时候提示
				Toast('登录信息已过期，请重新登录')
				// 退出登录，清空用户信息
				store.dispatch('logout')
				// 跳转到登陆页面--编程式
				router.replace('/login')
			}
		} else if (response.status === 404) {
			// 请求的资源不存在--404
			Toast('请求资源不存在')
		} else {
			Toast('请求错误' + message)
			router.replace('/login')
		}

	}


	// alert(error.message)
	// 中断promise链，必须传一个空的回调，否则报错
	return new Promise(() => { })
})

export default axios

