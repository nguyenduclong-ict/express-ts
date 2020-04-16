"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const fesjs_config_1 = __importDefault(require("./config/fesjs.config"));
const fests_1 = require("fests");
const http_1 = __importDefault(require("http"));
const mongo_1 = __importDefault(require("./data/mongo"));
exports.app = express_1.default();
exports.server = http_1.default.createServer(exports.app);
fests_1.FesServer(fesjs_config_1.default, exports.app, exports.server)
    .start()
    .then(() => {
    console.log('Server started');
    mongo_1.default();
});
