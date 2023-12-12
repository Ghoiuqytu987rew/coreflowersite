"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageService = void 0;
const emailService_1 = require("./emailService");
const messageModel_1 = require("../models/messageModel");
const userModel_1 = require("../models/userModel");
const configs_1 = require("../configs/configs");
class MessageService {
    async newMessage(message) {
        try {
            await messageModel_1.Message.create({ ...message });
            if (message.isUser === 1) {
                const user = await userModel_1.User.findOne({ email: message.email });
                await emailService_1.emailService.sendMessageFromUserToAdmin(`${configs_1.configs.NO_REPLY_EMAIL}`, `${message.messageU}`, user);
            }
            if (message.isUser === 0) {
                await emailService_1.emailService.sendMessageFromGuestToAdmin(`${configs_1.configs.NO_REPLY_EMAIL}`, `${message.messageU}`, `${message.email}`);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.messageService = new MessageService();
