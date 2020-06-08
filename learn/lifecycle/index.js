import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: `
    <div>{{text}}</div>
  `,
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this.$el, 'created')
  },
  beforeMount () {
    console.log(this.$el, 'beforeMounte')
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  render (h) {
    throw new Error('hhh')
    // return h('div', {}, this.text)
  },

  // 开发环境方便调试错误
  renderError (h, err) {
    console.log(err)
    return h('div', {}, err.stack)
  },
  // 用于生产环境捕捉错误信息
  errorCaptured () {
    // 向上冒泡
  }
})

app.$mount('#root')

// setInterval(() => {
//   app.text += 1
// }, 1000)

setTimeout(() => {
  app.$destroy()
}, 3000)
