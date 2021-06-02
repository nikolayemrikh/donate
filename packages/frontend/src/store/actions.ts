import { post } from "@/api";
import { ActionTypes, ApiRoutes, MutationTypes } from "@/enums";
import { Actions, State } from "@/types/store";
import { convertCurrency } from "@/utils/convert-currency";
import { ActionTree } from "vuex";
import { presets } from "./presets";

interface DonateRes {
  ok: boolean;
}
const isDonateRes = (data: unknown): data is DonateRes => {
  return typeof data === "object" && typeof (data as any)?.ok === "boolean";
};

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.UPDATE_CURRENT_AMOUNT]({ commit }, payload): void {
    commit(MutationTypes.UPDATE_CURRENT_AMOUNT, payload);
  },
  [ActionTypes.UPDATE_CURRENCY]({ state, commit }, currency): void {
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
  },
  async [ActionTypes.SUBMIT_DONATE]({ state, commit }): Promise<void> {
    try {
      const { amount, currency } = state;
      const { data } = await post(ApiRoutes.DONATE, { amount, currency });
      if (!isDonateRes(data)) throw new Error("Wrong server response");

      const { ok } = data;
      if (ok) {
        commit(MutationTypes.DONATE_SUCCESS, undefined);
      } else {
        commit(MutationTypes.DONATE_ERROR, "Error happened");
      }
    } catch (err) {
      // log err.message
      commit(MutationTypes.DONATE_ERROR, "Unknown error happened");
    }
  },
};
