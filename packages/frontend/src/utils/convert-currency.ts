import { Currency } from "@/types/currency";
import { currenciesByCode } from "@/store/defaults";

export const convertCurrency =
  (from: Currency["code"], to: Currency["code"], round?: boolean) =>
  (amount: number): number => {
    const converted = Math.ceil(
      (amount / currenciesByCode[from].rate) * currenciesByCode[to].rate
    );
    if (round) {
      const length = converted.toString().length;
      const mod = 10 ** (length - 2);
      const rem = converted % mod;
      console.log(rem);
      
      return converted + mod - rem;
    }
    return converted;
  };
