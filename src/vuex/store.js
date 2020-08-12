import Vue from 'vue'
import Vuex from 'vuex'
import { getUsers, getCurrentUser } from '../util/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routers: [],
    Token: '',
    cid: null,
    userInfo: JSON.parse(getUsers()),
    currInfo: JSON.parse(getCurrentUser()),
    todaysList: []
  },
  mutations: {
    updateTodayList (state, List) { // 修改消息状态信息
      state.todaysList = List
    },
    setUserInfo (state, data) {
      state.userInfo = data
    },
    setcurrent (state, user) {
      state.currInfo = user
      state.cid = state.currInfo.id
    },
    setToken (state, token) {
      state.Token = token
    }
  },
  actions: {
    getNewList: ({ commit }, List) => { // 存入最新消息
      commit('updateTodayList', List)
    },
    getUserInfo: ({ commit }, data) => { // 存入用户信息
      commit('setUserInfo', data)
    },
    getToken: ({ commit }, token) => { // 存入token
      commit('setToken', token)
    },
    getcurrentUser: ({ commit }, user) => {
      commit('setcurrent', user)
    }
  }
})
