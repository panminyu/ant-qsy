<template>
 <div class="install">
   <ul class="apply_list">
     <li v-for="item in applist" >
      <router-link :to="item.app_keyword"  class="apply_conter" style="display: block;" v-if="item.app_type === 0">
        <img alt="example" class="apply_icon" :src="item.app_icorn" />
         {{item.app_name}}
      </router-link>
       <a :href="item.app_path"  v-if="item.app_type === 1" style="display: block;"  class="apply_conter">
         <img alt="example" class="apply_icon" :src="item.app_icorn" />
         {{item.app_name}}
       </a>
     </li>
     <li v-if="isadd">
       <a-icon type="plus-circle" :style="{fontSize:'35px',verticalAlign:'middle'}"></a-icon>
       <span style="margin-left: 10px;">添加功能</span>
       </li>
  </ul>
 </div>
</template>

<script>
export default {
  name: 'applyList',
  props: ['applist', 'isadd'],
  data () {
    return {}
  }
}
</script>

<style scoped>
  .install{
    padding: 48px 48px 64px 0;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .apply_list{
    padding:0;
    line-height: 80px;
    list-style: none;
    width: 100%;
    max-width: 1772px;
    display: grid;
    gap: 16px 16px;
    grid-template-columns: repeat(auto-fill,minmax(220px,1fr));
    grid-template-rows: repeat(auto-fill,80px);cursor: pointer
  }
  .apply_list li{
    background: #fff;
    border-radius: 5px;
  }
.apply_list li:hover{
  box-shadow:0 10px 16px -2px #ddd;
}
  .apply_conter{
    font-size: 16px;
    color: #333;
  }
  .apply_icon{
    width: 18%;
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: middle;
  }
</style>
