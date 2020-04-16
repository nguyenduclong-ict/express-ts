"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_handle_1 = require("./index.handle");
const router = express_1.Router();
router.get('/', index_handle_1.handleSayHello);
exports.default = router;
