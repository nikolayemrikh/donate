import { MutationTypes } from "@/enums";
import { Mutations, State } from "@/types/store";
import { convertCurrency } from "@/utils/convert-currency";
import { MutationTree } from "vuex";
import { presets } from "./presets";

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.UPDATE_CURRENT_AMOUNT](state, amount) {
    state.amount = amount;
  },
  [MutationTypes.UPDATE_CURRENCY](state, currency) {
    state.currency = currency;
  },
  [MutationTypes.DONATE_SUCCESS](state) {
    state.donationResult = {
      success: true
    };
  },
  [MutationTypes.DONATE_ERROR](state) {
    state.donationResult = {
      success: false,
      errorMessage: "Произошла неизвестная ошибка"
    };
  }
}