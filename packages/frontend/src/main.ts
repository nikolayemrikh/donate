import Vue from "vue";
import { Store } from "vuex";
import App from "./App.vue";
import store from "./store";
import { State } from "./types/store";

Vue.config.productionTip = false;

// Типизируем стор так, т.к. vuex 3 версии
Object.defineProperty(Vue.prototype, "$typedStore", {
  get(): Store<State> {
    return this.$store;
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
