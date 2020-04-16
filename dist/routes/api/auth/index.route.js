"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_handle_1 = require("./index.handle");
const auth_1 = require("@/middlewares/auth");
const router = express_1.Router();
// ------- Declare router -------
router.post('/register', index_handle_1.handleRegister);
router.post('/login', index_handle_1.handleLogin);
router.post('/google', index_handle_1.handleLoginWithGoogle);
router.post('/facebook', index_handle_1.handleLoginWithFacebook);
router.get('/me', auth_1.authMiddleware(), index_handle_1.handleGetInfo);
router.post('/logout', auth_1.authMiddleware(), index_handle_1.handleLogout);
// ------------------------------
exports.default = router;
