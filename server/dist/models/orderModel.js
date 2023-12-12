"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: { type: String },
    city: { type: String },
    adress: { type: String },
    deliveryMethod: { type: String },
    payMethod: { type: String },
    personWhoOrder: { type: Object },
    personWhoWillTAke: { type: Object },
    order: { type: Object },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Order = (0, mongoose_1.model)("Orders", orderSchema);
