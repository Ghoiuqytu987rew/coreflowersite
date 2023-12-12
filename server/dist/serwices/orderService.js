"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const orderModel_1 = require("../models/orderModel");
class OrderService {
    async SaveOrder(order) {
        try {
            await orderModel_1.Order.create({
                userId: order.userId,
                city: order.cityString,
                adress: order.departmentOfCity,
                deliveryMethod: order.deliveryMethod.method,
                payMethod: order.payMethod.method,
                personWhoOrder: order.personWhoOrder,
                personWhoWillTAke: order.personWhoWillTAke,
                order: order.objectForCard,
            });
        }
        catch (e) {
            console.log(`ERORRRRR ${e}`);
        }
    }
    async getAllOrdersByUserId(userId) {
        try {
            return await orderModel_1.Order.find({ userId: userId });
        }
        catch (e) {
            console.log(`ERORRRRR ${e}`);
        }
    }
}
exports.orderService = new OrderService();
