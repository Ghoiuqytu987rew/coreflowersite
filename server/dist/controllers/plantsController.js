"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantsController = void 0;
const tslib_1 = require("tslib");
const plantsModel_1 = require("../models/plantsModel");
const returner_1 = require("../midelvware/returner");
const returnerModel_1 = require("../models/returnerModel");
const searchSerwices_1 = require("../serwices/searchSerwices");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const paginateService_1 = require("../serwices/paginateService");
const plantService_1 = require("../serwices/plantService");
const googleServiceFileUpload_1 = require("../serwices/googleServiceFileUpload");
class PlantsController {
    async post(req, res, next) {
        try {
            await returnerModel_1.ReturnerModel.deleteMany({});
            const info = await req.body;
            await returner_1.returner.returnValue(info);
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async uploadFullImage(req, res, next) {
        try {
            const fileF = await req.file;
            await googleServiceFileUpload_1.googleServiceFileUpload.UploadFullImage(fileF);
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async uploadCropedImage(req, res, next) {
        try {
            const fileC = await req.file;
            await googleServiceFileUpload_1.googleServiceFileUpload.UploadCropedImage(fileC);
        }
        catch (e) {
            next(e);
        }
    }
    async getAll(req, res, next) {
        try {
            const sort = await {};
            const plants = await paginateService_1.paginateService.getPagination(req.query, sort);
            return res.json(plants);
        }
        catch (e) {
            next(e);
        }
    }
    async getForSell(req, res, next) {
        try {
            const sort = await { forSell: 1 };
            const items = await paginateService_1.paginateService.getPagination(req.query, sort);
            return res.json(items);
        }
        catch (e) {
            next(e);
        }
    }
    async search(req, res, next) {
        try {
            await searchSerwices_1.searchSerwices.sortItem(req.query, res);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.query;
            await plantService_1.plantService.delete(id);
            return res.json({ message: "квітка була видалена" });
        }
        catch (e) {
            next(e);
        }
    }
    async changePrice(req, res, next) {
        try {
            const body = req.body;
            await plantsModel_1.Plants.updateOne({ _id: body.id }, { price: body.newPrice });
            return res.send("товар був позначиний на скидки");
        }
        catch (e) {
            next(e);
        }
    }
    async sellStatus(req, res, next) {
        try {
            const body = req.body;
            await plantsModel_1.Plants.updateOne({ _id: body.id }, { forSell: body.sell });
            return res.send("товар був позначиний на скидки");
        }
        catch (e) {
            next(e);
        }
    }
    async have(req, res, next) {
        try {
            const body = req.body;
            await plantsModel_1.Plants.updateOne({ _id: body.id }, { noOnStorage: body.have });
            return res.send("зміни успішні");
        }
        catch (e) {
            next(e);
        }
    }
    async getNewItem(req, res, next) {
        try {
            const dayForStart = (0, dayjs_1.default)().startOf("day").subtract(7, "day").toJSON();
            const sort = await { createdAt: { $gt: dayForStart } };
            const plants = await paginateService_1.paginateService.getPagination(req.query, sort);
            return res.json(plants);
        }
        catch (e) {
            next(e);
        }
    }
    async updateById(req, res, next) {
        try {
            const { plantsId } = req.params;
            const body = req.body;
            const nPlant = await plantsModel_1.Plants.updateOne({ _id: plantsId }, { ...body });
            return res.json({ message: "plant was updated", data: nPlant });
        }
        catch (e) {
            next(e);
        }
    }
    async changeInfo(req, res, next) {
        try {
            const body = req.body;
            await plantsModel_1.Plants.updateOne({ _id: body.id }, {
                PlantName: body.PlantName,
                PlantSub: body.PlantSub,
                about: body.about,
            });
            return res.send("товар був позначиний на скидки");
        }
        catch (e) {
            next(e);
        }
    }
}
exports.plantsController = new PlantsController();
