<template>
<section>
  <a-select :default-value="Type" style="width: 120px" @change="checkType">
    <a-select-option :value="0">
      全部申请
    </a-select-option>
    <a-select-option :value="1">
      请假
    </a-select-option>
    <a-select-option :value="2">
      加班
    </a-select-option>
    <a-select-option :value="3">
      外出
    </a-select-option>
    <a-select-option :value="4">
      出差
    </a-select-option>
  </a-select>
</section>
</template>

<script>
export default {
  name: 'Search_bar',
  props: ['Type'],
  methods: {
    checkType (val) {
      console.log(val)
      this.$emit('selectType', val)
    }
  }
}
</script>

<style scoped>

</style>
