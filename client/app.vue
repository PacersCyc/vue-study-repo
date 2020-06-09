<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{fullName}} {{count}}</p>
    <!-- <Todo></Todo> -->
    <router-link :to="{name: 'app'}">app</router-link>
    <router-link to="login">login</router-link>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <Footer></Footer>
    <router-view name="a" />
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

console.log(Header.__docs)

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['fullName'])
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    ...mapMutations(['updateCount']),
    ...mapActions(['updateCountAsync'])
  },
  mounted () {
    console.log(this.$route)
    console.log(this.$store)
    // this.$store.state.count = 11
    let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
    // this.$store.dispatch('updateCountAsync', {
    //   num: 1,
    //   time: 1000
    // })

    setInterval(() => {
      this.updateCount(i++)
    }, 1000)
    // this.updateCountAsync({
    //   num: 15,
    //   time: 1000
    // })
  }
}
</script>

<style lang="scss" scoped>
  #app{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    #cover{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: #999;
      opacity: .9;
      z-index: -1;
    }
  }

  #loading{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255,255,255,.3);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
