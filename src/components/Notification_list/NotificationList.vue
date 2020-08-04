<template>
  <a-list item-layout="horizontal" :data-source="info" size="small" :split="false">
    <a-list-item slot="renderItem" slot-scope="item, index" class="N_list" :class="{'activeName':active == index}" @click="activeNotification(index,item)">
      <a-list-item-meta >
        <div slot="title" class="message_title contenList">{{ item.app_name }}</div>
        <div slot="description" class="contenList">{{item.title}}</div>
        <Avatar  slot="avatar"
                 :username="item.app_name"
                 :src="item.app_icon"
                 color="#fff"
                 :size="40"
                 style=" vertical-align: middle;"
                 :inline="true"
        ></Avatar>
      </a-list-item-meta>
      <div style="margin-right: 19px">{{item.time}}</div>
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
  .contenList{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 300px;
  }
</style>
