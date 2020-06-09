import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import createRouter from './config/router'
import './assets/styles/global.scss'

Vue.use(VueRouter)

const root = document.createElement('div')
document.body.appendChild(root)

const router = createRouter()

router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolved')
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach')
})

new Vue({
  render: h => h(App),
  router
}).$mount(root)
