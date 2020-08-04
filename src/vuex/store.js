import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routers: [],
    Token: '',
    todaysList: []
  },
  mutations: {
    updateTodayList (state, List) {
      state.todaysList = List
    }
  },
  actions: {
    getNewList: ({ commit }, List) => {
      commit('updateTodayList', List)
    }
  }
})
