"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const errors_1 = require("../errors");
const configs_1 = require("../configs/configs");
class TokenService {
    generateTokenPair(payload) {
        const accessToken = jwt.sign(payload, `${configs_1.configs.ACCESS_SECRET}`, {
            expiresIn: "1d",
        });
        const refreshToken = jwt.sign(payload, `${configs_1.configs.REFRESH_SECRET}`, {
            expiresIn: "30d",
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    checkToken(token, tokenType) {
        try {
            let secret = "";
            switch (tokenType) {
                case "access":
                    secret = `${configs_1.configs.ACCESS_SECRET}`;
                    break;
                case "refresh":
                    secret = `${configs_1.configs.REFRESH_SECRET}`;
                    break;
            }
            return jwt.verify(token, secret);
        }
        catch (e) {
            throw new errors_1.ApiError("Token not valid", 401);
        }
    }
    generateActionToken(payload, tokenType) {
        let secret = "";
        switch (tokenType) {
            case "activate":
                secret = `${configs_1.configs.ACTIVATE_SECRET}`;
                break;
            case "forgot":
                secret = `${configs_1.configs.FORGOT_SECRET}`;
                break;
        }
        return jwt.sign(payload, secret, { expiresIn: "7d" });
    }
    checkActionToken(token, tokenType) {
        try {
            let secret = "";
            switch (tokenType) {
                case "forgot":
                    secret = `${configs_1.configs.FORGOT_SECRET}`;
                    break;
                case "activate":
                    secret = `${configs_1.configs.ACTIVATE_SECRET}`;
                    break;
            }
            return jwt.verify(token, secret);
        }
        catch (e) {
            throw new errors_1.ApiError("Token not valid", 401);
        }
    }
}
exports.tokenService = new TokenService();
