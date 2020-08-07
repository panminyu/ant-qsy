<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import store from './vuex/store'
import { getBind } from '../api/msg'
export default {
  data () {
    return {
      titme: null
    }
  },
  created () {
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
<style lang="less">
#app {
   font-family:Microsoft YaHei;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  min-width: 1130px;
}
.ant-anchor-ink{display: none}
/*span,p{ color: #333;}*/
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.ant-btn{color: #2A5AFF!important;}
.ant-btn_Def{border: 1px solid #2A5AFF!important;}
.ant-btn-link{color: #2A5AFF}
.ant-btn-primary{color: #fff!important;
  background: #2a5aff !important; }
.siderconten::-webkit-scrollbar{
  width: 1px;
}
.siderconten::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #bcbcbc;
}
.siderconten::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  background   : #ededed;
}
</style>
