import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(Router)
export const asyncRoutes = [
  {
    path: 'message',
    name: 'message',
    meta: { title: '消息', icon: 'message' },
    component: () => import('../views/message/index.vue')
  },
  {
    path: 'approval',
    name: 'approval',
    meta: { title: '审批', icon: 'profile' },
    component: () => import('../views/Approval/index.vue')
  },
  {
    path: 'workbench',
    name: 'workbench',
    meta: { title: '工作台', icon: 'appstore' },
    component: () => import('../views/Work_Tai/index.vue')
  }
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/message',
      children: asyncRoutes
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
