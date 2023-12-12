"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    messageU: {
        type: String,
        required: [true, "messageU is required"],
        trim: true,
        lowercase: true,
    },
    messageA: {
        type: String,
        required: [true, "messageA is required"],
        trim: true,
        lowercase: true,
    },
    red: {
        type: Number,
    },
    isUser: {
        type: Number,
    },
    userName: {
        type: String,
        required: [true, "userName is required"],
        trim: true,
        lowercase: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Message = (0, mongoose_1.model)("message", messageSchema);
