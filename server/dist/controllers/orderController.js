"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const orderService_1 = require("../serwices/orderService");
const emailService_1 = require("../serwices/emailService");
const orderModel_1 = require("../models/orderModel");
const configs_1 = require("../configs/configs");
class OrderController {
    async saveOrder(req, res, next) {
        try {
            const order = await req.body;
            await orderService_1.orderService.SaveOrder(order);
            await emailService_1.emailService.sendMail(`${configs_1.configs.NO_REPLY_EMAIL}`, order);
            return res.json("done");
        }
        catch (e) {
            next(e);
        }
    }
    async getAllOrdersForUser(req, res, next) {
        try {
            const { userId } = req.query;
            const ordersByUser = await orderModel_1.Order.find({ userId: userId });
            return res.json({ ordersByUser });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.orderController = new OrderController();
