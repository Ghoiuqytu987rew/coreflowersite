"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAdmin = void 0;
const mongoose_1 = require("mongoose");
const adminModel_1 = require("./adminModel");
const tokensAdminSchema = new mongoose_1.Schema({
    _user_id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: adminModel_1.AdminTable,
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
exports.TokenAdmin = (0, mongoose_1.model)("tokenAdmin", tokensAdminSchema);
