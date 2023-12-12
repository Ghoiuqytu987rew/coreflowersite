"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordService = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
class PasswordService {
    async hash(password) {
        return bcrypt_1.default.hash(password, 10);
    }
    async compare(password, hashedPassword) {
        return bcrypt_1.default.compare(password, hashedPassword);
    }
}
exports.passwordService = new PasswordService();
