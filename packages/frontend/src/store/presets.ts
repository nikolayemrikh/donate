import { Presets } from "@/types/currency";
import { convertCurrency } from "@/utils/convert-currency";
import { currencies, defaultCurrency, dollarsPresets } from "./defaults";

export const presets: Presets = currencies.reduce((acc: Presets, c) => {
  acc[c.code] = dollarsPresets.map(
    convertCurrency(defaultCurrency, c.code, true)
  );
  return acc;
}, {});
