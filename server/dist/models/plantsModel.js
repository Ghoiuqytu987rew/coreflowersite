"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plants = void 0;
const mongoose_1 = require("mongoose");
const plantsSchema = new mongoose_1.Schema({
    PlantName: { type: String, require: true, trim: true, lowercase: true },
    PlantSub: { type: String, require: true, trim: true, lowercase: true },
    about: { type: String },
    price: { type: Number, require: true },
    fullImage: { type: String },
    cropImage: { type: String },
    forSell: { type: String },
    noOnStorage: { type: Number },
}, { timestamps: true });
exports.Plants = (0, mongoose_1.model)("Plants", plantsSchema);
