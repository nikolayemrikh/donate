import { State } from "@/types/state";
import Vue from "vue";
import Vuex from "vuex";
import { actions } from "./actions";
import { defaultCurrency } from "./defaults";
import { mutations, MutationTypes } from "./mutations";
import { presets } from "./presets";

Vue.use(Vuex);

const store = new Vuex.Store<State>({
  state: {
    amount: presets[defaultCurrency][0],
    currency: defaultCurrency
  },
  mutations,
  actions,
  modules: {},
});


export default store;