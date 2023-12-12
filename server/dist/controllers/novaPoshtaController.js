"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.novaPoshtaController = void 0;
const novaposhtajs_1 = require("novaposhtajs");
const configs_1 = require("../configs/configs");
class NovaPoshtaController {
    async getCity(req, res, next) {
        try {
            const { city } = await req.query;
            const apiKey = configs_1.configs.NOVA_POSHTA_API_KAY;
            const novaPoshta = (0, novaposhtajs_1.initNovaPoshta)(apiKey);
            const cities = await novaPoshta.address.getCities({
                findByString: `${city}`,
                page: "1",
                limit: "1000",
            });
            return res.json(cities);
        }
        catch (e) {
            next(e);
        }
    }
    async getDepartments(req, res, next) {
        try {
            const ref = req.query.department;
            const apiKey = configs_1.configs.NOVA_POSHTA_API_KAY;
            const novaPoshta = (0, novaposhtajs_1.initNovaPoshta)(apiKey);
            const warehouse = await novaPoshta.address.getWarehouses({
                cityRef: `${ref}`,
                page: "1",
                limit: "5000",
            });
            return res.json(warehouse);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.novaPoshtaController = new NovaPoshtaController();
