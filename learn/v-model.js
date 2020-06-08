import Vue from 'vue'

const component = {
  // 组件自定义v-model
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: {
    value: String,
    value1: String
  },
  template: `
    <div>
      <input type="text" :value="value1" @input="handleInput"/>
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data: {
    value: '123'
  },
  template: `
    <div>
      <!--<comp-one :value="value" @input="value = arguments[0]"></comp-one>-->
      <comp-one v-model="value"></comp-one>
    </div>
  `
})
