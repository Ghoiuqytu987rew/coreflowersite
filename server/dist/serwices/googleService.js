"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleService = void 0;
const tslib_1 = require("tslib");
const storage_1 = require("@google-cloud/storage");
const path = tslib_1.__importStar(require("path"));
const configs_1 = require("../configs/configs");
class GoogleService {
    async deleteImage(links) {
        try {
            const namesObj = JSON.parse(links);
            const fullImage = namesObj.fullImage.split("/")[4];
            const cropImage = namesObj.cropImage.split("/")[4];
            const storage = new storage_1.Storage({
                keyFilename: path.join(process.cwd(), `${configs_1.configs.BUCKET_GOOGLE_SERVICE_FILE}`),
            });
            const bucketName = `${configs_1.configs.BUCKET_GOOGLE_SERVICE_NAME}`;
            await storage.bucket(bucketName).file(fullImage).delete();
            await storage.bucket(bucketName).file(cropImage).delete();
        }
        catch (err) {
            console.log("Upload file error", err);
        }
    }
}
exports.googleService = new GoogleService();
