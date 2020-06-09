import Vuex from 'vuex'
import defaultState from './state/state'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    strict: isDev, // 阻止组件内部不经mutations修改state, 只用于开发环境
    state: defaultState,
    getters,
    mutations,
    actions
  })
}
