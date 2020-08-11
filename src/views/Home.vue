<template>
  <div class="container">
    <a-layout class="main">
    <a-layout-sider  :style="{ width: '74px', maxWidth: '74px',minWidth:'74px'}" class="sider" :defaultCollapsed="true">
      <Avatar  :username="User.username"
               :src="User.avator"
               background-color="#0dd1f0"
               color="#fff"
               style=" vertical-align: middle;margin: 20px auto;border: 3px solid #fff;"
               :inline="true">
      </Avatar>
    <Amenu :Menus = meuns></Amenu>
    </a-layout-sider>
    <a-layout>
    <a-layout-content class="content">
    <router-view></router-view>
    </a-layout-content>
    </a-layout>
    </a-layout>
  </div>
</template>
<script>
// @ is an alias to /src
import Amenu from '../components/Menu/Amenu'
import Avatar from 'vue-avatar'
import { asyncRoutes } from '../router/router'
import { mapState } from 'vuex'
import store from '../vuex/store'
import { getBind } from '../../api/msg'
export default {
  components: { Amenu, Avatar },
  name: 'home',
  data () {
    return {
      meuns: [],
      titme: null
    }
  },
  computed: {
    ...mapState({
      User (state) { return state.userInfo }
    })
  },
  created () {
    this.meuns = asyncRoutes
    this.initwebsoket()
  },
  methods: {
    initwebsoket () {
      const wsUrl = 'ws://qsy.officelinking.com:8282'
      this.websock = new WebSocket(wsUrl)
      this.websock.onopen = this.websocketOpen
      this.websock.onmessage = this.websocketMsg
      this.websock.onclose = this.websocketClose
      this.websock.onerror = this.websocketError
    },
    // 连接成功
    websocketOpen () {
      // console.log('已连接')
      this.strat()
    },
    strat () {
      // this.titme = setTimeout(() => {
      //   this.initwebsoket()
      //   this.websock.send('ping')
      // }, 33000)
    },
    // 接收消息
    websocketMsg (e) {
      // console.log(e.data)
      console.log('收到消息啦=========>')
      const obdata = JSON.parse(e.data)
      if (obdata.type === 'init') {
        getBind({ client_id: obdata.client_id })
      } else {
        console.log('添加数据=======>')
        console.log(obdata)
        console.log(obdata.data)
        store.dispatch('getNewList', obdata.data)
      }
    },
    // 关闭
    websocketClose () {
      console.log('关闭连接')
    },
    // 失败
    websocketError () {
      console.log('连接失败')
    }
  },
  destroyed () {
    this.websock.onerror()
    clearInterval(this.titme)
  }
}
</script>
<style scoped>
  .main{display: flex;height: 100%;position: absolute;top: 0;left: 0;width: 100%}
  .a-layout-sider{min-height: 1200px;height: 200px;}
  .test{list-style: none;}
  .sider{width: 74px;}
  /*.content{min-width: 1130px;overflow: hidden;}*/
</style>
