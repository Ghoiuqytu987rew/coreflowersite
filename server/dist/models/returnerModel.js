"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnerModel = void 0;
const mongoose_1 = require("mongoose");
const returnerSchema = new mongoose_1.Schema({
    value: { type: Object },
    image: { type: String },
});
exports.ReturnerModel = (0, mongoose_1.model)("returner", returnerSchema);
