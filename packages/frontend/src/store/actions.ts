import { ActionTypes, MutationTypes } from "@/enums";
import { Actions, State } from "@/types/store";
import { convertCurrency } from "@/utils/convert-currency";
import { ActionTree } from "vuex";
import { presets } from "./presets";

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.UPDATE_CURRENT_AMOUNT]({commit}, payload): void {
    commit(MutationTypes.UPDATE_CURRENT_AMOUNT, payload)
  },
  [ActionTypes.UPDATE_CURRENCY]({state, commit}, currency): void {    
    const preset = presets[state.currency];
    const idx = preset.indexOf(state.amount);
    let amount: number;
    if (idx !== -1) {
      const newPreset = presets[currency];
      amount = newPreset[idx];
    } else {
      amount = convertCurrency(state.currency, currency)(state.amount);
    }

    commit(MutationTypes.UPDATE_CURRENCY, currency);
    commit(MutationTypes.UPDATE_CURRENT_AMOUNT, amount);
  }
}