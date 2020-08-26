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
          <NotificationList
            @tabInfo="DetailsInfoList"
            :info="toDadys"
            :active="active"
            :class="{'ceshi':isflod}"></NotificationList>
        </div>
        <div>
          <div  class="time_handle" style="margin-top: 24px;">
            <h4>更早</h4>
            <IconFont type="iconzhedie1" :class="[ismsg ? 'open':'fold']" @click="openFold(1)" ></IconFont>
          </div>
          <NotificationList
            @tabInfo="DetailsInfoList"
            :info="earlierList"
            :active="active"
            :class="{'ceshi':ismsg}"></NotificationList>
        </div>
      </div>

    </a-layout-sider>
    <a-layout >
      <a-layout-content class="right_content siderconten" id="right_content" width="1366" ref="rightChat">
        <div  style="min-width: 500px;overflow: auto" >
          <div class="header" v-if="activeInfo">
            <img :src="active_title.app_icon" alt=" " width="48" height="48" style="border-radius: 50%">
            <h2 style="display:inline-block;margin-left: 16px;">{{active_title.app_name}}</h2>
          </div>
          <div v-if="activeInfo" >
            <ChatWindow
              class="chats"
              :info="item"
              :active="active"
              v-for="(item,index) in activeInfo"
              :key="index"
              @isShow="DetailPage"
              @Submit="Submit"
            ></ChatWindow>
          </div>
          <DetailsMsg
            :detailVisible="isDetail"
            :detailsMsg="minuteMsg"
            :AIndex="active"
            @onClose="onClose"
            @Submit="Submit"
            v-if="minuteMsg"></DetailsMsg>
          <a-empty v-show="!activeInfo"  description="暂无数据" style="margin: 25% auto;" />
        </div>
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
import DetailsMsg from '../../components/ChatWindow/detailsInfo'
import ChatWindow from '../../components/ChatWindow/Chat'
import { IconFont } from '../../Mixins/Icon'
import { getSideList, getDetails } from '../../../api/msg'
import { getapplyDetail, applyReview } from '../../../api/approval'
// import { mapState } from 'vuex'
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
  components: { NotificationList, ChatWindow, IconFont, DetailsMsg },
  data () {
    return {
      activeInfo: null,
      active_title: null,
      active: null,
      isflod: false,
      ismsg: false,
      notification: data,
      minuteMsg: null,
      isDetail: false,
      toDadys: [],
      earlierList: [],
      websock: null
    }
  },
  created () {
    this.getMsgList()
  },
  computed: {
    f1 () {
      return this.$store.state.todaysList
    }
  },
  watch: { // 监听消息列表状态
    f1 (newval, oldval) {
      for (let j = 0; j < this.toDadys.length; j++) {
        if (newval.app_id === this.toDadys[j].app_id) {
          this.toDadys.splice(j, 1)
          continue
        }
      }
      console.log(this.toDadys)
      // for (let a = 0; a < newval.length; a++) {
      //   this.toDadys.unshift(newval[a])
      // }
      for (let k = 0; k < this.earlierList.length; k++) {
        if (newval.app_id === this.earlierList[k].app_id) {
          this.earlierList.splice(k, 1)
          continue
        }
        console.log(this.earlierList)
      }

      this.toDadys.unshift(newval)
    },
    activeInfo (newval, oldval) {
      this.$nextTick(() => {
        let dom2 = document.getElementById('right_content').scrollHeight
        document.getElementById('right_content').scrollTop = dom2
      })
    }
  },
  methods: {
    async getMsgList () { // 获取消息列表
      const msgList = await getSideList()
      if (msgList.code === 0) {
        this.toDadys = msgList.data.today
        this.earlierList = msgList.data.old
      }
    },
    async DetailsInfoList (data, index) { // 获取消息详细信息列表
      console.log('sss', data)
      const details = await getDetails({ app_id: data.app_id, msg_type: data.msg_type })
      if (details.code === 0) {
        this.active_title = details.app_info
        this.activeInfo = details.data
        this.active = index
        this.$message.success('成功获取数据')
      } else {
        this.$message.error('获取数据失败')
      }
    },
    openFold (type) { // 左侧消息列表的展开收起
      if (type === 0) {
        this.isflod = !this.isflod
      } else {
        this.ismsg = !this.ismsg
      }
    },
    async DetailPage (data) { // 获取审批详情
      console.log(data)
      if (this.isDetail === false) {
        const applyDetail = await getapplyDetail({ apply_id: data.apply_id })
        console.log(applyDetail)
        if (applyDetail.code === 0) {
          this.minuteMsg = applyDetail.data
          this.isDetail = true
        } else {
          this.$message.error('获取信息失败')
        }
      }
    },
    async Submit (type, data, index, subtype) { // 审批  同意 拒绝
      console.log(data)
      if (subtype === 0) {
        this.isDetail = false
      }
      const resultSP = await applyReview({ apply_id: data.apply_id, review_status: type })
      if (resultSP.code === 0) {
        this.$message.success(resultSP.msg)
        this.DetailsInfoList(data, index) // 调用消息详情列表刷新
      } else {
        this.$message.error(resultSP.msg)
      }
    },
    onClose () { // 关闭抽屉弹窗
      this.isDetail = !this.isDetail
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
  .right_content{
    background: #fff;
    text-align: left;
    overflow: auto;
  }
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
  .header{
    height:80px;
    border-bottom: 1px solid #e6e6e6;
    line-height: 80px;
    padding-left: 24px;
  }
  .infocontent{overflow: auto}
</style>
