<template>
  <section>
    <a-input style="width: 300px;" v-model="val" placeholder="搜索" size="large" >
      <a-icon slot="prefix" type="search" />
    </a-input>
  </section>
</template>

<script>
export default {
  name: 'search_Input',
  data () {
    return {
      val: ''
    }
  }
}
</script>

<style scoped>

</style>
