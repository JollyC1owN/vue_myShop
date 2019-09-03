/*
使用mockjs定义mock接口
*/
import Mock from 'mockjs'
// 加载json文件得到的是解析后的js对象
import data from './data.json'

/* 生成mock接口 */

// goods接口
Mock.mock('/goods', { code: 0, data: data.goods })
// ratings接口
Mock.mock('/ratings', { code: 0, data: data.ratings })
// info接口
Mock.mock('/info', { code: 0, data: data.info })

// 不需要往外暴露该模块***************
