<template>
  <a-menu
    :default-selected-keys="[$route.path.replace('/','')]"
    mode="inline"
    theme="dark"
    :inline-collapsed="true"
    style="width: 74px;"
  >
    <a-menu-item :key="item.path" :style="{padding:'0!important'}"  v-for="item in Menus">
      <a-icon :type="item.meta.icon" :style="{fontSize:'30px',lineHeight:'50px'}" />
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

</style>
