/* 发送ajax的函数（实际是axios），函数的返回值是promise对象 */
/*  
  处理的问题
    1、处理post请求的请求参数：转换成urlencode格式（默认用的是json格式）：请求拦截器
    2、让成功的结果不是response，而是response.data：响应拦截器的成功回调
    3、统一处理请求错误：响应拦截器的失败回调
*/
import axios from "axios"
import qs from 'qs'

// 配置默认值
// 你可以指定将应用于每个请求的配置默认值。
// 全局axios默认值
// axios.defaults.baseURL = 'http://localhost:5000'

// 请求超时的语法，超过20秒进入失败的逻辑
axios.defaults.timeout = 20000

// 请求拦截器
// 接受两个参数：一个成功的回调，一个失败的回调
axios.interceptors.request.use(config => {
	// method: 请求方式
	// data: 数据
	const { method, data } = config
	if (method.toUpperCase() === 'POST' && data instanceof Object) {
		config.data = qs.stringify(data)
	}
	return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
	return response.data
}, error => {
	// 中断promise链，必须传一个空的回调，否则报错
	return new Promise(() => { })
	console.log(error)
})

export default axios

