<template>
  <a-menu
    :default-selected-keys="[$route.path]"
    mode="inline"
    theme="dark"
    :inline-collapsed="true"
    style="width: 74px; background: #2959FF"
  >
    <a-menu-item :key="item.path" :style="{padding:'9px 0!important',height:'52px',}"  v-for="item in Menus">
      <a-icon :type="item.meta.icon" :style="{fontSize:'28px'}" />
      <router-link :to="item.path">{{item.meta.title}}</router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  name: 'Amenu',
  props: ['Menus'],
  mounted () {
  }
}
</script>

<style scoped>

  .ant-menu.ant-menu-dark .ant-menu-item-selected{background: #00E5B9}
</style>
