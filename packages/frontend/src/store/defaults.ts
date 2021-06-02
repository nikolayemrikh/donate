import { Currency } from "@/types/currency";

export const currencies: Currency[] = [
  { name: "US Dollar", code: "USD", symbol: "$", rate: 1 },
  { name: "Euro", code: "EUR", symbol: "€", rate: 0.897597 },
  { name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755 },
  { name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993 },
];

export const currenciesByCode: Record<Currency["code"], Currency> =
  currencies.reduce((acc: Record<Currency["code"], Currency>, c) => {
    acc[c.code] = c;
    return acc;
  }, {});

export const dollarsPresets = [40, 100, 200, 1000, 2500, 5000];
export const defaultCurrency = "USD";
