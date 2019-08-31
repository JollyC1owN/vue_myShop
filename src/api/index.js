/* 包含多个接口请求函数的模块 */
import ajax from './ajax'

const BASE = '/api'

// 根据经纬度来获取位置详情
export const reqAddress = (longitude, latitude) => ajax({
  method: 'GET',
  url: BASE + `/position/${latitude},${longitude}`
})

// 获取食品分类列表
export const reqGetCategorys = () => ajax.get(BASE + '/index_category')


// 根据经纬度获取商铺列表

export const reqGetShops = ({ latitude, longitude }) => ajax({
  method: 'GET',
  url: BASE + '/shops',
  params: {
    latitude,
    longitude
  }
})

reqAddress('116.36867', '40.10038').then((result) => {
  console.log('result', result)
})
