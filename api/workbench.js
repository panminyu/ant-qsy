import http from './index'

export const getInstallList = () => http({ // 获取已安装应用列表
  url: 'app/app/installList',
  method: 'post'
})

export const getAllList = (params) => http({ // 获取全部应用列表
  url: 'app/app/allList',
  method: 'post',
  params
})

export const addApp = (params) => http({ // 添加应用
  url: 'app/app/addApp',
  method: 'post',
  params
})

export const delApp = (params) => http({ // 删除应用
  url: 'app/app/delApp',
  method: 'post',
  params
})
