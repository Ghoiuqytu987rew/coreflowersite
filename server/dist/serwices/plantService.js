"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantService = void 0;
const plantsModel_1 = require("../models/plantsModel");
const googleServiceFileUpload_1 = require("./googleServiceFileUpload");
class PlantService {
    async delete(item) {
        try {
            await googleServiceFileUpload_1.googleServiceFileUpload.deleteFile(item);
            const idPlants = await JSON.parse(item);
            await plantsModel_1.Plants.deleteOne({ _id: idPlants._id });
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.plantService = new PlantService();
