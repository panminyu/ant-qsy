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
            <a-form-model :model="Loginmobile"  ref="ruleForm" :rules="rules">
              <a-form-model-item prop="mobile">
              <a-input placeholder="请输入手机号"  size="large" v-model="Loginmobile.mobile" :maxLength="11">
                <a-select default-value="+86" style="width: 80px;" slot="prefix"  >
                  <a-icon slot="suffixIcon" type="caret-up" />
                  <a-select-option value="jack">
                    +86
                  </a-select-option>
                </a-select>
              </a-input>
              </a-form-model-item>
              <a-form-model-item>
                <!--<a-button  style="width: 100%;margin-top: 16px;" @click="isnext =!isnext" size="large">下一步</a-button>-->
                <a-button  :disabled="!isDisable" v-show="!isDisable" style="width: 100%;margin-top: 16px;" size="large">下一步</a-button>
                <a-button type="primary" style="width: 100%;margin-top: 16px;" size="large" @click="next"  v-show="isDisable">下一步</a-button>
              </a-form-model-item>
            </a-form-model>
            <a-form-model-item style="margin-top: 24px;color: #AAA;">
              <a-checkbox v-model="checked" @change="isNext"></a-checkbox>
              我已阅读同意
              <a href="http://qsy.officelinking.com/qishiyunxieyi.html">企事云协议</a>
              和
              <a href="http://qsy.officelinking.com/yinsicelue.html">隐私策略</a>
            </a-form-model-item>
          </div>
          <div class="footer">
            <a-button style="width: 100%;border-radius: 25px;position: relative;top: 218px;"  size="large" :disabled="isDisable">加入团队</a-button>
          </div>
        </div>
        <div v-show="!isnext" class="next_login">
          <div class="login_Code login_title">
            <div class="icon_back">
              <a-icon type="left" style="font-size: 16px;"></a-icon>
              <span style="font-size: 16px;color: #777" @click="isnext = true">返回</span>
            </div>
            <h1>验证手机号码</h1>
            <p>文本一些我呢不能点击打开即可欢迎光临企事云双卡手机款式钉钉钉钉</p>
          </div>
          <VerificationCode @onlastCode ="Login" :isShow="isnext" ref="mychild"></VerificationCode>
          <a-button type="link" @click="nextClick" style="font-size: 18px;padding-left: 0;padding-top: 16px;">重新获取验证码</a-button>
          <a-button
            :type="isLogin ?'primary':''"
            class="login_btn"
            @click="Login"
            :disabled="!isLogin"
            :loading="isLogin">登陆</a-button>
        </div>
      </a-layout-sider>
    </a-layout>
  </div>
</div>
</template>

<script>
import VerificationCode from '../../components/Verification/VerificationCode'
import { getVerify, loginByVerify, getUserInfo } from '../../../api/login'
import stote from '../../vuex/store'
import { setToken, setPower } from "../../util/auth";

export default {
  name: 'Login',
  components: { VerificationCode },
  data () {
    return {
      isDisable: false,
      isnext: true,
      isLogin: false,
      Loginmobile: { mobile: '', checked_protocol: 1 },
      checked: true,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { max: 11, min: 11, message: '请输入正确的手机格式', trigger: 'blur', pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/ }
        ]
      }
    }
  },
  watch: { // 监听手机号输入长度
    'Loginmobile.mobile' (newval, oldval) {
      if (newval.length === 11) {
        this.isDisable = true
      } else {
        this.isDisable = false
      }
    }
  },
  created () {
    let that = this
    document.onkeydown = (e) => {
      e = window.event || e
      if (that.$route.path === '/login' && (e.code === 'Enter' || e.code === 'NumpadEnter')) { // 验证在登录界面和按得键是回车键enter
        that.nextClick() // 登录函数
      }
    }
  },
  methods: {
    next () { // 验证手机号码 获取验证码
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.nextClick()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async nextClick () { // 获取验证码
      const Verify = await getVerify(this.Loginmobile)
      console.log(Verify)
      if (Verify.code === 0) {
        this.isnext = false
        this.$message.success('验证码已发送')
      } else {
        this.$message.error(Verify.msg)
      }
    },
    isNext (e) {
      if (e.target.checked) {
        this.Loginmobile.checked_protocol = 1
      } else {
        this.Loginmobile.checked_protocol = 0
      }
    },
    async Login (data) { // 验证码登陆
      let code = data.join('') //  获取输入的验证码
      this.isLogin = true
      const login = await loginByVerify({ mobile: this.Loginmobile.mobile, verify: code })
      if (login.code === 0) {
        this.$message.success('登陆成功')
        // console.log(login.token)
        // stote.dispatch('getToken', login.token) // 存入状态管理
        setToken(login.token)
        this.getuserInfo()
      } else {
        this.isLogin = false
        this.$refs.mychild.reset()
        this.$message.error(login.msg)
      }
    },
    async getuserInfo () { // 获取用户信息
      const userInfo = await getUserInfo({ token: stote.state.Token })
      if (userInfo.code === 0) {
        stote.dispatch('getUserInfo', userInfo.data)
        stote.dispatch('getcurrentUser', userInfo.data.companys[0])
        setPower(JSON.stringify(userInfo.data),
          JSON.stringify(userInfo.data.companys[0]),
          userInfo.data.companys[0].id)
        this.$router.push('/')
      } else {
        this.$message.error(userInfo.msg)
      }
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

  .login_btn{
    width: 100%;
    position: relative;
    top: 291px;
    height: 48px;
    font-size: 18px;
  }
</style>
