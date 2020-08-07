<template>
 <div>
  <div style="background: #fff;height: 80px;border-bottom: 1px solid #ddd;padding: 20px;    width: 100%;
    overflow: hidden;
    min-width: 730px;">
    <div class="apply_header_left">
      <a-input style="width: 300px;" v-model="userName" placeholder="搜索"  suffix="（Ctrl+K)">
        <a-icon slot="prefix" type="search" />
      </a-input>
    </div>
    <div class="apply_header_right">
      <ul class="header_right">
        <li>
          <a-icon type="appstore"></a-icon>
          获取应用
        </li>
        <li>
          <a-icon type="cluster"></a-icon>
          创建应用
        </li>
        <li>
          <a href="http://test.oa.officelinking.com/" target="_blank">
            <a-icon type="setting"></a-icon>
            设置
          </a>
        </li>
      </ul>
    </div>
  </div>
   <div class="apply-conten">
     <div >
       <!--<h2 class="apply-title">已安装应用</h2>-->
       <applyList :applist="Yinstall" :isadd="true"></applyList>
     </div>
     <div>
       <h2 class="apply-title">全部应用</h2>
       <applyList :applist="Ninstall" :isadd="false" style="padding-top: 36px;"></applyList>
     </div>
   </div>
 </div>
</template>

<script>
import { getInstallList, getAllList } from '../../../api/workbench'
import applyList from './components/applyList'
export default {
  name: 'index',
  components: { applyList },
  data () {
    return {
      Yinstall: [],
      Ninstall: [],
      userName: ''
    }
  },
  created () {
    this.getApplyList()
    this.getAllList()
  },
  methods: {
    async getApplyList () { // 已安装应用列表
      const data = await getInstallList()
      if (data.code === 0) {
        this.Yinstall = data.data
      }
    },
    async getAllList () { // 获取全部应用列表
      const alldata = await getAllList()
      if (alldata.code === 0) {
        this.Ninstall = alldata.data
      }
    }
  }
}
</script>

<style scoped>
  .apply-conten{
    /*max-width: 1440px;*/
    margin: auto;padding: 0 38px;
    min-width: 600px;
  }
.apply-title{
  text-align: left;
  margin-bottom: 0;
  font-weight: bold;
}
.apply_header_right{
  /*line-height: 80px;*/
  float: right;
}
.header_right{
  list-style: none;
  overflow: hidden;
  margin-right: 80px;
  height: 40px;
  padding: 7px;
}
.apply_header_left{
  float: left;
  line-height: 40px;
}
.header_right>li{
  float: left;
  margin: auto 10px;
  padding: 4px;
}
.header_right>li:hover{
  cursor: pointer;
  background: #dfdfdf;
  border-radius: 5px;
}
.header_right>li a{
  color: #333;
}
</style>
