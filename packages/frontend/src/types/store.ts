import { ActionTypes, MutationTypes } from "@/enums";
import { Store as VuexStore, CommitOptions, ActionContext, DispatchOptions } from "vuex";
import { Currency } from "./currency";

export interface State {
  amount: number;
  currency: Currency['code'];
}


export interface Mutations {
  [MutationTypes.UPDATE_CURRENT_AMOUNT](state: State, payload: number): void;
  [MutationTypes.UPDATE_CURRENCY](state: State, payload: Currency['code']): void;
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.UPDATE_CURRENT_AMOUNT]({commit}: AugmentedActionContext, payload: number): void;
  [ActionTypes.UPDATE_CURRENCY]({commit}: AugmentedActionContext, payload: Currency['code']): void;
}

export type Store = Omit<
  VuexStore<State>,
  'commit' | 'dispatch' // | 'getters'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}
// & {
//   getters: {
//     [K in keyof Getters]: ReturnType<Getters[K]>
//   }
// }