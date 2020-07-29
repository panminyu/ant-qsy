<template>
  <a-list item-layout="horizontal" :data-source="info" size="small" :split="false">
    <a-list-item slot="renderItem" slot-scope="item, index" class="N_list" :class="{'activeName':active == index}" @click="activeNotification(index,item)">
      <a-list-item-meta description="消息通知列表">
        <span slot="title" class="message_title">{{ item.title }}</span>
        <Avatar  slot="avatar"
                 :username="item.title"
                 src=""
                 color="#fff"
                 :size="40"
                 style=" vertical-align: middle;"
                 :inline="true"
        ></Avatar>
      </a-list-item-meta>
      <div style="margin-right: 19px">16:00</div>
    </a-list-item>
  </a-list>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  name: 'NotificationList',
  components: { Avatar },
  props: ['active', 'info'],
  data () {
    return {
    }
  },
  methods: {
    activeNotification (index, data) {
      this.$emit('tabInfo', data, index)
    }
  }
}
</script>

<style scoped>
  .N_list{padding-left: 24px}
  .N_list:hover {cursor: pointer;}
  .activeName {background: rgb(210,223,253);}
  .message_title{font-weight: bold;font-size: 16px;}
</style>
