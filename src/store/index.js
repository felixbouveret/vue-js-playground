import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import games from "./games";

export default new Vuex.Store({
  modules: {
    games,
  },
});
