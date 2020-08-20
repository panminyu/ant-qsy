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
                   :src="item.photo"
                   color="#fff"
                   style=" vertical-align: middle;margin-top: 21px;float: left"
                   :inline="true"></Avatar>
          <div style="float: left;padding-top: 20px;padding-left: 16px">
            <h3 style="font-weight: bold;font-size: 18px">{{item.apply_name}}</h3>
            <span v-if="item.type === 1" style="font-size: 14px">请假 </span>
            <span v-else-if="item.type === 2" style="font-size: 14px">出差 </span>
            <span v-else-if="item.type === 3" style="font-size: 14px">加班 </span>
            <span v-else-if="item.type === 4" style="font-size: 14px">换班 </span>
            <span v-else-if="item.type === 5" style="font-size: 14px">补卡</span>
            <span v-show="item.type != 5">{{item.start_time}}至{{item.end_time}}</span>
            <!--v-show="acticecontent.type != 5"-->
            <span v-show="item.type == 5">{{item.check_time}}  {{item.bc}}</span>
            <p style="margin: 0;font-size: 14px">{{item.addtime}}</p>
          </div>
          <div class="title_right">
            <span class="icon_color_s" v-if="item.status==1">审批中</span>
            <span class="icon_color_j" v-if="item.status==2">已拒绝</span>
            <span class="icon_color_t" v-if="item.status==3">已通过</span>
            <span class="icon_color_c" v-if="item.status==4">已撤销</span>
          </div>
        </li>
      </ul>
    </a-layout-sider>
    <a-layout style="background: #fff">
      <a-spin :spinning="isShow">
       <a-layout-content class="siderconten letBorder">
        <div class="conten_approval" v-show="!isShow">
          <div class="header-title">
            <div class="title_left">
              <Avatar v-if="acticecontent.apply_name"
                      :username="acticecontent.apply_name"
                      :src="acticecontent.photo"
                      color="#fff"
                      style=" vertical-align: middle;margin: 20px auto;"
                      :inline="true"></Avatar>
              <div style="display: inline-grid;vertical-align: bottom; margin-left: 10px;">
                <h3>{{acticecontent.apply_name}}</h3>
                <p>{{acticecontent.company_name}}</p>
              </div>
            </div>
            <div class="title_right">
              <span class="icon_color_s" v-if="acticecontent.status==1">审批中</span>
              <span class="icon_color_j" v-if="acticecontent.status==2">已拒绝</span>
              <span class="icon_color_t" v-if="acticecontent.status==3">已通过</span>
              <span class="icon_color_c" v-if="acticecontent.status==4">已撤销</span>
            </div>
          </div>
          <div class="conten">
            <div>
              <label>申请编号</label>
              <p>{{acticecontent.apply_number}}</p>
            </div>
            <!--请假-->
            <div v-if="acticecontent.type ==1">
              <label>请假类型</label>
              <p>
                <span>{{acticecontent.holiday_type}}</span>
              </p>
            </div>
            <div v-if="acticecontent.type !=5&&acticecontent.type!=4">
              <div>
                <label>开始时间</label>
                <p>{{acticecontent.start_time}}</p>
              </div>
              <div>
                <label> 结束时间 </label>
                <p>{{acticecontent.end_time}}</p>
              </div>
            </div>
            <div v-if="acticecontent.type ==1">
              <div>
                <label>请假时长</label>
                <p>{{acticecontent.apply_length}}{{acticecontent.unit==1?'小时':'天'}}</p>
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
                    <img :src="item" alt="" width="80" height="80" style="margin-right: 10px" v-for="(item,index) in acticecontent.apply_image" :key="'qj'+index">
                  </div>
              </div>
            </div>
            <div v-if="acticecontent.type ==2">
              <div>
                <label> 出发城市</label>
                <p>{{acticecontent.travel_info[0].origin}}</p>
              </div>
              <div>
                <label>目的城市</label>
                <p>{{acticecontent.travel_info[0].destination}}</p>
              </div>
              <div>
                <label>出差时长</label>
                <p>{{acticecontent.travel_info[0].days}}{{acticecontent.unit==1?'小时':'天'}}</p>
              </div>
              <div>
                <label>出差原因</label>
                <p>{{acticecontent.travel_info[0].apply_msg}}</p>
              </div>
            </div>
            <div v-if="acticecontent.type ==3">
              <label>加班原因</label>
              <p>{{acticecontent.apply_msg}}</p>
            </div>
            <div v-if="acticecontent.type ==4">
              <div>
                <label>替班人</label>
                <p>{{acticecontent.replace_username}}</p>
              </div>
              <div>
                <label>换班时间</label>
                <p>{{acticecontent.shift_date}}</p>
              </div>
              <div>
                <label>还班时间</label>
                <p>{{acticecontent.repay_shift_date}}</p>
              </div>
              <div>
                <label>换班原因</label>
                <p>{{acticecontent.apply_msg}}</p>
              </div>
            </div>
            <div v-if="acticecontent.type ==5">
              <div>
                <label>补卡时间</label>
                <p>{{acticecontent.check_time}}</p>
              </div>
              <div>
                <label>补卡班次</label>
                <p>{{acticecontent.bc}}</p>
              </div>
              <div>
                <label>补卡原因</label>
                <p>{{acticecontent.apply_msg}}</p>
              </div>
              <div>
                <label>补卡图片</label>
                <div class="maximg">
                  <viewer :images="acticecontent.apply_image">
                    <!--//photo 一定要一个数组，否则报错-->
                    <img
                      width="80" height="80"
                      v-for="(src,index) in acticecontent.apply_image"
                      :src="src"
                      :key="index"
                      :onerror="errorImg"
                    >
                  </viewer>
                  <!--<img :src="item" alt="" width="80" height="80" style="margin-right: 10px" v-for="(item,index) in acticecontent.apply_image" :key="'22'+index">-->
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="footer_liuc" :class="acticecontent.is_apply==1? 'isbtn': ''">
              <span style="z-index: 3"> 审批进程</span>
              <a-timeline style="margin-top: 25px;">
                <a-timeline-item style="height: 100px;">
                  <Avatar
                    v-if="acticecontent.apply_name"
                          slot="dot"
                          :username="acticecontent.apply_name"
                          :src="acticecontent.photo"
                          color="#fff"
                          style=" vertical-align: middle;"
                          :inline="true"></Avatar>
                  <div class="process_con">
                    <span  class="size18"> {{acticecontent.apply_member_info.username}}</span><br/>
                      <img src="../../../assets/adopt.png" alt="" style="margin-left: -30px;">
                      <span style="color:#04CB12;margin-left: 10px;" >发起审批</span>
                    <span style="float: right;margin-right: 50px;">{{acticecontent.addtime}}</span>
                  </div>
                </a-timeline-item>
                <a-timeline-item style="height: 100px;" v-for="(item, index) in acticecontent.review_member_info" :key="index">
                  <Avatar
                    slot="dot"
                    :username="item.username"
                    :src="item.photo"
                    color="#fff"
                    style=" vertical-align: middle;"
                    :inline="true"></Avatar>
                  <div class="process_con">
                    <span class="size18">{{item.username}}</span><br/>
                    <img :src="icornArr[item.review_status-1]" alt="" style="margin-left: -30px;">
                    <span style="margin-left: 10px;"
                          :class="{'tActive':item.review_status==4,
                           'jActive':item.review_status==3,
                           'dActive':item.review_status==1||item.review_status==2}">
                      {{itemArr[item.review_status-1]}}
                    </span>
                    <span style="float: right;margin-right: 50px;">{{item.review_time}}</span>
                  </div>
                </a-timeline-item>
                <a-timeline-item style="height: 100px;" v-if="acticecontent.send_member_info&&acticecontent.send_member_info.length>0">
                  <!--{{?acticecontent.send_member_info.length:'ss'}}-->
                  <IconFont type="iconshenhe_gaizhang" slot="dot"  class="ICON_style" ></IconFont>
                  <div  class="process_con">
                    <div class="size18">抄送</div>
                    <span class="chaosong" v-for="(ss,index) in acticecontent.send_member_info" :key="'ss'+index">
                           <Avatar
                             :username="ss.username"
                             :src="ss.photo"
                             color="#fff"
                             :size="20"
                             style=" vertical-align: middle;"
                             :inline="true"></Avatar>
                      {{ss.username}}</span>
                    <span style="float: right;margin-right: 50px;">{{acticecontent.send_member_info[0].send_time}}</span>
                  </div>
                </a-timeline-item>
              </a-timeline>
            </div>
            <div class="footer_btn" v-if="acticecontent.is_cancel ==1 ||acticecontent.is_apply ==1">
              <div style="float: left" v-if="acticecontent.is_cancel==1">
                <a-button type="link" @click="Cancel(acticecontent.apply_id)">
                 撤销
                </a-button>
                <!--<a-button type="link" @click="Transfer(acticecontent)">-->
                  <!--转交-->
                <!--</a-button>-->
              </div>
              <div style="float: right" v-if="acticecontent.is_apply==1">
                <a-button style="margin-right: 15px" class="ant-btn_Def" @click="isModal(acticecontent,0)">拒绝</a-button>
                <a-button type="primary" style="margin-right: 15px" @click="isModal(acticecontent,1)">同意</a-button>
              </div>
            </div>
          </div>
        </div >
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
import { IconFont } from '../../../Mixins/Icon'

export default {
  components: { Avatar, IconFont },
  props: {
    waitlist: {
      type: Array
      // default: () => ([])
    }
  },
  name: 'approval_list',
  data () {
    return {
      itemArr: ['待审核', '审核中', '已拒绝', '已同意'],
      icornArr: [require('../../../assets/examine.png'), require('../../../assets/examine.png'), require('../../../assets/refuse.png'), require('../../../assets/adopt.png')],
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
    // console.log(this.waitlist)
    // setTimeout(() => {
    //   this.getcontent(this.waitlist[0].id)
    // }, 100)
  },
  watch: {
    waitlist (val) {
      console.log(val)
      if (val.length > 0) {
        this.getcontent(this.waitlist[0].id)
      }
    }
  },
  methods: {
    async getcontent (applyid) { // 获取审批内容
      const activeC = await getapplyDetail({ apply_id: applyid })
      if (activeC.code === 0) {
        this.acticecontent = activeC.data
      } else {
        this.$message.error(activeC.msg)
      }
      this.isShow = false
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
        this.$emit('update', 0)
      } else {
        this.$message.error(Acancel.msg)
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
        this.Title = '确定同意' + this.acticecontent.apply_name + '申请吗'
      } else {
        this.Title = '确定拒绝' + this.acticecontent.apply_name + '申请吗'
      }
      this.visible = true
      this.status = type
    },
    async  handleOk (data, type) {
      const MoldData = await applyReview({ apply_id: data.apply_id, type: data.type, review_status: type, msg: this.opinion })
      if (MoldData.code === 0) {
        this.$message.success(MoldData.msg)
        this.$emit('update')
      } else {
        this.$message.error(MoldData.msg)
      }
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    },
    errorImg (msg) {
      console.log(msg)
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
  border: 1px solid #DDDFE2;
}
.Trial_list{
  list-style: none;
  padding: 0;
}
.Trial_list > li{
  border-bottom: 1px solid #ccc;
  height: 110px;
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
    /*position: relative;*/
  }
  .header-title{
    border-bottom: 1px solid #DDDFE2;
    overflow: hidden;
    position: absolute;
    top: 1px;
    width: 100%;
    background: #fff;
    right: 1px;
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
  .icon_color_s, .icon_color_t, .icon_color_j, .icon_color_c{
    padding: 2px 6px;
    border-radius: 5px;
  }
  .icon_color_s{
    background: #fff0d7;
    color: #F6A905;
  }
  .icon_color_t{
    background:rgb(215,245,217);
    color: #04CB12;
  }
  .icon_color_j{
    background: rgb(255,224,224);
    color: #FF2A2A;
  }
  .icon_color_c{
    background: #fff0d7;
    color: #F6A905;
  }
  .jActive{color:#FF2A2A }
  .tActive {color:#04CB12}
  .dActive{color:#F6A905;}
  .conten{
    margin-top: 100px;
    padding: 0 30px;
  }
  .conten label{
    /*font-size: 14px;*/
    color: #AAAAAA;
  }
  p,span,div{
    color: #333333;
  }
  .footer{
    margin-top: 20px;
    border-top: 1px solid #ccc;
    padding-top: 19px;
  }
  .footer_liuc{
    padding-left: 30px;
  }
  .isbtn {
    margin-bottom: 55px;
  }
  .footer_btn{
    overflow: hidden;
    position: absolute;
    bottom: 1px;
    right: 1px;
    background: #fff;
    width: 100%;
    height: 56px;
    line-height: 56px;
    border-top: 1px solid #DDDFE2;
  }
  .ICON_style{
    font-size: 24px;
    background:#2A5AFF;
    color: #fff;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    line-height: 55px

  }
  .chaosong{
    background: #ececec;
    border-radius: 15px;
    display: inline-block;
    padding:4px 11px;
    text-align: center;
    margin: 3px 4px;
    line-height: 12px;
  }
  .size18{
    font-size: 18px;
  }
  .process_con{
    margin-left: 20px;
    position: relative;
    top: -10px;
  }
  /*.maximg img:hover{*/
    /*transform:scale(2.2);*/
    /*cursor: pointer*/
  /*}*/
  .viewer-title{display: none}
</style>
