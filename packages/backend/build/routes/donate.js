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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDonateRoute = void 0;
const express_1 = require("express");
const donate_1 = require("../services/donate");
const E = __importStar(require("fp-ts/Either"));
const getDonateRoute = () => {
    const route = express_1.Router();
    route.post("/", async (req, res) => {
        var _a;
        const { body } = req;
        try {
            const donateRes = await donate_1.createDonate(body);
            if (E.isLeft(donateRes)) {
                return res.json({ ok: false, errorMessage: donateRes.left }).status(200);
            }
            res.json({ ok: true }).status(200);
        }
        catch (err) {
            res.json({ error: `Неизвестная ошибка: ${(_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : ""}` }).status(500);
        }
    });
    return route;
};
exports.getDonateRoute = getDonateRoute;
//# sourceMappingURL=donate.js.map