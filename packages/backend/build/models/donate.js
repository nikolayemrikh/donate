"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonateModel = exports.Currency = exports.DONATE_COLLECTION = void 0;
const mongoose_1 = require("mongoose");
exports.DONATE_COLLECTION = "Donate";
var Currency;
(function (Currency) {
    Currency["USD"] = "USD";
    Currency["EUR"] = "EUR";
    Currency["GBP"] = "GBP";
    Currency["RUB"] = "RUB";
})(Currency = exports.Currency || (exports.Currency = {}));
const schema = new mongoose_1.Schema({
    amount: { type: Number, required: true, validate: (v) => Number.isInteger(v) },
    currency: { type: String, required: true, validate: (v) => typeof v === "string" && v in Currency },
    createdAt: { type: Date, default: Date.now }
});
exports.DonateModel = mongoose_1.model(exports.DONATE_COLLECTION, schema);
//# sourceMappingURL=donate.js.map