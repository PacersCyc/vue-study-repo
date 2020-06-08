import Vue from 'vue'

const component = {
  template: `
    <div :style="style">
      <div class="header">
        <slot name="header"/>
      </div>
      <div class="body">
        <slot name="body"/>
      </div>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
    }
  }
}

new Vue({
  components: {
    Comp: component
  },
  el: '#root',
  template: `
    <div>
      <comp>
        <h1 slot="header">hhh</h1>
        <span slot="body">this is content</span>
      </comp>
    </div>
  `
})
