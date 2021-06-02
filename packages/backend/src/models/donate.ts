import { Document, model, Schema } from "mongoose";

export const DONATE_COLLECTION = "Donate";

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  RUB = "RUB"
}

export interface Donate {
  amount: number;
  currency: Currency;
}

export interface DonateDoc extends Donate, Document {}

const schema = new Schema<DonateDoc>({
  amount: { type: Number, required: true, validate: (v: unknown) => Number.isInteger(v) },
  currency: { type: String, required: true, validate: (v: unknown) => typeof v === "string" && v in Currency },
  createdAt: { type: Date, default: Date.now }
});

export const DonateModel = model<DonateDoc>(DONATE_COLLECTION, schema);
