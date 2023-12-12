"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTable = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, "UserName is required"],
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        index: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.AdminTable = (0, mongoose_1.model)("adminTable", adminSchema);
