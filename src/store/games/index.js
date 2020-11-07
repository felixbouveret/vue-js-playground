import getInitialState from './state'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: getInitialState,
  mutations: mutations,
  getters: getters,
}
