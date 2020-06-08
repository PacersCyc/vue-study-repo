import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div v-text="text+1">{{text}}</div>
      <div v-pre>Text: {{text}}</div>
    </div>
  `,
  data: {
    text: 0,
    active: false
  }
})
