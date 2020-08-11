<template>
<div class="Code_check">
  <div v-for="(c, index) in ct" :key="index" class="verifi">
    <div v-if="c != 'j'">
      <a-input
               v-model="ct[index]" ref="input"
               @input="e => {onInput(e.target.value, index)}"
               @keydown.delete="e=>{onKeydown(e.target.value, index)}"
               @focus="onFocus"
               :disabled="loading"></a-input>
    </div>
    <div v-if="c == 'j'">—</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'VerificationCode',
  data () {
    return {
      ct: ['', '', '', '', '', ''],
      loading: false,
      msg: ''
    }
  },
  computed: {
    ctSize () {
      return this.ct.length
    },
    cIndex () {
      let i = this.ct.findIndex(item => item === '')
      i = (i + this.ctSize) % this.ctSize
      return i
    },
    lastCode () {
      return this.ct[this.ctSize - 1]
    }
  },
  watch: {
    cIndex () {
      this.resetCaret()
    },
    lastCode (val) {
      if (val) {
        console.log('this.ctSize', this.ctSize)
        this.$refs.input[this.ctSize - 1].blur()
        this.$emit('onlastCode', this.ct)
      }
    }
  },
  mounted () {
    this.resetCaret()
  },
  methods: {
    onInput (val, index) {
      this.msg = ''
      val = val.replace(/\s/g, '')
      if (index === this.ctSize - 1) {
        this.ct[this.ctSize - 1] = val[0] // 最后一个码，只允许输入一个字符。
      } else if (val.length > 1) {
        let i = index
        for (i = index; i < this.ctSize && i - index < val.length; i++) {
          this.ct[i] = val[i]
        }
        this.resetCaret()
      }
    },
    // 重置光标位置。
    resetCaret () {
      this.$refs.input[this.ctSize - 1].focus()
    },
    onFocus () {
    // 监听 focus 事件，将光标重定位到“第一个空白符的位置”。
      let index = this.ct.findIndex(item => item === '')
      index = (index + this.ctSize) % this.ctSize
      this.$refs.input[index].focus()
    },
    onKeydown (val, index) {
      if (val === '') {
      // 删除上一个input里的值，并对其focus。
        if (index > 0) {
          this.ct[index - 1] = ''
          this.$refs.input[index - 1].focus()
        }
      }
    },
    reset () {
    // 重置。一般是验证码错误时触发。
      this.ct = this.ct.map(item => '')
      this.resetCaret()
    }
  }
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
  .ant-input:hover{border-color: #d9d9d9}
</style>
