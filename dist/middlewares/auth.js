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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const token_1 = __importDefault(require("@/services/auth/token"));
const User_provider_1 = __importDefault(require("@/data/mongo/providers/User.provider"));
const fests_1 = require("fests");
function authMiddleware(rule) {
    return function handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = _.get(req, 'user') || (yield getUser(req.headers.authorization));
            _.set(req, 'user', user);
            const { and, or, not } = rule || {};
            if (and || or || not) {
                if (!user) {
                    return next(new fests_1.FesError('Login required:' + and.join(','), 401));
                }
                const userRoles = user.roles || [];
                if (and && and.some((role) => !userRoles.find((r) => r.id === role))) {
                    return next(new fests_1.FesError('User must have all roles: ' + and.join(','), 403));
                }
                if (or && or.every((role) => !userRoles.find((r) => r.id === role))) {
                    return next(new fests_1.FesError('User must have at least on role: ' + and.join(','), 403));
                }
                if (not && not.some((role) => userRoles.find((r) => r.id === role))) {
                    return next(new fests_1.FesError('User must not have role: ' + and.join(','), 403));
                }
            }
            next();
        });
    };
}
exports.authMiddleware = authMiddleware;
function getUser(authorization = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const token = authorization.split('Bearer ').pop();
        if (token) {
            const tokenData = token_1.default.verify(token);
            const user = yield User_provider_1.default.getOne({
                username: tokenData.username,
                tokens: token,
            }, ['roles']);
            return user;
        }
        return null;
    });
}
