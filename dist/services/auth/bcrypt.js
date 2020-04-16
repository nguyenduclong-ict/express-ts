"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
function hash(text) {
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    return bcrypt_1.default.hashSync(text, salt);
}
function compare(plain, hash) {
    return bcrypt_1.default.compareSync(plain, hash);
}
exports.default = { hash, compare };
