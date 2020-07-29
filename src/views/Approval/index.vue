<template>
    <section class="backcolor">
      <div style="background: #fff;height: 79px;border-bottom: 1px solid #ddd;padding: 20px;">
        <!--<div class="apply_header_left">-->
          <!--<a-input style="width: 300px;" v-model="userName" placeholder="搜索"  suffix="（Ctrl+K)">-->
            <!--<a-icon slot="prefix" type="search" />-->
          <!--</a-input>-->
        <!--</div>-->
        <div style="display: inline-block">
          <h2 style="font-weight: bold">审批</h2>
        </div>
        <div class="apply_header_right">
          <ul class="header_right">
            <li>
              <a href="http://test.oa.officelinking.com/" target="_blank">
                <a-icon type="setting"></a-icon>
                设置
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="aooroval_conten">
        <a-tabs @change="tabsapproval" :animated="false">
          <a-tab-pane key="1" :tab="waitcount>0?'待审批（'+waitcount+'）':'待审批'">
            <a-spin tip="Loading..." :spinning="spinning">
           <SearchSelect style="display: inline-block"></SearchSelect>
            <SearchInput  style="display: inline-block;margin-left: 20px;"></SearchInput>
            <div style="margin-top: 10px;">共{{waitcount}}条结果</div>
            <approvalList :waitlist="applyList"  v-if="applyList.length>0" @update="getWaitList"  ></approvalList>
            <a-empty v-show="applyList.length<=0" description="暂无数据" style="margin: 24% auto;" />
            </a-spin>
          </a-tab-pane>
          <a-tab-pane key="2" tab="已审批">
            <a-spin tip="Loading..." :spinning="spinning">
            <SearchSelect style="display: inline-block"></SearchSelect>
            <SearchInput  style="display: inline-block;margin-left: 20px;"></SearchInput>
            <div style="margin-top: 10px;">共{{count}}条结果</div>
            <approvalList :waitlist="applyList" v-if="applyList.length>0"></approvalList>
            <a-empty v-show="applyList.length<=0" description="暂无数据" style="margin: 24% auto;" />
            </a-spin>
          </a-tab-pane>
          <a-tab-pane key="3" tab="我发起">
            <a-spin tip="Loading..." :spinning="spinning">
            <SearchSelect style="display: inline-block"></SearchSelect>
            <SearchInput  style="display: inline-block;margin-left: 20px;"></SearchInput>
            <div style="margin-top: 10px;">共{{count}}条结果</div>
            <approvalList :waitlist="applyList"  v-if="applyList.length>0"></approvalList>
            <a-empty v-show="applyList.length<=0" description="暂无数据" style="margin: 24% auto;" />
            </a-spin>
          </a-tab-pane>
          <a-tab-pane key="4" tab="抄送我">
            <a-spin tip="Loading..." :spinning="spinning">
            <SearchSelect style="display: inline-block"></SearchSelect>
            <SearchSelect style="display: inline-block;margin-left: 20px;"></SearchSelect>
            <SearchInput  style="display: inline-block;margin-left: 20px;"></SearchInput>
            <div style="margin-top: 10px;">共{{count}}条结果</div>
            <approvalList :waitlist="applyList"  v-if="applyList.length>0"></approvalList>
            <a-empty v-show="applyList.length<=0" description="暂无数据" style="margin: 24% auto;" />
            </a-spin>
          </a-tab-pane>
          <a-tab-pane key="5" tab="发起申请">
            <a-spin tip="Loading..." :spinning="spinning">
            <a-input style="width: 300px;" v-model="userName" placeholder="搜索">
              <a-icon slot="prefix" type="search" />
            </a-input>
            <h2 style="font-weight: bold;margin-top: 30px;">申请</h2>
            <a-empty v-show="applyList" description="暂无数据" style="margin: 15% auto;" />
            <applylList></applylList>
            </a-spin>
          </a-tab-pane>
          <a-button slot="tabBarExtraContent" type="primary">
            批量审批
          </a-button>
        </a-tabs>
      </div>
    </section>
</template>

<script>
import applylList from '../Work_Tai/components/applyList'
import approvalList from './components/approval_list'
import SearchInput from './components/search_Input'
import SearchSelect from './components/Search_select'
import { applyWaitList, applyPassList, applyList, copyToMyList, applyType } from '../../../api/approval'
export default {
  components: {
    applylList,
    SearchInput,
    SearchSelect,
    approvalList
  },
  name: 'index',
  data () {
    return {
      userName: '',
      waitcount: 0,
      count: 0,
      applyList: [],
      spinning: true
    }
  },
  created () {
    this.getWaitList()
  },
  methods: {
    async getWaitList () { // 获取待审批列表
      const waitlist = await applyWaitList()
      if (waitlist.code === 0) {
        this.applyList = waitlist.data
        this.waitcount = waitlist.data.length
        this.spinning = false
      }
    },
    async getPassList () { // 获取已审批列表
      const passlist = await applyPassList()
      if (passlist.code === 0) {
        this.applyList = passlist.data
        this.count = passlist.data.length
        this.spinning = false
      }
    },
    async getApplyList (page) { // 获取发起审批列表
      const list = await applyList({ page: page })
      if (list.code === 0) {
        this.applyList = list.data
        this.count = list.data.length
        this.spinning = false
      }
    },
    async getCopyToMyList (page) { // 获取抄送列表
      const copyList = await copyToMyList({ page: page })
      if (copyList.code === 0) {
        this.applyList = copyList.data
        this.count = copyList.data.length
        this.spinning = false
      } else {}
    },
    async getapplyType (page) { // 发起申请列表
      const applyTypelist = await applyType({ page: page })
      console.log(applyTypelist)
      this.spinning = false
    },
    tabsapproval: function (val) {
      if (val != 1) { this.waitcount = 0 }
      this.spinning = true
      switch (val) {
        case '1':
          console.log(val)
          this.getWaitList()
          break
        case '2':
          this.getPassList()
          break
        case '3':
          this.getApplyList(1)
          break
        case '4':
          this.getCopyToMyList(1)
          break
        case '5':
          this.getapplyType(1)
          break
      }
    }
  }
}
</script>

<style scoped>
  .backcolor{
    background: #fff;
    min-width: 700px;
    position: absolute;
    height: 100%;
    width: calc(100% - 74px);
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
  .aooroval_conten{
    max-width: 1190px;
    margin:54px  auto auto;
    text-align: left;
    min-width: 700px;
    padding-left: 38px;
  }
</style>
