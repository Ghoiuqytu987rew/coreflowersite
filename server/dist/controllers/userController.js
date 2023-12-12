"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userModel_1 = require("../models/userModel");
const passwordService_1 = require("../serwices/passwordService");
const userService_1 = require("../serwices/userService");
const tokenModels_1 = require("../models/tokenModels");
const adminModel_1 = require("../models/adminModel");
const tokeAdminModel_1 = require("../models/tokeAdminModel");
const tokenService_1 = require("../serwices/tokenService");
const emailService_1 = require("../serwices/emailService");
class UserController {
    async post(req, res, next) {
        try {
            const user = await req.body;
            const { email, password, name, userName, replayEmail, replayPassword } = user;
            const hashedPassword = await passwordService_1.passwordService.hash(password);
            const emailF = await userModel_1.User.findOne({ email: email });
            const userNameF = await userModel_1.User.findOne({ userName: userName });
            if (emailF || userNameF) {
                return res.json({
                    error: "користувач або емейл вже існує",
                });
            }
            if (email === replayEmail && password === replayPassword) {
                await userModel_1.User.create({
                    name,
                    userName: userName,
                    email: email,
                    password: hashedPassword,
                    activate: 0,
                });
            }
            else if (email != replayEmail || password != replayPassword) {
                return res.json({
                    error: "не співпадає емейл або пароль, повторіть спробу!!",
                });
            }
            const userF = await userModel_1.User.findOne({ email: email });
            await userService_1.userService.activate(userF);
            return res.json({ respons: "Дякую що приєднались до нас!" });
        }
        catch (e) {
            next(e);
        }
    }
    async auth(req, res, next) {
        try {
            const userAuth = await req.body;
            const { email, password } = userAuth;
            const user = await userModel_1.User.findOne({ email: email });
            if (!user) {
                const admin = await adminModel_1.AdminTable.findOne({ email: email });
                if (admin) {
                    const tokenPair = await userService_1.userService.logInAdmin(admin, password);
                    await emailService_1.emailService.sendInForAdmin(`${email}`, tokenPair);
                    return res.json({ message: "ти знаєш що робити" });
                }
                return res.json({ message: "не правильні дані авторизації" });
            }
            const tokenPair = await userService_1.userService.logIn(user, password);
            if (tokenPair === undefined) {
                return res.json({
                    message: "введіть свій емейл та пароль",
                });
            }
            return res.json(tokenPair);
        }
        catch (e) {
            next(e);
        }
    }
    async checkToken(req, res, next) {
        try {
            const { token } = req.query;
            const checkToken = await tokenModels_1.Token.findOne({ accessToken: token });
            if (checkToken) {
                const checkedToken = await tokenService_1.tokenService.checkToken(`${token}`, "access");
                if (!checkedToken) {
                    return res.json({ message: "токен не дійсний!" });
                }
                return res.json({ user: "vereficated" });
            }
            if (!checkToken) {
                const checkedToken = await tokenService_1.tokenService.checkToken(`${token}`, "access");
                if (!checkedToken) {
                    return res.json({ message: "токен не дійсний!" });
                }
                if (checkedToken) {
                    const adminToken = await tokeAdminModel_1.TokenAdmin.findOne({ accessToken: token });
                    if (adminToken !== undefined) {
                        return res.json({ admin: "vereficated" });
                    }
                }
                return res.json({ user: "not_vereficated" });
            }
        }
        catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const { token } = req.query;
            await tokenService_1.tokenService.checkActionToken(`${token}`, "activate");
        }
        catch (e) {
            next(e);
        }
    }
    async checkAdmin(req, res, next) {
        try {
            const { tokenA } = await req.query;
            const checkToken = await tokeAdminModel_1.TokenAdmin.findOne({ accessToken: tokenA });
            if (checkToken !== undefined) {
                const checkedToken = await tokenService_1.tokenService.checkToken(`${tokenA}`, "access");
                if (!checkedToken) {
                    return res.json({ message: "вхід не можливий A!" });
                }
                return res.json({ ATokenA: 1 });
            }
            if (checkToken === undefined || !checkToken) {
                return res.json({ message: "вхід не можливий Б!" });
            }
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { userId } = await req.query;
            const user = await userModel_1.User.findOne({ _id: userId });
            return res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { userId } = req.query;
            await userModel_1.User.deleteOne({ _id: userId });
            return res.json({ message: "користувач був видалений" });
        }
        catch (e) {
            next(e);
        }
    }
    async get(req, res, next) {
        try {
            const user = await userModel_1.User.find();
            return res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async forceActivate(req, res, next) {
        try {
            const body = await req.body;
            await userModel_1.User.updateOne({ _id: body.id }, { activate: 1 });
        }
        catch (e) {
            next(e);
        }
    }
    async forceNoActivate(req, res, next) {
        try {
            const body = await req.body;
            await userModel_1.User.updateOne({ _id: body.id }, { activate: 0 });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
