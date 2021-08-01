import getInitialState from './state'
import mutations from './mutations'

export default {
  namespaced: true,
  state: getInitialState,
  mutations: mutations,
}
