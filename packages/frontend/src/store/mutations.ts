import { Currency } from "@/types/currency";
import { State } from "@/types/state";
import { convertCurrency } from "@/utils/convert-currency";
import { MutationTree } from "vuex";
import { presets } from "./presets";

export enum MutationTypes {
  UPDATE_CURRENT_AMOUNT = 'updateCurrentAmount',
  UPDATE_CURRENCY = 'updateCurrency'
}

export const mutations: MutationTree<State> = {
  [MutationTypes.UPDATE_CURRENT_AMOUNT](state: State, payload: number): void {
    state.amount = payload;
  },
  [MutationTypes.UPDATE_CURRENCY](state: State, payload: Currency['code']): void {
    const preset = presets[state.currency];
    const idx = preset.indexOf(state.amount);
    if (idx !== -1) {
      const newPreset = presets[payload];
      state.amount = newPreset[idx];
    } else {
      state.amount = convertCurrency(state.currency, payload)(state.amount);
    }
    state.currency = payload;
  }
}