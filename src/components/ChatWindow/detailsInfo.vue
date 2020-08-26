<template>
  <a-drawer
    placement="right"
    :width="450"
    :closable="false"
    :drawerStyle="{ background: '#DDDFE2',position:'relative' }"
    :headerStyle="{position:'fixed',width:'450px',background:'#fff',zIndex:'22'}"
    :bodyStyle="{padding:'0'}"
    :visible="detailVisible"
    :after-visible-change="afterVisibleChange"
    @close="close"
  >
    <div slot="title" style="font-size: 22px;text-align: center;">详细</div>
    <div
      class="drawer_content siderconten"
      ref="searchBar"
      @scroll="handleScroll()">
      <div class="title">
        <div class="drawer_title">
          <div style="overflow: hidden;">
            <Avatar  :username="detailsMsg.apply_name"
                     :src="detailsMsg.photo"
                     color="#fff"
                     style=" vertical-align: middle;margin: 30px auto;float:left;"
                     :inline="true">
            </Avatar>
            <div class="title_name">
              <h2 style="margin-bottom: 0;" v-if="detailsMsg.type==1">{{detailsMsg.holiday_type}}</h2>
              <h2 style="margin-bottom: 0;" v-if="detailsMsg.type==2">出差</h2>
              <h2 style="margin-bottom: 0;" v-if="detailsMsg.type==3">加班</h2>
              <h2 style="margin-bottom: 0;" v-if="detailsMsg.type==4">换班</h2>
              <h2 style="margin-bottom: 0;" v-if="detailsMsg.type==5">补卡</h2>
              <h3>{{detailsMsg.username}}</h3>
            </div>
            <span class="icon_color_s state" v-if="detailsMsg.status==1">审批中</span>
            <span class="icon_color_j state" v-if="detailsMsg.status==2">已拒绝</span>
            <span class="icon_color_t state" v-if="detailsMsg.status==3">已通过</span>
            <span class="icon_color_c state" v-if="detailsMsg.status==4">已撤销</span>
          </div>
        </div>
        <a-anchor  :class="{'anchorFiexd':isAnchor}">
          <a-anchor-link href="#type1"  class="miao" style="margin-left: -10px;" >
          <span slot="title">
            <a-icon type="pic-left" style="margin-right: 8px"></a-icon>
            申请详细
          </span>
          </a-anchor-link>
          <a-anchor-link href="#type2"  class="miao" style="margin-left: 10px">
          <span slot="title">
            <a-icon type="pic-left" style="margin-right: 8px"></a-icon>
            审批流程
          </span>
          </a-anchor-link>
        </a-anchor>
      </div>
      <div  id='content' style="">
        <div class="dd" id="type1">
          <div class="conten">
            <div class="xqType">
              <label>申请编号</label>
              <p>{{detailsMsg.apply_number}}</p>
            </div>
            <div v-if="detailsMsg.type ==1"  class="xqType">
              <label>请假类型</label>
              <p>
                <span>{{detailsMsg.holiday_type}}</span>
              </p>
            </div>
            <div v-if="detailsMsg.type !=5 && detailsMsg.type!=4">
              <div class="xqType">
                <label>开始时间</label>
                <p>{{detailsMsg.start_time}}</p>
              </div>
              <div class="xqType">
                <label> 结束时间 </label>
                <p>{{detailsMsg.end_time}}</p>
              </div>
            </div>
            <div v-if="detailsMsg.type ==1">
              <div class="xqType" v-if="detailsMsg.days">
                <label>请假时长</label>
                <p>{{detailsMsg.days}}</p>
              </div>
              <div class="xqType" v-if="detailsMsg.apply_msg">
                <label>请假事由</label>
                <p>
                  {{detailsMsg.apply_msg}}
                </p>
              </div>
              <div class="xqType" v-if="detailsMsg.apply_image.length>0">
                <label>图片</label>
                <div>
                  <viewer :images="detailsMsg.apply_image">
                 <!--//photo 一定要一个数组，否则报错-->
                 <img
                   width="80" height="80"
                   style="margin-right: 5px"
                   v-for="(src,index) in detailsMsg.apply_image"
                   :src="src"
                   :key="index"
                 >
               </viewer>
                </div>
              </div>
            </div>
            <div v-if="detailsMsg.type ==2">
              <div class="xqType">
                <label> 出发城市</label>
                <p>{{detailsMsg.travel_info[0].origin}}</p>
              </div>
              <div class="xqType">
                <label>目的城市</label>
                <p>{{detailsMsg.travel_info[0].destination}}</p>
              </div>
              <div class="xqType">
                <label>出差时长</label>
                <p>{{detailsMsg.travel_info[0].days}}{{detailsMsg.unit==1?'小时':'天'}}</p>
              </div>
              <div class="xqType">
                <label>出差原因</label>
                <p>{{detailsMsg.travel_info[0].apply_msg}}</p>
              </div>
            </div>
            <div v-if="detailsMsg.type ==3" class="xqType">
              <label>加班原因</label>
              <p>{{detailsMsg.apply_msg}}</p>
            </div>
            <div v-if="detailsMsg.type ==4">
              <div class="xqType">
                <label>替班人</label>
                <p>{{detailsMsg.replace_username}}</p>
              </div>
              <div class="xqType">
                <label>换班时间</label>
                <p>{{detailsMsg.shift_date}}</p>
              </div>
              <div class="xqType">
                <label>还班时间</label>
                <p>{{detailsMsg.repay_shift_date}}</p>
              </div>
              <div class="xqType">
                <label>换班原因</label>
                <p>{{detailsMsg.apply_msg}}</p>
              </div>
            </div>
            <div v-if="detailsMsg.type ==5">
              <div class="xqType">
                <label>补卡时间</label>
                <p>{{detailsMsg.check_time}}</p>
              </div>
              <div class="xqType">
                <label>补卡班次</label>
                <p>{{detailsMsg.bc}}</p>
              </div>
              <div class="xqType">
                <label>补卡原因</label>
                <p>{{detailsMsg.apply_msg}}</p>
              </div>
              <div class="xqType">
                <label>补卡图片</label>
                <div>
                  <viewer :images="detailsMsg.apply_image">
                    <!--//photo 一定要一个数组，否则报错-->
                    <img
                      width="80" height="80"
                      style="margin-right: 5px"
                      v-for="(src,index) in detailsMsg.apply_image"
                      :src="src"
                      :key="index"
                    >
                  </viewer>
                </div>
              </div>
            </div>
          </div>
          <img src="../../assets/Refuse_state.png" alt=""  v-if="detailsMsg.status==2" class="state_img">
          <img src="../../assets/adopt_state.png" alt="" v-if="detailsMsg.status==3" class="state_img">
        </div>
        <div id="type2">
          <div class="footer">
          <div class="footer_liuc" :class="detailsMsg.is_apply==1?'zenheight':''">
            <a-timeline style="margin-top: 25px;">
              <a-timeline-item style="height: 100px;">
                <Avatar
                  v-if="detailsMsg.apply_name"
                  slot="dot"
                  :username="detailsMsg.apply_name"
                  :src="detailsMsg.photo"
                  color="#fff"
                  style=" vertical-align: middle;"
                  :inline="true"></Avatar>
                <div class="process_con">
                  <span  class="size18"> {{detailsMsg.apply_member_info.username}}</span><br/>
                  <img src="../../assets/adopt.png" alt="" style="margin-left: -30px;">
                  <span style="color:#04CB12;margin-left: 10px;" >发起审批</span>
                  <span  class="size16">{{detailsMsg.addtime}}</span>
                </div>
              </a-timeline-item>
              <a-timeline-item style="height: 100px;" v-for="(item,index) in detailsMsg.review_member_info" :key="index">
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
                <span
                  style="margin-left: 10px;"
                  :class="{'tActive':item.review_status==4,
                  'jActive':item.review_status==3,
                   'dActive':item.review_status==1||item.review_status==2}">
                  {{itemArr[item.review_status-1]}}
                </span>
                <span  class="size16">{{item.review_time}}</span>
                </div>
              </a-timeline-item>
              <a-timeline-item style="height: 50px;" v-if="detailsMsg.send_member_info&&detailsMsg.send_member_info.length>0">
                <IconFont type="iconshenhe_gaizhang" slot="dot" class="ICON_style" ></IconFont>
                <div  class="process_con">
                  <div class="size18">抄送</div>
                  <span class="chaosong" v-for="ss in detailsMsg.send_member_info" :key="ss.username">
                           <Avatar
                             :username="ss.username"
                             :src="ss.photo"
                             color="#fff"
                             :size="20"
                             style=" vertical-align: middle;"
                             :inline="true"></Avatar>
                      {{ss.username}}</span>
                  <span  class="size16">{{detailsMsg.send_member_info[0].send_time}}</span>
                </div>
              </a-timeline-item>
            </a-timeline>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div class="footer_btn" v-if="detailsMsg.is_apply==1">
      <div>
        <a-button style="margin-right: 15px;width: 100px;" class="ant-btn_Def" @click="Submit(0)">拒绝</a-button>
        <a-button type="primary" style="margin-right: 15px;width: 100px;" @click="Submit(1)">同意</a-button>
      </div>
    </div>
  </a-drawer>
</template>
<script>
import Avatar from 'vue-avatar'
import { IconFont } from '../../Mixins/Icon'
export default {
  name: 'detailsInfo',
  components: { Avatar, IconFont },
  props: ['detailsMsg', 'detailVisible', 'AIndex'],
  data () {
    return {
      visible: false,
      isAnchor: false,
      itemArr: ['待审核', '审核中', '拒绝', '通过'],
      icornArr: [require('../../assets/examine.png'), require('../../assets/examine.png'), require('../../assets/refuse.png'), require('../../assets/adopt.png')],
      icon: require('../../assets/examine.png')
    }
  },
  watch: {
    detailVisible (old, ols) {
      if (old) {
        setTimeout(() => {
          this.$refs.searchBar.onscroll = () => {
            this.handleScroll()
          }
        }, 200)
      }
    }
  },
  methods: {
    afterVisibleChange (val) {
      // console.log('visible', val)
    },
    showDrawer () {
      this.visible = true
    },
    close () {
      this.$emit('onClose')
    },
    handleScroll () {
      let box = this.$refs.searchBar
      let scrollTop = box.offsetTop || box.scrollTop
      if (scrollTop > 80) {
        this.isAnchor = true
      } else {
        this.isAnchor = false
      }
    },
    Submit (type) {
      this.$emit('Submit', type, this.detailsMsg, this.AIndex, 0)
    }
  }
}
</script>

<style scoped>
  .drawer_title{
    background: #fff;
    padding: 0 24px;
    margin-top: 55px;
  }
  .drawer_content{
    position: absolute;
    height: 100%;
    width: 450px;
    overflow: auto
  }
  .title_name{
    float: left;
    margin:30px 16px 10px;
  }
  .state{
    float: right;
    margin-top: 50px;
  }

  .miao{
    display: inline-block;
    width:50%;
    font-size: 18px;
    text-align: center;
    height: 5px;
    line-height: 50px;
    /*margin-left: 20px;*/
  }
#type1,#type2{
  background: #fff;
  position: relative;
}
.anchorFiexd{
  position: fixed;
  width: 446px;
  /*height: 50px;*/
  line-height: 50;
  right: 0;
  top: 55px;
  box-shadow: 5px 2px 6px 1px #d7d7d7;
  z-index: 33;
}
  #content{
    padding: 16px 23px;
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
    padding: 32px 24px;
  }
  .xqType{
    overflow: hidden;
    margin-bottom: 10px;
  }
  .conten label{
    /*font-size: 14px;*/
    color: #AAAAAA;
    float: left;
    font-size: 18px;
    width: 72px;
    text-align: right;
  }
  .conten p{
    float: left;
    margin-left: 16px;
    margin-bottom:0;
    font-size: 18px
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
    padding-left: 21px;
    margin-left: 24px;
  }
  .zenheight{margin-bottom: 60px;}
  .footer_btn{
    overflow: hidden;
    position: absolute;
    bottom: 0;
    right: 1px;
    background: #fff;
    width: 100%;
    height: 56px;
    text-align: right;
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
    padding: 4px 11px;
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
  .size16{
    font-size: 16px;
    float: right;
    margin-right: 50px;
    color: #BFC1C4;
  }
  .size18{font-size: 18px;}
  .ant-timeline-item-last{height: auto!important;}
  .state_img{
    position: absolute;
    top: 24px;
    right: 0;
    z-index: 0;
  }
  .xqType p{width: 250px;}
</style>
