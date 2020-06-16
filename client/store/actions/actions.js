// import model from '../../model/client-model'
import model from 'model'
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
    commit('startLoading')
    return model.getAllTodos().then(data => {
      commit('endLoading')
      commit('fillTodos', data)
    }).catch(e => {
      commit('endLoading')
      handleError(e)
    })
  },
  addTodo ({ commit }, todo) {
    commit('startLoading')
    model.createTodo(todo).then(data => {
      commit('endLoading')
      commit('addTodo', data)
      notify({
        content: '添加待办事项成功'
      })
    }).catch(e => {
      commit('endLoading')
      handleError(e)
    })
  },
  updateTodo ({ commit }, { id, todo }) {
    commit('startLoading')
    model.updateTodo(id, todo).then(data => {
      commit('endLoading')
      commit('updateTodo', { id, todo: data })
    }).catch(e => {
      commit('endLoading')
      handleError(e)
    })
  },
  deleteTodo ({ commit }, id) {
    commit('startLoading')
    model.deleteTodo(id).then(() => {
      commit('endLoading')
      commit('deleteTodo', id)
      notify({
        content: '删除待办事项成功'
      })
    }).catch(e => {
      commit('endLoading')
      handleError(e)
    })
  },
  deleteAllCompleted ({ commit, state }) {
    commit('startLoading')
    const ids = state.todos.filter(item => item.completed).map(item => item.id)
    model.deleteAllCompleted(ids).then(data => {
      commit('endLoading')
      commit('deleteAllCompleted', data)
      notify({
        content: '清理完成事项成功'
      })
    }).catch(e => {
      commit('endLoading')
      handleError(e)
    })
  },
  login ({ commit }, { username, password }) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      model.login(username, password).then(data => {
        commit('endLoading')
        commit('doLogin', data)
        notify({
          content: '登录成功'
        })
        resolve()
      }).catch(e => {
        commit('endLoading')
        handleError(e)
        reject(e)
      })
    })
  }
}
