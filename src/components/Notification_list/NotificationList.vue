<template>
  <a-list item-layout="horizontal" :data-source="info" size="small">
    <a-list-item slot="renderItem" slot-scope="item, index" class="N_list" :class="{'activeName':active == index}" @click="activeNotification(index,item)">
      <a-list-item-meta
        description="消息通知列表"
      >
        <span slot="title">{{ item.title }}</span>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  name: 'NotificationList',
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
.N_list:hover { background: #f4f6f7;cursor: pointer;}
  .activeName {background: #e8e8e8;}
</style>
