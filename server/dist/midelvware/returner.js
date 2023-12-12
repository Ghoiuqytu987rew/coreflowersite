"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returner = void 0;
const returnerModel_1 = require("../models/returnerModel");
class Returner {
    async returnValue(value) {
        await returnerModel_1.ReturnerModel.create({ value: value });
    }
}
exports.returner = new Returner();
