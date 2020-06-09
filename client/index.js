import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
import createRouter from './config/router'
import createStore from './store/store'
import './assets/styles/global.scss'

Vue.use(VueRouter)
Vue.use(Vuex)

const root = document.createElement('div')
document.body.appendChild(root)

const router = createRouter()
const store = createStore()

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
  router,
  store
}).$mount(root)
