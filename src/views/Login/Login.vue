<template>
<div class="login">
  <div >
    <a-layout class="login_content">
      <a-layout-sider width="620" class="left_lun">
        <a-carousel class="carousel_content" dots-class="slick-dots slick-thumb">
          <!--autoplay-->
          <div style="text-align: center">
            <div class="carousel_title">
              <h1>大标题</h1>
              <h2>你是计算机技术</h2>
            </div>
            <div>
              <img src="../../assets/carousel1.png" alt="">
            </div>
          </div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
        </a-carousel>
      </a-layout-sider>
      <a-layout-sider width="580" class="right_login">
        <div v-show="isnext">
          <div class="login_title">
            <h1>欢迎使用企事云</h1>
            <p>文本一些我呢不能点击打开即可欢迎光临企事云双卡手机款式钉钉钉钉</p>
          </div>
          <div class="login_info">
            <div>
              <a-input placeholder="Basic usage"  size="large">
                <a-select default-value="lucy" style="width: 80px;" slot="prefix"  >
                  <a-icon slot="suffixIcon" type="caret-up" />
                  <a-select-option value="jack">
                    Jack
                  </a-select-option>
                </a-select>
              </a-input>
            </div>
            <div>
              <a-button type="primary" style="width: 100%;margin-top: 16px;" size="large" @click="next">下一步</a-button>
            </div>
            <div style="margin-top: 24px;color: #AAA;">
              <a-checkbox :checked="false"></a-checkbox>
              我已阅读同意
              <a href="#">企事云协议</a>
              和
              <a href="#">隐私策略</a>
            </div>
          </div>
          <div class="footer">
            <a-button style="width: 100%;border-radius: 25px;position: relative;top: 218px;"  size="large" :disabled="isDisable">加入团队</a-button>
          </div>
        </div>
        <div v-show="!isnext">
          <div class="login_Code login_title">
            <div class="icon_back">
              <a-icon type="left" style="font-size: 16px;"></a-icon>
              <span style="font-size: 16px;color: #777">返回</span>
            </div>
            <h1>验证手机号码</h1>
            <p>文本一些我呢不能点击打开即可欢迎光临企事云双卡手机款式钉钉钉钉</p>
          </div>
          <VerificationCode></VerificationCode>
          <a-button @click="isnext =!isnext ">登陆</a-button>
        </div>
      </a-layout-sider>
    </a-layout>
  </div>
</div>
</template>

<script>
import VerificationCode from '../../components/Verification/VerificationCode'
export default {
  name: 'Login',
  components: { VerificationCode },
  data () {
    return {
      isDisable: true,
      isnext: true
    }
  },
  methods: {
    next () {
      this.isnext = false
    }
  }
}
</script>

<style scoped>
  .login{
    display: grid;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    position: absolute;
    width: 100%;
    height: 100%;
  }
.login_content{
  height: 760px;
  margin: auto;
  background: #fff;
  width: 1202px;
  border: 1px solid #ccc;

}
  .left_lun,.right_login{
    background: #fff;
  }
  .right_login{
    padding: 0 64px;
    text-align: left;
  }
.left_lun{
  border-right: 1px solid #ccc;
}
  .ant-carousel >>> .slick-slide {
    text-align: center;
    height: 759px;
    /*line-height: 160px;*/
    background: #2A5AFF;
    overflow: hidden;
  }

  .ant-carousel >>> .slick-slide h3 {
    color: #fff;
  }
  .ant-carousel .slick-slide img{
    margin: auto
  }
  .ant-carousel >>> .slick-thumb {
    bottom: 80px;
  }
  .ant-carousel >>> .slick-thumb li{
    margin: auto 12px;
  }
  .ant-carousel >>> .slick-thumb li button{
    width: 40px;
    height: 8px;
  }
  .carousel_title h1 {
    font-size: 36px;
    font-weight: bold;
    margin-top: 106px;
    height: 35px;
    line-height: 35px;
    margin-bottom: 25px;
    color: #fff;
  }
  .carousel_title h2{
    font-size: 22px;
    margin-bottom: 72px;
    height: 25px;
    line-height: 25px;
    color: #fff;
  }
  .login_title{
    margin-top: 112px;
  }
  .login_title h1 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
    height: 35px;
    line-height: 35px;
  }
  .login_title p {
    font-size: 16px;
    color: #777;
  }
 .ant-input-affix-wrapper-lg >>> .ant-input-prefix{left: 1px}
  .ant-select-enabled >>> .ant-select-selection {border: none;}
  .ant-select-enabled >>> .ant-select-selection__rendered  .ant-select-selection-selected-value{line-height: 30px}
  .ant-input-affix-wrapper >>> .ant-input:not(:first-child) {padding-left: 80px;}
  .ant-select-focused >>>.ant-select-selection,
  .ant-select-enabled >>> .ant-select-selection:focus,
  .ant-select-enabled >>>.ant-select-selection:active,
  .ant-select-open >>>.ant-select-selection
  {box-shadow: none}
  .icon_back{
    position: absolute;
    top: 74px;
    cursor: pointer;
    padding-right: 2px;
  }
  .icon_back:hover {background: #DDDFE2;border-radius: 2px;}
</style>
