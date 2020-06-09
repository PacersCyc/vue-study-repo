import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import createRouter from './config/router'
import './assets/styles/global.scss'

Vue.use(VueRouter)

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: h => h(App),
  router: createRouter()
}).$mount(root)
