<template>
<div>
  <a-layout class="main">
    <a-layout-sider width="480" class="siderconten msg_sider">
      <div style="margin: 10px 20px 24px 24px;">
        <a-input placeholder="搜索" class="message_input">
          <a-icon slot="prefix" type="search" />
        </a-input>
        <IconFont type="icontianjia_l" class="icon"></IconFont>
      </div>
      <div>
        <div>
          <div class="time_handle">
            <h4>今天</h4>
            <IconFont type="iconzhedie1" :class="[isflod ? 'open':'fold']" @click="openFold(0)"></IconFont>
          </div>
          <NotificationList v-on:tabInfo="activeInfos" :info="notification" :active="active" :class="{'ceshi':isflod}"></NotificationList>
        </div>
        <div>
          <div  class="time_handle" style="margin-top: 24px;">
            <h4>更早</h4>
            <IconFont type="iconzhedie1" :class="[ismsg ? 'open':'fold']" @click="openFold(1)" ></IconFont>
          </div>
          <NotificationList v-on:tabInfo="activeInfos" :info="notification" :active="active" :class="{'ceshi':ismsg}"></NotificationList>
        </div>
      </div>

    </a-layout-sider>
    <a-layout>
      <a-layout-content class="content" width="1366" style="background: #fff;text-align: left;">
        <ChatWindow :info="activeInfo" :active="active"></ChatWindow>
         <a-empty v-show="!activeInfo"  description="暂无数据" style="margin: 25% auto;" />
      </a-layout-content>
      <a-layout-sider width="56" style="background: #F1F1F1;text-align: center;padding-top: 15px">
        <div class="right_menu_icon">
          <img src="../../assets/serachICON.png" alt="" width="24" height="24">
        </div>
        <div class="right_menu_icon">
          <img src="../../assets/setICON.png" alt="" width="24" height="24">
        </div>
      </a-layout-sider>
    </a-layout>
  </a-layout>
</div>
</template>

<script>
import NotificationList from '../../components/Notification_list/NotificationList'
import ChatWindow from '../../components/ChatWindow/Chat'
import { IconFont } from '../../Mixins/Icon'
import { mapState } from 'vuex'
const data = [
  {
    title: '审批'
  },
  {
    title: '工资单'
  },
  {
    title: '通知'
  },
  {
    title: '洒洒水'
  }
]
export default {
  name: 'index',
  components: { NotificationList, ChatWindow, IconFont },
  data () {
    return {
      activeInfo: '',
      active: 0,
      isflod: false,
      ismsg: false,
      notification: data,
      websock: null
    }
  },
  created () {
  },
  computed: {
    ...mapState({
      toDaysList (state) {
        return state.navList
      }
    })
  },
  watch: {
    toDaysList () {
      console.log(244444)
    }
  },
  methods: {
    activeInfos (data, index) {
      this.activeInfo = data
      this.active = index
    },
    openFold (type) {
      if (type === 0) {
        this.isflod = !this.isflod
      } else {
        this.ismsg = !this.ismsg
      }
    }
  }
}
</script>

<style scoped>
  .msg_sider{
    background: #fff;
    text-align: left;
    border-right: 1px solid #E6E6E6;
    overflow: auto;
  }
.title_list{list-style: none}
  .title_list li{height: 20px;background: #fff;border-bottom: 1px steelblue solid;width: 100%;}
  .main{height: 100%;position: absolute;bottom: 0;top: 0;width: calc(100% - 75px); }
  .a-layout-sider {flex: 1 1;}
  .icon{
    font-size: 40px;
    color: #9A9A9A;
    vertical-align: middle;
    margin-left: 10px;
  }
  .right_menu_icon{ line-height: 45px;}
  .right_menu_icon:hover{background: #fff;cursor: pointer;}
  .time_handle{margin-left: 24px;overflow: hidden}
  .time_handle h4{ float: left;font-weight: bold;}
  .time_handle i{float: right;margin-right: 20px;cursor: pointer;font-size: 20px;color: #777;}
  .time_handle i:hover{color: #2A5AFF}
  .open{ transition: all 0.5s;}
  .fold{transform: rotate(180deg); transition: all 0.5s;}
  .ceshi{
    opacity: 0;
    /*transform: translateY(300px);*/
    display: none;
  }
  .message_input{width: 384px;height: 40px;}
</style>
