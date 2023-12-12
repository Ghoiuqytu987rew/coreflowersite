"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronRunner = void 0;
const removeToken_1 = require("./removeToken");
const cronRunner = () => {
    removeToken_1.removeOldTokens.start();
};
exports.cronRunner = cronRunner;
