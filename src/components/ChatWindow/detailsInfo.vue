<template>
  <a-drawer
    title="Basic Drawer"
    placement="right"
    :closable="false"
    :visible="detailVisible"
    :after-visible-change="afterVisibleChange"
    @close="close"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
<script>
export default {
  name: 'detailsInfo',
  props: ['detailsMsg', 'detailVisible'],
  data () {
    return {
      visible: false
    }
  },
  methods: {
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    showDrawer () {
      this.visible = true
    },
    close () {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped>

</style>
