"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        default() {
            return this.id + ' role';
        },
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Role',
    },
});
const Role = mongoose_1.model('Role', schema);
exports.default = Role;
