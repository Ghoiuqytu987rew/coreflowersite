"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
router.post("/save", orderController_1.orderController.saveOrder);
router.get("/getById", orderController_1.orderController.getAllOrdersForUser);
exports.OrderRouter = router;
