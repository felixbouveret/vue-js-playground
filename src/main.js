import Vue from "vue";
import router from "@/router";
import App from "@/App.vue";
import store from "@/store";

import "@/styles/reset.css";
import "@/styles/main.scss";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
