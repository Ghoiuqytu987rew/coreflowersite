"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const messageModel_1 = require("../models/messageModel");
const messageService_1 = require("../serwices/messageService");
class MessageController {
    async newMessage(req, res, next) {
        try {
            const message = await req.body;
            await messageService_1.messageService.newMessage(message);
            return res.send("повідомлення було надіслане");
        }
        catch (e) {
            next(e);
        }
    }
    async get(req, res, next) {
        try {
            const message = await messageModel_1.Message.find().sort({ createdAt: -1 });
            return res.json(message);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.query;
            const message = await messageModel_1.Message.find({ _user_id: id });
            return res.json(message);
        }
        catch (e) {
            next(e);
        }
    }
    async messageFilter(req, res, next) {
        try {
            const { params } = await req.query;
            const message = await messageModel_1.Message.find({ red: params });
            return res.json(message);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.query;
            await messageModel_1.Message.deleteOne({ _id: id });
            return res.send("повідомлення видалено");
        }
        catch (e) {
            next(e);
        }
    }
    async becomeToRed(req, res, next) {
        try {
            const { id } = req.query;
            await messageModel_1.Message.updateOne({ _id: id }, { red: 1 });
            return res.send(id);
        }
        catch (e) {
            next(e);
        }
    }
    async replay(req, res, next) {
        try {
            const replay = await req.body;
            await messageModel_1.Message.updateOne({ _id: replay.id }, { messageA: replay.message });
        }
        catch (e) {
            next(e);
        }
    }
    async getMessageByEmail(req, res, next) {
        try {
            const { email } = await req.query;
            const messages = await messageModel_1.Message.find({ email: email });
            return res.json(messages);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.messageController = new MessageController();
