import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      {{fullName}}
      <input type="text" v-model="firstName" />
      <input type="text" v-model="obj.a" />
      {{b}}
      <p>{{name}}</p>
    </div>
  `,
  data: {
    firstName: 'cyc',
    lastname: 'jk',
    name: '',
    obj: {
      a: 1
    },
    b: 10
  },
  computed: {
    fullName () {
      return `${this.firstName} ${this.lastname}`
    }
  },
  watch: {
    firstName: {
      handler (val) {
        console.log('firstName change', val)
        this.name = this.firstName + this.lastname
      },
      immediate: true
    },
    obj: {
      handler (newVal) {
        console.log('obj.a changed', newVal)
        this.b = newVal.a
      },
      deep: true
    }
  }
})
