import { Currency } from "./currency";

export interface State {
  amount: number;
  currency: Currency['code'];
  // presets: readonly number[];
}
