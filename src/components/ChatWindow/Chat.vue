<template>
<div>
  <div class="card">
    <div class="card_cion">
      <img :src="info.app_icon" >
      <p class="Qsp" v-if="info.apply_state=='请审批'">{{info.apply_state}}</p>
      <p class="CS" v-if="info.apply_state=='抄送你'">{{info.apply_state}}</p>
    </div>
    <div class="card_info" v-if="info.msg_type1=='action_card'" @click="YDetail">
      <div :class="info.apply_state=='请审批'? 'spTitle':'csTitle'" class="title">
        <p>{{info.content.part1}}</p>
      </div>
      <div class="info1" :class="info.apply_state=='请审批'? 'spinfo1':'csinfo1'" >
        <ul>
          <li>
            <h3>{{info.content.part2.apply_user}}</h3>
            <h1>{{info.content.part2.apply_user_value}}</h1>
          </li>
          <li style="margin: auto 7px;">
            <h3>{{info.content.part2.slave_depart}}</h3>
            <h1>{{info.content.part2.slave_depart_value}}</h1>
          </li>
          <li>
            <h3>{{info.content.part2.apply_type}}</h3>
            <h1>{{info.content.part2.apply_type_value}}</h1>
          </li>
        </ul>
      </div>
      <div class="info2">
        <h1>{{info.content.part3}}</h1>
        <div class="info2_label">
          <label>{{info.content.part4.start_time}}：</label>
          <span>{{info.content.part4.start_time_value}}</span>
        </div>
        <div class="info2_label">
          <label>{{info.content.part4.end_time}}：</label>
          <span>{{info.content.part4.end_time_value}}</span>
        </div>
        <div class="info2_label">
          <label>{{info.content.part4.apply_msg}}：</label>
          <span class="YY">{{info.content.part4.apply_msg_value}}</span>
        </div>
        <div class="info2_label">
          <a-button type="link" class="xiaoqing">{{info.content.part5}}</a-button>
        </div>
      </div>
      <div class="btn">
        <div class="btn_type1"  v-if="typeof info.content.part6 == 'object'">
          <a-button-group style="width: 100%;">
            <a-button class="refuse" @click.stop="Submit(0)"> 拒绝</a-button>
            <a-button class="agree"  @click.stop="Submit(1)"> 同意</a-button>
          </a-button-group>
        </div>
        <div class="btn_type2" v-if="typeof info.content.part6 == 'string'">
          <a-button>{{info.content.part6}}</a-button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Chat',
  props: ['info', 'active'],
  methods: {
    YDetail () { // 点击触发父组件方法获取审批详情
      this.$emit('isShow', this.info)
    },
    Submit (type) { // 提交审批
      this.$emit('Submit', type, this.info, this.active, 1)
    }
  }
}
</script>

<style scoped>
.card{
  margin-left: 24px;
  margin-top: 31px;
  margin-bottom: 30px;
  /*overflow: hidden;*/
  height: 390px;
}
.card_cion{
  float: left;
  width:50px ;
}
.card_cion img{
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
.Qsp,.CS{
  padding: 2px 7px;
  font-size: 14px;
  border-radius: 4px;
  margin-top: 8px;
  margin-left: -6px;
}
.Qsp{
  color: #F67605;
  background: rgba(246,118,5,0.2);
}
.CS{
  color:#2A5AFF;
  background:rgba(42,90,255,0.2);
}
.title{
  font-size: 18px;
  font-weight: bold;
  height: 48px;
  line-height: 48px;
  padding-left: 16px;
  border-bottom: #DDDFE2 1px solid;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.spTitle{
  background: #F6A905;
  color: #553A00;
}
.csTitle{
  background: #EFEFF0;
}
.card_info{
    float: left;
    width: 400px;
    height: 390px;
    border: 1px solid #DDDFE2;
    border-radius: 8px;
    margin-left: 16px;
    z-index: 22;
  position: relative;
  }
.info1 >ul{
  padding: 14px 16px;
  overflow: hidden;
  margin: 0;
}
.info1 li{
    list-style: none;
    float: left;
    width: 117px;
    height: 67px;
    border-radius: 8px;
    text-align: center;
    padding: 12px 0 10px;
  }
.info1 h1,.info2 h1{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0;
    height: 20px;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
.info1 h3{
  margin-bottom: 3px;
  font-size: 16px;
  color: #777;
}
.spinfo1 li{
  background: rgb(254,246,230);
  border: 1px solid #F6A905;
}
.csinfo1 li{
  background: #EFEFF0;
}
.info2{
  margin-left: 33px;
}
.info2_label{
  margin: 7px auto;
}
.info2 label{
    font-size: 18px;
  }
.info2_label span{
    font-size: 18px;
  }
.info2_label .YY{
  display: inline-block;
  width: 266px;
  vertical-align: top;
  line-height: 23px;
}
.info2_label .xiaoqing{
    font-size: 18px;
    padding: 0;
  margin-bottom: 7px;
  }
.btn{
  width: 100%;
  position: absolute;
  bottom: 1px;
}
  .btn_type2,.btn_type1{
    border-top: 1px solid #DDDFE2;
    position: relative;
    bottom: -1px;
  }
  .btn_type1 button{
    border: none;
    font-size: 18px;
    width: 50%;
    height: 49px;
    z-index: 99999;
  }
  .agree{
    background: #EEEFF0;
    color: #2A5AFF;
    border-bottom-right-radius: 8px!important;
    margin-left: 0!important;
  }
  .refuse{
    color: #333;
    border-bottom-left-radius: 8px!important;
  }
  .btn_type2 button {
    width: 100%;
    height: 49px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
  }

</style>
