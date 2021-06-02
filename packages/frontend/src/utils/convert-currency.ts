import { Currency } from "@/types/currency";
import { currenciesByCode, defaultCurrency } from "@/store/defaults";

export const convertCurrency = (from: Currency['code'], to: Currency['code'], round?: boolean) => (amount: number): number => {
  const converted = Math.ceil(amount / currenciesByCode[from].rate * currenciesByCode[to].rate);
  if (round) {
    const length = converted.toString().length;
    const rem = converted % 10;
    return converted - rem;
  }
  return converted;
};