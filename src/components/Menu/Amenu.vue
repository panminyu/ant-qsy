<template>
  <a-menu
    :default-selected-keys="[$route.path]"
    mode="inline"
    theme="dark"
    :inline-collapsed="true"
    style="width: 74px; background: #2959FF"
  >
    <a-menu-item :key="item.path" :style="{padding:'9px 0!important',height:'52px',}"  v-for="item in Menus">
      <IconFont :type="item.meta.icon" class="menu_icon" ></IconFont>
      <router-link :to="item.path">{{item.meta.title}}</router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { IconFont } from '../../Mixins/Icon'

export default {
  name: 'Amenu',
  components: { IconFont },
  props: ['Menus']
}
</script>

<style scoped>

  .ant-menu.ant-menu-dark .ant-menu-item-selected{background: #00E5B9}
  .menu_icon{color: rgba(255,255,255,0.5); font-size: 28px!important;}
</style>
