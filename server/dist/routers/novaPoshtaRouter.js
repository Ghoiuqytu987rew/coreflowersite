"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NovaPoshtaRouter = void 0;
const express_1 = require("express");
const novaPoshtaController_1 = require("../controllers/novaPoshtaController");
const router = (0, express_1.Router)();
router.get("/city", novaPoshtaController_1.novaPoshtaController.getCity);
router.get("/department", novaPoshtaController_1.novaPoshtaController.getDepartments);
exports.NovaPoshtaRouter = router;
