"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config = {
    dirroot: path_1.default.join(__dirname, '..'),
    env: {
        PORT: 3001,
        JWT_SECRET: 'longnd',
    },
    database: [
        {
            type: 'mongo',
            host: 'f1micro.vps',
            dbName: 'fests',
            user: 'longnd',
            pass: 'long@123',
        },
    ],
};
exports.default = config;
