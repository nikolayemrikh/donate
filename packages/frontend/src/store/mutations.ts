import { MutationTypes } from "@/enums";
import { Mutations, State } from "@/types/store";
import { MutationTree } from "vuex";

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.UPDATE_CURRENT_AMOUNT](state, amount) {
    state.amount = amount;
  },
  [MutationTypes.UPDATE_CURRENCY](state, currency) {
    state.currency = currency;
  },
  [MutationTypes.DONATE_SUCCESS](state) {
    state.donationResult = {
      success: true,
    };
  },
  [MutationTypes.DONATE_ERROR](state, errorMessage) {
    state.donationResult = {
      success: false,
      errorMessage,
    };
    console.log(state.donationResult);
  },
};
