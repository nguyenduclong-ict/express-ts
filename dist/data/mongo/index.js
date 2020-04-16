"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fests_1 = require("fests");
const mongoose_1 = __importDefault(require("mongoose"));
function connectMongodb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = fests_1.Config.database.find((c) => c.type === 'mongo');
            if (!config)
                throw new Error('No config for mongodb');
            const { host, port, dbName, user, pass } = config;
            const uri = `mongodb://${host}:${port}/${dbName}`;
            const defaultConfig = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            };
            yield mongoose_1.default.connect(uri, Object.assign(Object.assign({}, defaultConfig), { user,
                pass }));
            console.log('mongodb: connected', {
                host,
                dbName,
            });
        }
        catch (error) {
            console.error('Connect mongodb error:', error);
        }
    });
}
exports.default = connectMongodb;
