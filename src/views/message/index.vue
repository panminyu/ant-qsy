<template>
<div>
  <a-layout class="main">
    <a-layout-sider width="480" style="background: #fff;text-align: left;">
      <div style="margin: 10px 15px;">
        <a-input placeholder="Basic usage" />
      </div>
    <NotificationList v-on:tabInfo="activeInfos" :info="notification"></NotificationList>
    </a-layout-sider>
    <a-layout>
      <a-layout-content class="content" width="1366">
        <ChatWindow :info="activeInfo" :active="active"></ChatWindow>
         <a-empty v-show="!activeInfo"  description="暂无数据" style="margin: 25% auto;" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</div>
</template>

<script>
import NotificationList from '../../components/Notification_list/NotificationList'
import ChatWindow from '../../components/ChatWindow/Chat'
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
  components: { NotificationList, ChatWindow },
  data () {
    return {
      activeInfo: '',
      active: 0,
      notification: data
    }
  },
  created () {
  },
  methods: {
    activeInfos (data, index) {
      this.activeInfo = data
      this.active = index
    }
  }
}
</script>

<style scoped>
.title_list{list-style: none}
  .title_list li{height: 20px;background: #fff;border-bottom: 1px steelblue solid;width: 100%;}
  .main{height: 100%;position: absolute;bottom: 0;top: 0;width: calc(100% - 75px); }
  .a-layout-sider {flex: 1 1;}
</style>
