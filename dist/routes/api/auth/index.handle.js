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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_provider_1 = __importDefault(require("@/data/mongo/providers/User.provider"));
const token_1 = __importDefault(require("@/services/auth/token"));
const bcrypt_1 = __importDefault(require("@/services/auth/bcrypt"));
const fests_1 = require("fests");
const _ = __importStar(require("lodash"));
function handleRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const data = {
                username,
                password: bcrypt_1.default.hash(password),
            };
            const user = yield User_provider_1.default.createUser(data);
            return res.json({
                success: true,
                user,
            });
        }
        catch (error) {
            console.error('Register error', error);
            return next(error);
        }
    });
}
exports.handleRegister = handleRegister;
function handleLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield User_provider_1.default.getOne({ username });
            if (!user) {
                throw new fests_1.FesError('Thông tin đăng nhập không chính xác', 401);
            }
            const token = token_1.default.sync({ username });
            yield User_provider_1.default.updateOne({
                username,
            }, {
                $push: {
                    tokens: token,
                },
            });
            return res.json({
                user,
                token,
                success: true,
            });
        }
        catch (error) {
            console.error('Login error', error);
            return res.status(error.code || 500).json({
                message: error.message,
                data: error.data,
            });
        }
    });
}
exports.handleLogin = handleLogin;
function handleGetInfo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = _.get(req, 'user');
        if (!user) {
            return next(new fests_1.FesError('You not login', 401));
        }
        return res.json(user);
    });
}
exports.handleGetInfo = handleGetInfo;
function handleLogout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = _.get(req, 'user');
        if (!user) {
            return next(new fests_1.FesError('You not login', 401));
        }
        const token = req.headers.authorization.split('Bearer ').pop();
        yield User_provider_1.default.updateOne({ username: user.username }, {
            $pull: {
                tokens: token,
            },
        });
        return res.sendStatus(200);
    });
}
exports.handleLogout = handleLogout;
function handleLoginWithFacebook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.handleLoginWithFacebook = handleLoginWithFacebook;
function handleLoginWithGoogle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.handleLoginWithGoogle = handleLoginWithGoogle;
