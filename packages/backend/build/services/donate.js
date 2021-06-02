"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDonate = void 0;
const E = __importStar(require("fp-ts/Either"));
const donate_1 = require("../models/donate");
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    amount: joi_1.default.number().integer().required(),
    currency: joi_1.default.string()
        .valid(...Object.keys(donate_1.Currency))
        .required()
});
const createDonate = async (data) => {
    const validationRes = schema.validate(data);
    if (validationRes.error) {
        return E.left(validationRes.error.message);
    }
    try {
        const donateModel = await donate_1.DonateModel.create(data);
        return E.right(donateModel.toJSON());
    }
    catch (err) {
        return E.left(`Error while saving donation`);
    }
};
exports.createDonate = createDonate;
//# sourceMappingURL=donate.js.map