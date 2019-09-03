/* 包含多个接口请求函数的模块 */
import ajax from './ajax'

const BASE = '/api'

// 根据经纬度来获取位置详情
export const reqAddress = (longitude, latitude) => ajax({
  method: 'GET',
  url: BASE + `/position/${latitude},${longitude}`
})

// 获取食品分类列表
export const reqGetCategorys = () => ajax.get(BASE + '/index_category', {
  headers: {
    needToken: true //做为一个标识，告诉请求拦截器，我需要
  }
})


// 根据经纬度获取商铺列表
export const reqGetShops = ({ latitude, longitude }) => ajax({
  method: 'GET',
  url: BASE + '/shops',
  params: {
    latitude,
    longitude
  },
  headers: {
    needToken: true //做为一个标识，告诉请求拦截器，我需要
  }
})

// 发送短信验证码
export const reqSendCode = (phone) => ajax.get(BASE + '/sendcode', {
  params: {
    phone
  }
})

// 验证用户名、密码、验证码
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax.post(BASE + '/login_pwd', { name, pwd, captcha })

// 手机号和短信验证码登录
export const reqSmsLogin = (phone, code) => ajax.post(BASE + '/login_sms', { phone, code })


// 自动登录请求
export const reqAutoLogin = () => ajax({
  url: BASE + '/auto_login',
  headers: {
    needToken: true
  }
})
