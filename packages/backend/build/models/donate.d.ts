import { Document } from "mongoose";
export declare const DONATE_COLLECTION = "Donate";
export declare enum Currency {
    USD = "USD",
    EUR = "EUR",
    GBP = "GBP",
    RUB = "RUB"
}
export interface Donate {
    amount: number;
    currency: Currency;
}
export interface DonateDoc extends Donate, Document {
}
export declare const DonateModel: import("mongoose").Model<DonateDoc, {}, {}>;
