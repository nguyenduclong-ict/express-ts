"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = __importDefault(require("@/data/mongo/models/Role"));
const fests_1 = require("fests");
class RoleProvider extends fests_1.Mongoose.Provider {
}
exports.default = new RoleProvider(Role_1.default);
