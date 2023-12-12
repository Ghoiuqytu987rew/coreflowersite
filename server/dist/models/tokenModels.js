"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenActivate = exports.Token = void 0;
const mongoose_1 = require("mongoose");
const userModel_1 = require("./userModel");
const tokensSchema = new mongoose_1.Schema({
    _user_id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: userModel_1.User,
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
const tokensSchemaActivate = new mongoose_1.Schema({
    _user_id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: userModel_1.User,
    },
    activateToken: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Token = (0, mongoose_1.model)("Token", tokensSchema);
exports.TokenActivate = (0, mongoose_1.model)("TokenActivate", tokensSchemaActivate);
