<template>
<div class="conten_approval">
  <div class="header-title">
    <div class="title_left">
      <Avatar v-if="acvitecontent.apply_name"
               :username="acvitecontent.apply_name"
               background-color="#0dd1f0"
               color="#fff"
               style=" vertical-align: middle;margin: 20px auto;"
               :inline="true"></Avatar>
      <div style="display: inline-grid;vertical-align: bottom; margin-left: 10px;">
        <h3>{{acvitecontent.apply_name}}</h3>
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
        <span v-if="acvitecontent.type ==1">请假</span>
        <span v-if="acvitecontent.type ==2">出差</span>
        <span v-if="acvitecontent.type ==3">加班</span>
        <span v-if="acvitecontent.type ==4">换班</span>
        <span v-if="acvitecontent.type ==5">补卡</span>
      </p>
    </div>
    <div>
      <label>开始时间</label>
      <p>{{acvitecontent.start_time}}</p>
    </div>
    <div>
      <label> 结束时间 </label>
      <p>{{acvitecontent.end_time}}</p>
    </div>
    <div>
      <label>请假时长</label>
      <p>{{acvitecontent.days}}</p>
    </div>
    <div>
      <label>请假事由</label>
      <p>
        {{acvitecontent.apply_msg}}
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
    审批进程
  </div>
</div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  components: { Avatar },
  props: {
    acvitecontent: {
      type: Object
    }
  },
  name: 'approval_conten',
  data () {
    return {
      contens: this.acvitecontent
    }
  },
  created () {

  },
  methods: {
    CONTENT (data) {
      this.contens = data
      console.log(data)
    }
  }
}
</script>

<style scoped>
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
