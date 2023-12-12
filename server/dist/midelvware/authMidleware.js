"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const errors_1 = require("../errors");
const tokenService_1 = require("../serwices/tokenService");
const tokenModels_1 = require("../models/tokenModels");
const tokeAdminModel_1 = require("../models/tokeAdminModel");
const userModel_1 = require("../models/userModel");
const adminModel_1 = require("../models/adminModel");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                throw new errors_1.ApiError("No token", 401);
            }
            const jwtPayload = tokenService_1.tokenService.checkToken(accessToken, "access");
            const tokenInfo = await tokenModels_1.Token.findOne({ accessToken });
            if (!tokenInfo) {
                throw new errors_1.ApiError("Token not valid", 401);
            }
            if (tokenInfo && jwtPayload) {
                next();
            }
        }
        catch (e) {
            next(e);
        }
    }
    async checkAccessTokenForAdmin(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                throw new errors_1.ApiError("No token", 401);
            }
            const jwtPayload = tokenService_1.tokenService.checkToken(accessToken, "access");
            const tokenInfo = await tokeAdminModel_1.TokenAdmin.findOne({ accessToken });
            if (!tokenInfo) {
                throw new errors_1.ApiError("Token not valid", 401);
            }
            if (tokenInfo && jwtPayload) {
                next();
            }
        }
        catch (e) {
            next(e);
        }
    }
    async checkUserActiveOrExit(req, res, next) {
        try {
            const { token } = await req.query;
            const userAuth = await req.body;
            const { email, password } = userAuth;
            if (token === "0") {
                if (email === "" || password === "") {
                    return res.json({ message: "будь-ласка введіть логін та пароль" });
                }
                if (email !== "" && password !== "") {
                    const user = await userModel_1.User.findOne({ email: email });
                    if (user === undefined || !user) {
                        const admin = await adminModel_1.AdminTable.findOne({ email: email });
                        if (admin === undefined || !admin) {
                            return res.json({ message: "не існує такого користувача" });
                        }
                        if (admin) {
                            next();
                        }
                    }
                    if (user.activate !== null) {
                        if (user.activate === 1) {
                            next();
                        }
                        if (user.activate === 0) {
                            return res.json({
                                message: "будь-ласка підтвердіть свою електронну адресу",
                            });
                        }
                    }
                }
            }
            if (token !== "0") {
                const actionToken = await tokenService_1.tokenService.checkActionToken(`${token}`, "activate");
                if (!actionToken) {
                    return res.json({ message: "токен не дійсний!" });
                }
                if (actionToken) {
                    const activateToken = await tokenModels_1.TokenActivate.findOne({
                        activateToken: token,
                    });
                    if (activateToken !== undefined) {
                        await userModel_1.User.updateOne({ _id: activateToken._user_id }, { activate: 1 });
                        next();
                    }
                }
            }
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
