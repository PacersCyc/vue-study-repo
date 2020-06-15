<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs :value="filter" @change="handleChangeTab">
        <tab v-for="tab in states" :key="tab" :index="tab" :label="tab" />
        <!-- <tab label="tab1" index="1">
          <span>tab1 content {{inputContent}}</span>
        </tab>
        <tab index="2">
          <span slot="label" style="color: red;">tab2</span>
          <span>tab2 content</span>
        </tab>
        <tab label="tab3" index="3">
          <span>tab3 content</span>
        </tab> -->
      </tabs>
    </div>
    <input
      type="text"
      class="add-input"
      autofocus
      placeholder="接下去要做什么"
      @keyup.enter="handleAdd"
    >
    <Item
      v-for="todo in filteredTodos"
      :todo="todo"
      :key="todo.id"
      @del="deleteTodo"
      @toggle='toggleTodoState'
    />
    <Helper
      :filter="filter"
      :todos="todos"
      @clearAllCompleted="clearAllCompleted"
    />
    <!-- <router-view /> -->
  </section>
</template>

<script>
import Item from './item.vue'
import Helper from './helper.vue'
import { mapState, mapActions } from 'vuex'

// let id = 0
export default {
  metaInfo: {
    title: 'The Todo App'
  },
  components: {
    Item,
    Helper
  },

  data () {
    return {
      // todos: [],
      filter: 'all',
      states: ['all', 'active', 'completed']
      // inputContent: ''
    }
  },

  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(item => item.completed === completed)
    }
  },
  mounted () {
    this.fetchTodos()
  },
  methods: {
    ...mapActions(['fetchTodos', 'addTodo', 'deleteTodo', 'updateTodo', 'deleteAllCompleted']),
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    // toggleFilter (state) {
    //   this.filter = state
    // },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    },
    clearAllCompleted () {
      // this.todos = this.todos.filter(item => !item.completed)
      this.deleteAllCompleted()
    },
    handleChangeTab (index) {
      this.filter = index
    }
  }
}
</script>

<style lang="scss" scoped>
  .real-app{
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
  }
  .add-input{
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  }
  .tab-container {
    background-color: #fff;
    padding: 0 15px;
  }
</style>
