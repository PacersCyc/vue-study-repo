import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div :id="aaa">
      {{isActive ? 'active' : 'not active'}}
    </div>
  `,
  data: {
    isActive: false,
    aaa: 'iii',
  }
})
