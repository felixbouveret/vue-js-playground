import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import app from './app'
import games from './games'

const dataState = createPersistedState({
  paths: ['games', 'app'],
})

export default new Vuex.Store({
  plugins: [dataState],
  modules: {
    games,
    app,
  },
})
