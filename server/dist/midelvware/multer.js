"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const tslib_1 = require("tslib");
const multer_1 = tslib_1.__importDefault(require("multer"));
const path = tslib_1.__importStar(require("path"));
exports.storage = {
    storage: multer_1.default.diskStorage({
        destination: path.join(process.cwd(), `/upload`),
        filename: function (req, file, callback) {
            const fileName = `${file.originalname}`;
            callback(null, fileName);
        },
    })
};
