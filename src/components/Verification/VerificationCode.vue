<template>
<div class="Code_check">
  <div v-for="item in 6" :key="item"  class="verifi">
    <div>
      <a-input maxLength="1"></a-input>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'VerificationCode'
}
</script>

<style scoped>
  .Code_check{
   display: flex;
    align-items: center;
    justify-content: space-between;
  }
.verifi input{
  width: 48px;
  height: 48px;
  font-size: 22px;
  text-align: center;
}
</style>
