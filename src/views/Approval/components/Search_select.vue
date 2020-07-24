<template>
<section>
  <a-select default-value="all" style="width: 120px">
    <a-select-option value="all">
      全部申请
    </a-select-option>
    <a-select-option value="qingjia">
      请假
    </a-select-option>
    <a-select-option value="jiaban">
      加班
    </a-select-option>
    <a-select-option value="waichu">
      外出
    </a-select-option>
    <a-select-option value="chuchai">
      出差
    </a-select-option>
  </a-select>
</section>
</template>

<script>
export default {
  name: 'Search_bar'
}
</script>

<style scoped>

</style>
