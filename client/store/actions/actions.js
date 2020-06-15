import model from '../../model/client-model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (err) => {
  if (err.code === 401) {
    notify({
      content: '请先登录'
    })
    bus.$emit('auth')
  }
}

export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  },
  fetchTodos ({ commit }) {
    model.getAllTodos().then(data => {
      commit('fillTodos', data)
    }).catch(e => {
      handleError(e)
    })
  },
  addTodo ({ commit }, todo) {
    model.createTodo(todo).then(data => {
      commit('addTodo', data)
      notify({
        content: '添加待办事项成功'
      })
    }).catch(handleError)
  },
  updateTodo ({ commit }, { id, todo }) {
    model.updateTodo(id, todo).then(data => {
      commit('updateTodo', { id, todo: data })
    }).catch(handleError)
  },
  deleteTodo ({ commit }, id) {
    model.deleteTodo(id).then(() => {
      commit('deleteTodo', id)
      notify({
        content: '删除待办事项成功'
      })
    }).catch(handleError)
  },
  deleteAllCompleted ({ commit, state }) {
    const ids = state.todos.filter(item => item.completed).map(item => item.id)
    model.deleteAllCompleted(ids).then(data => {
      commit('deleteAllCompleted', data)
      notify({
        content: '清理完成事项成功'
      })
    }).catch(handleError)
  },
  login ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      model.login(username, password).then(data => {
        commit('doLogin', data)
        notify({
          content: '登录成功'
        })
        resolve()
      }).catch(e => {
        handleError(e)
        reject(e)
      })
    })
  }
}
