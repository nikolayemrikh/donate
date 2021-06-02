import { State } from "@/types/store";
import Vue from "vue";
import Vuex from "vuex";
import { actions } from "./actions";
import { defaultCurrency } from "./defaults";
import { mutations } from "./mutations";
import { presets } from "./presets";

Vue.use(Vuex);

const store = new Vuex.Store<State>({
  state: {
    amount: presets[defaultCurrency][0],
    currency: defaultCurrency,
    donationResult: undefined,
  },
  mutations,
  actions,
  modules: {},
});

export default store;
