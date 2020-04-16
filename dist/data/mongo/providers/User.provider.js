"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("@/data/mongo/models/User"));
const fests_1 = require("fests");
class UserProvider extends fests_1.Mongoose.Provider {
    createUser(doc) {
        return User_1.default.create(doc);
    }
    getAllUser() {
        return User_1.default.find().lean().exec();
    }
}
exports.default = new UserProvider(User_1.default);
