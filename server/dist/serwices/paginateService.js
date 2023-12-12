"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateService = void 0;
const plantsModel_1 = require("../models/plantsModel");
class PaginateService {
    async getPlantPagination(query) {
        try {
            const queryStr = JSON.stringify(query);
            const queryObj = JSON.parse(queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`));
            const { page = 1, limit = 8, sortedBy = "createdAt", ...searchObject } = queryObj;
            const skip = limit * (page - 1);
            const plants = await plantsModel_1.Plants.find(searchObject)
                .limit(limit)
                .skip(skip)
                .sort(sortedBy)
                .lean();
            const totalCount = await plantsModel_1.Plants.count();
            return {
                page: +page,
                totalPage: totalCount / limit,
                perPage: +limit,
                data: plants,
            };
        }
        catch (e) {
            console.log(e);
        }
    }
    async getPagination(query, find) {
        try {
            const queryStr = JSON.stringify(query);
            const queryObj = JSON.parse(queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`));
            const { page = 1, limit = 8, sortedBy = { createdAt: -1 } } = queryObj;
            const skip = limit * (page - 1);
            const item = await plantsModel_1.Plants.find(find);
            const totalCount = await item.length;
            const plants = await plantsModel_1.Plants.find(find).limit(limit)
                .skip(skip)
                .sort(sortedBy)
                .lean();
            return {
                page: +page,
                totalPage: totalCount / limit,
                perPage: +limit,
                data: plants,
            };
        }
        catch (e) {
            console.log(e);
        }
    }
    async getPaginationSort(query, find, sort) {
        try {
            const queryStr = JSON.stringify(query);
            const queryObj = JSON.parse(queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`));
            const { page = 1, limit = 8, sortedBy = { createdAt: -1 } } = queryObj;
            const skip = limit * (page - 1);
            const item = await plantsModel_1.Plants.find(find);
            const totalCount = await item.length;
            const plants = await plantsModel_1.Plants.find(find).limit(limit)
                .skip(skip)
                .sort(sortedBy)
                .lean();
            return {
                page: +page,
                totalPage: totalCount / limit,
                perPage: +limit,
                itemsFound: totalCount,
                data: plants,
            };
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.paginateService = new PaginateService();
