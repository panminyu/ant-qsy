<template>
<div style="height: 713px;">
  <a-layout >
    <a-layout-sider width="500" class="siderconten">
      <ul class="Trial_list">
        <li v-for="(item,index) in waitlist"
            :key="item.id"
            @click="activeapply(item,index)"
            :class="{active:index === active}"
            style="padding-left: 16px;">
          <Avatar  :username="item.apply_name"
                   background-color="#0dd1f0"
                   color="#fff"
                   style=" vertical-align: middle;margin-top: 21px;float: left"
                   :inline="true"></Avatar>
          <div style="float: left;padding-top: 20px;padding-left: 16px">
            <h3 style="font-weight: bold;">{{item.apply_name}}</h3>
            <span v-if="item.type === 1">请假 </span>
            <span v-else-if="item.type === 2">出差 </span>
            <span v-else-if="item.type === 3">加班 </span>
            <span v-else-if="item.type === 4">换班 </span>
            <span v-else-if="item.type === 5">补卡</span>
            {{item.start_time}}至{{item.end_time}}
          </div>
        </li>
      </ul>
    </a-layout-sider>
    <a-layout>
      <a-spin :spinning="isShow">
       <a-layout-content class="siderconten letBorder">
        <div class="conten_approval">
          <div class="header-title">
            <div class="title_left">
              <Avatar v-if="acticecontent.apply_name"
                      :username="acticecontent.apply_name"
                      background-color="#0dd1f0"
                      color="#fff"
                      style=" vertical-align: middle;margin: 20px auto;"
                      :inline="true"></Avatar>
              <div style="display: inline-grid;vertical-align: bottom; margin-left: 10px;">
                <h3>{{acticecontent.apply_name}}</h3>
                <p>欧菲智联</p>
              </div>
            </div>
            <div class="title_right">
              <span class="icon_color">审批中</span>
            </div>
          </div>
          <div class="conten">
            <div>
              <label>申请编号</label>
              <p>000000000000</p>
            </div>
            <div>
              <label>请假类型</label>
              <p>
                <span v-if="acticecontent.type ==1">请假</span>
                <span v-if="acticecontent.type ==2">出差</span>
                <span v-if="acticecontent.type ==3">加班</span>
                <span v-if="acticecontent.type ==4">换班</span>
                <span v-if="acticecontent.type ==5">补卡</span>
              </p>
            </div>
            <div>
              <label>开始时间</label>
              <p>{{acticecontent.start_time}}</p>
            </div>
            <div>
              <label> 结束时间 </label>
              <p>{{acticecontent.end_time}}</p>
            </div>
            <div>
              <label>请假时长</label>
              <p>{{acticecontent.days}}</p>
            </div>
            <div>
              <label>请假事由</label>
              <p>
                {{acticecontent.apply_msg}}
              </p>
            </div>
            <div>
              <label>图片</label>
              <div>
                <div style="background: sandybrown;width: 80px;height: 80px;margin-top: 5px;"></div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div>
              <span style="z-index: 3"> 审批进程</span>

              <a-timeline style="margin-top: 25px;">
                <a-timeline-item style="height: 100px;">
                  <Avatar
                          slot="dot"
                          :username="acticecontent.apply_member_info.username"
                          :src="acticecontent.apply_member_info.photo"
                          background-color="#0dd1f0"
                          color="#fff"
                          style=" vertical-align: middle;"
                          :inline="true"></Avatar>
                  <div style="margin-left: 20px">
                    <span> {{acticecontent.apply_member_info.username}}</span><br/>
                      <img src="../../../assets/adopt.png" alt="" style="margin-left: -30px;">
                      <span style="color:#04CB12;margin-left: 10px;" >发起审批</span>
                    <span style="float: right;margin-right: 50px;">7-10 20:00</span>
                  </div>
                </a-timeline-item>
                <a-timeline-item style="height: 100px;" v-for="item in acticecontent.review_member_info" :key="item.review_status">
                  <Avatar
                    slot="dot"
                    :username="item.username"
                    :src="item.photo"
                    background-color="#0dd1f0"
                    color="#fff"
                    style=" vertical-align: middle;"
                    :inline="true"></Avatar>
                  <div style="margin-left: 20px">
                    <span>{{item.username}}</span><br/>
                    <img :src="icornArr[item.review_status]" alt="" style="margin-left: -30px;">
                    <span style="margin-left: 10px;">{{itemArr[item.review_status]}}</span>
                    <span style="float: right;margin-right: 50px;">7-10 20:00</span>
                  </div>
                </a-timeline-item>
                <a-timeline-item style="height: 100px;">
                    <img src="../../../assets/gaizhangicon.png" alt=""  slot="dot">
                  <div style="margin-left: 20px">抄送</div>
                  <div>
                    <span style="margin-left: 20px" v-for="ss in acticecontent.send_member_info" :key="ss.username"> {{ss.username}}</span>
                  </div>
                  <span style="float: right;margin-right: 50px;">7-10 20:00</span>
                </a-timeline-item>
              </a-timeline>
            </div>
            <div>
              <div style="float: left">
                <a-button type="link" @click="Cancel(acticecontent.id)">
                 撤销
                </a-button>
                <!--<a-button type="link" @click="Transfer(acticecontent)">-->
                  <!--转交-->
                <!--</a-button>-->
              </div>
              <div style="float: right">
                <a-button style="margin-right: 15px" @click="isModal(acticecontent,0)">拒绝</a-button>
                <a-button type="primary" style="margin-right: 15px" @click="isModal(acticecontent,1)">同意</a-button>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>
      </a-spin>
    </a-layout>
  </a-layout>
  <a-modal
    :title="Title"
    :visible="visible"
    @ok="handleOk(acticecontent,status)"
    @cancel="handleCancel"
  >
    <a-textarea
      v-model="opinion"
      placeholder="请填写审批意见（选填）"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    ></a-textarea>
  </a-modal>
</div>
</template>
<script>
import Avatar from 'vue-avatar'
import { getapplyDetail, applyCancel, applyReview } from '../../../../api/approval'
export default {
  components: { Avatar },
  props: {
    waitlist: {
      type: Array,
      default: () => ([])
    }
  },
  name: 'approval_list',
  data () {
    return {
      itemArr: ['待审核', '审核中', '拒绝', '通过'],
      icornArr: [require('../../../assets/examine.png'), require('../../../assets/adopt.png'), require('../../../assets/refuse.png')],
      icon: require('../../../assets/examine.png'),
      active: 0,
      acticecontent: {
        apply_member_info: { username: '', photo: '' }
      },
      isShow: true,
      visible: false,
      Title: '',
      opinion: '',
      status: 0
    }
  },
  created () {
    setTimeout(() => {
      this.getcontent(this.waitlist[0].id)
      console.log(this.waitlist[0].id)
    }, 100)
  },
  methods: {
    async getcontent (applyid) {
      const activeC = await getapplyDetail({ apply_id: applyid })
      if (activeC.code === 0) {
        this.acticecontent = activeC.data
        this.isShow = false
      }
    },
    activeapply (row, index) {
      this.getcontent(row.id)
      this.active = index
      this.isShow = true
    },
    async Cancel (id) { // 撤销审批
      console.log(id)
      const Acancel = await applyCancel({ apply_id: id })
      if (Acancel.code === 0) {
        console.log(Acancel)
      }
    },
    // async Transfer (row) { // 转交
    //   const sfer = await deliverOperation({ apply_id: row.id,mid:row })
    //   if (sfer.code === 0) {
    //     console.log(sfer)
    //   }
    // },
    isModal (data, type) {
      if (type === 1) {
        this.Title = '确定同意' + data.username + '的' + data.holiday_type + '申请吗'
      } else {
        this.Title = '确定拒绝' + data.username + '的' + data.holiday_type + '申请吗'
      }
      this.visible = true
      this.status = type
    },
    async  handleOk (data, type) {
      const MoldData = await applyReview({ apply_id: data.id, type: data.type, review_status: type, msg: this.opinion })
      if (MoldData.code === 0) {
        console.log(MoldData)
        this.$emit('update')
      }
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style scoped>
  .active{
    background: rgb(236,237,255);
  }
.siderconten{
  background: #fff;
  text-align: left;
  height: 650px;
  overflow: auto;
  border: 1px solid #ccc;
}
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
.Trial_list{
  list-style: none;
  padding: 0;
}
.Trial_list > li{
  border-bottom: 1px solid #ccc;
  height: 100px;
  cursor: pointer;
}
/*.Trial_list > li:hover{*/
  /*background: rgb(250, 251, 255);*/
/*}*/
  .letBorder{
    border-left: none;
  }
  .conten_approval{
    background: #fff;
  }
  .header-title{
    border-bottom: 1px solid #ccc;
    overflow: hidden;
  }
  .header-title h3{
    font-weight: bold;
  }
  .title_left{
    float: left;
    margin-left: 25px;
  }
  .title_right{
    float: right;
    line-height: 90px;
    margin-right: 10px;
  }
  .icon_color{
    background: #fff0d7;
    color: #F6A905;
    padding: 2px 6px;
    border-radius: 5px;
  }
  .conten{
    margin-top: 15px;
    padding: 0 30px;
  }
  .conten label{
    /*font-size: 14px;*/
    color: #AAAAAA;
  }
  .conten p{
    color: #333333;
  }
  .footer{
    margin-top: 20px;
    border-top: 1px solid #ccc;
    padding-top: 19px;
    padding-left: 30px;
  }
</style>
