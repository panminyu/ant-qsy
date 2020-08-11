import Axios from 'axios'


const $http = Axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  transformRequest: [ data => {
    if (data === undefined) {
      data = { cid: localStorage.getItem('cid') || '' } // localStorage.getItem('cid') }
      // console.log(2)
      // data.cid = 1126
    } else {
      data.cid = localStorage.getItem('cid') || ''// localStorage.getItem('cid')
    }
    return JSON.stringify(data)
  }]
})
// 发送请求前拦截器
$http.interceptors.request.use(res => {
  // res.data.cid = 1129
  // res.headers.common['TOKEN'] = localStorage.getItem('token') || ''
  res.headers.common['TOKEN'] = localStorage.getItem('Token') || ''
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
    // console.log('运程请求失败')
    this.$message.error('运程请求失败')
  })
})
