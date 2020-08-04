<template>
<div>
  <div class="card">
    <img :src="info.app_icon" class="card_cion" >
    <div class="card_info" v-if="info.msg_type1=='action_card'" @click="YDetail">
      <div class="title">
        <p>{{info.content.part1}}</p>
      </div>
      <div class="info1">
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
            <a-button style="color: #333;" @click.stop="Submit(0)"> 拒绝</a-button>
            <a-button style="background: #EEEFF0;color: #2A5AFF;" @click.stop="Submit(1)"> 同意</a-button>
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
import { applyReview } from '../../../api/approval'
export default {
  name: 'Chat',
  props: ['info'],
  methods: {
    YDetail () {
      this.$emit('isShow')
    },
    async Submit (type) {
      const resultSP = await applyReview({ apply_id: this.info.apply_id, type: this.info.apply_type, review_status: type })
      if (resultSP.code === 0) {
        this.$message.success(resultSP.msg)
      } else {
        this.$message.error(resultSP.msg)
      }
    }
  }
}
</script>

<style scoped>
.card{
  margin-left: 24px;
  margin-top: 31px;
  margin-bottom: 30px;
  overflow: hidden;
}
.card_cion{
  border-radius: 50%;
  width: 40px;
  height: 40px;
  float: left;
}
.title{
  font-size: 18px;
  font-weight: bold;
  height: 48px;
  background: #EFEFF0;
  line-height: 48px;
  padding-left: 16px;
  border-bottom: #DDDFE2 1px solid;
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
    background: #ddd;
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
  }
.info1 h3{
  margin-bottom: 3px;
  font-size: 16px;
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
    border-radius: 8px;
  }
  .btn_type2 button {
    width: 100%;
    height: 49px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
  }
</style>
