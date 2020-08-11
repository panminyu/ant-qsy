<template>
  <div class="container">
    <a-layout class="main">
    <a-layout-sider  :style="{ width: '74px', maxWidth: '74px',minWidth:'74px'}" class="sider" :defaultCollapsed="true">
      <Avatar  :username="User.username"
               :src="User.avator"
               background-color="#0dd1f0"
               color="#fff"
               style=" vertical-align: middle;margin: 20px auto;border: 3px solid #fff;"
               :inline="true">
      </Avatar>
    <Amenu :Menus = meuns></Amenu>
    </a-layout-sider>
    <a-layout>
    <a-layout-content class="content">
    <router-view></router-view>
    </a-layout-content>
    </a-layout>
    </a-layout>
  </div>
</template>
<script>
// @ is an alias to /src
import Amenu from '../components/Menu/Amenu'
import Avatar from 'vue-avatar'
import { asyncRoutes } from '../router/router'
import { mapState } from 'vuex'
export default {
  components: { Amenu, Avatar },
  name: 'home',
  data () {
    return {
      meuns: []
    }
  },
  computed: {
    ...mapState({
      User (state) { return state.userInfo }
    })
  },
  created () {
    this.meuns = asyncRoutes
  },
  methods: {
  }
}
</script>
<style scoped>
  .main{display: flex;height: 100%;position: absolute;top: 0;left: 0;width: 100%}
  .a-layout-sider{min-height: 1200px;height: 200px;}
  .test{list-style: none;}
  .sider{width: 74px;}
  /*.content{min-width: 1130px;overflow: hidden;}*/
</style>
