"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const optionsDefault = {
    expiresIn: Number(process.env.JWT_EXPIRES_IN) || '7d',
};
function sync(payload, options) {
    options = Object.assign(Object.assign({}, optionsDefault), options);
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
function verify(token, options) {
    return jsonwebtoken_1.default.verify(token, secret, options);
}
exports.default = { sync, verify };
