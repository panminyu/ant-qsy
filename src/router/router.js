import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import stote from '../vuex/store'
Vue.use(Router)
export const asyncRoutes = [
  {
    path: '/message',
    name: 'message',
    meta: { title: '消息', icon: 'iconxiaoxi1' },
    component: () => import('../views/message/index.vue')
  },
  {
    path: '/approval',
    name: 'approval',
    meta: { title: '审批', icon: 'iconlianxiren-copy' },
    component: () => import('../views/Approval/index.vue')
  },
  {
    path: '/workbench',
    name: 'workbench',
    meta: { title: '工作台', icon: 'icongongzuotai-copy' },
    component: () => import('../views/Work_Tai/index.vue')
  }
]
const router = new Router({
  // // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/message',
      children: asyncRoutes
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/Login.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  let info = stote.state.userInfo // 获取存放的用户信息
  // console.log(info)
  let isinfo = Object.keys(info).length === 0 // 判断用户信息的长度是否为0
  // console.log(isinfo)
  if (to.path !== '/login') {
    if (isinfo) { // 是否拿到登录信息
      next({ path: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
