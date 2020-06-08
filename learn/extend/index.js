import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text" />
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  },
  mounted () {
    console.log('comp mounted')
  }
}

const parent = new Vue({
  name: 'Parent'
})

const component2 = {
  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    console.log(this.$parent.$options.name)
  }
}

// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#root',
//   props: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: 123
//   },
//   mounted () {
//     console.log('instance mounted')
//   }
// })

new Vue({
  name: 'Root',
  parent: parent,
  el: '#root',
  components: {
    Comp: component2
  },
  template: `
    <comp></comp>
  `,
  mounted () {
    console.log(this.$parent.$options.name)
  }
})
