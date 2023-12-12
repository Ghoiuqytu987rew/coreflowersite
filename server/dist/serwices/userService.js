"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const passwordService_1 = require("./passwordService");
const errors_1 = require("../errors");
const tokenService_1 = require("./tokenService");
const tokenModels_1 = require("../models/tokenModels");
const tokeAdminModel_1 = require("../models/tokeAdminModel");
const emailService_1 = require("./emailService");
class UserService {
    async logIn(user, password) {
        try {
            const isMatched = await passwordService_1.passwordService.compare(password, user.password);
            if (!isMatched) {
                throw new errors_1.ApiError("Invalid email or password", 409);
            }
            const tokenPair = tokenService_1.tokenService.generateTokenPair({
                _id: user._id,
                name: user.name,
            });
            await tokenModels_1.Token.create({
                _user_id: user._id,
                ...tokenPair,
            });
            return tokenPair;
        }
        catch (e) {
            console.log(e);
        }
    }
    async activate(user) {
        try {
            if (!user) {
                throw new errors_1.ApiError("немає такого користувача", 409);
            }
            const activateToken = tokenService_1.tokenService.generateActionToken({
                _id: user._id,
                name: user.name,
            }, "activate");
            await emailService_1.emailService.sendMailActivate(`${user.email}`, activateToken, user);
            await tokenModels_1.TokenActivate.create({
                _user_id: user._id,
                activateToken: activateToken,
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async logInAdmin(user, password) {
        try {
            const isMatched = await passwordService_1.passwordService.compare(password, user.password);
            if (!isMatched) {
                throw new errors_1.ApiError("Invalid email or password", 409);
            }
            const tokenPair = tokenService_1.tokenService.generateTokenPair({
                _id: user._id,
                name: user.name,
            });
            await tokeAdminModel_1.TokenAdmin.create({
                _user_id: user._id,
                ...tokenPair,
            });
            return tokenPair;
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.userService = new UserService();
