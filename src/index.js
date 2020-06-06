import Vue from 'vue'
import App from './app.vue'
import './assets/styles/test.css'
import './assets/styles/test2.scss'
import './assets/images/bg.jpeg'

console.log('aaa')

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: h => h(App)
}).$mount(root)