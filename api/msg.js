import http from './index'

export const getBind = (data) => http({ // websocket连接成功推送
  url: 'push/push/bind',
  method: 'post',
  data
})

export const getSideList = () => http({ // 获取消息列表
  url: 'app/msg/sideList',
  method: 'post'
})
export const getDetails = (data) => http({ // 获取消息列表
  url: 'index.php/app/msg/appList',
  method: 'post',
  data
})
