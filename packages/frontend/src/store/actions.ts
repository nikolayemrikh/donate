import { Currency } from "@/types/currency";
import { State } from "@/types/state";
import { ActionContext, ActionTree, MutationTree } from "vuex";
import { MutationTypes } from "./mutations";

export enum ActionTypes {
  UPDATE_CURRENT_AMOUNT = 'updateCurrentAmount',
  UPDATE_CURRENCY = 'updateCurrency'
}

export const actions: ActionTree<State, State> = {
  [ActionTypes.UPDATE_CURRENT_AMOUNT]({commit}: ActionContext<State, State>, payload: number): void {
    commit(MutationTypes.UPDATE_CURRENT_AMOUNT, payload)
  },
  [ActionTypes.UPDATE_CURRENCY]({commit}: ActionContext<State, State>, payload: Currency['code']): void {    
    commit(MutationTypes.UPDATE_CURRENCY, payload)
  }
}