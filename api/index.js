import Axios from 'axios'
import { getCid, getToken } from "../src/util/auth"
import { message } from 'ant-design-vue'

const $http = Axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  transformRequest: [ data => {
    if (data === undefined) {
      data = { cid: getCid() || '' } // localStorage.getItem('cid') }
      // console.log(2)
      // data.cid = 1126
    } else {
      data.cid = getCid() || ''// localStorage.getItem('cid')
    }
    return JSON.stringify(data)
  }]
})
// 发送请求前拦截器
$http.interceptors.request.use(res => {
  // res.data.cid = 1129
  // res.headers.common['TOKEN'] = localStorage.getItem('token') || ''
  res.headers.common['TOKEN'] = getToken() || ''
  console.log(getToken())
  return res
})
export default (opt) => new Promise((resolve) => {
  const options = {
    ...opt,
    method: opt.method || 'GET'
  }
  $http(options).then(res => {
    resolve(
      res.data
    )
  }).catch(res => {
    console.log('运程请求失败')
    message.error('运程请求失败')
  })
})
