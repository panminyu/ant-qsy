import http from './index'

export const getVerify = (data) => http({ // 获取验证码
  url: 'app/api/getVerify',
  method: 'post',
  data
})

export const loginByVerify = (data) => http({ // 验证码登陆
  url: 'app/api/loginByVerify',
  method: 'post',
  data
})

export const getUserInfo = (data) => http({ // 获取用户信息
  url: 'app/user/getUserinfo',
  method: 'post',
  data
})
