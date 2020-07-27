import Axios from 'axios'

const $http = Axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  transformRequest: [ data => {
    if (data === undefined) {
      data = { cid: 1129 } // localStorage.getItem('cid') }
      console.log(2)
      // data.cid = 1126
    } else {
      data.cid = 1129 // localStorage.getItem('cid')
      console.log(data)
    }
    return JSON.stringify(data)
  }]
})
// 发送请求前拦截器
$http.interceptors.request.use(res => {
  console.log(res)
  // res.data.cid = 1129
  // res.headers.common['TOKEN'] = localStorage.getItem('token') || ''
  res.headers.common['TOKEN'] = 'fXMqV4w8k/eTBpK36zZukYcGL/+ilGhrTf0pVMWLJWzfCggwHh1t1yxsqK0Thw0y'
  return res
})
export default (opt) => new Promise((resolve) => {
  console.log(opt)
  const baseHeaders = {
    TOKEN: 'fXMqV4w8k/eTBpK36zZukYcGL/+ilGhrTf0pVMWLJWxiyw+3SxzUcZFby69axtte'
  }
  const options = {
    ...opt,
    headers: baseHeaders,
    method: opt.method || 'GET'
  }
  $http(options).then(res => {
    resolve(
      res.data
    )
  }).catch(res => {
    console.log('运程请求失败')
  })
})
