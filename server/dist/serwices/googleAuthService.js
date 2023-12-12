"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthService = void 0;
const tslib_1 = require("tslib");
const qs_1 = tslib_1.__importDefault(require("qs"));
const config_1 = tslib_1.__importDefault(require("config"));
const axios_1 = tslib_1.__importDefault(require("axios"));
class GoogleAuthService {
    async getGoogleOAuthTokens(res, { code, }) {
        const url = "https://oauth2.googleapis.com/token";
        const values = {
            code,
            client_id: config_1.default.get("googleClientId"),
            client_secret: config_1.default.get("googleClientSecret"),
            redirect_uri: config_1.default.get("googleOauthRedirectUrl"),
            grant_type: "authorization_code",
        };
        try {
            const res = await axios_1.default.post(url, qs_1.default.stringify(values), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return res.data;
        }
        catch (error) {
            console.error(error.response.data.error);
            throw new Error(error.message);
        }
    }
}
exports.googleAuthService = new GoogleAuthService();
