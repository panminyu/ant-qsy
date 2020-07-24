import http from './index'

export const applyWaitList = () => http({ // 获取待审批列表
  url: 'app/approval/applyWaitList',
  method: 'post'
})

export const applyPassList = (data) => http({ // 获取已审批列表
  url: 'app/approval/applyPassList',
  method: 'post',
  data
})

export const applyList = (data) => http({ // 获取发起审批列表
  url: 'app/approval/applyList',
  method: 'post',
  data
})

export const copyToMyList = (data) => http({ // 获取抄送审批列表
  url: 'app/approval/copyToMyList',
  method: 'post',
  data
})

export const applyType = () => http({ // 获取发起申请审批列表
  url: 'app/approval/applyType',
  method: 'post'
})

export const getapplyDetail = (data) => http({ // 获取发起申请审批列表
  url: 'app/approval/applyDetail',
  method: 'post',
  data
})
