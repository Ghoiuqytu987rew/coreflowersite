"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleServiceFileUpload = void 0;
const tslib_1 = require("tslib");
const plantsModel_1 = require("../models/plantsModel");
const returnerModel_1 = require("../models/returnerModel");
const fs = tslib_1.__importStar(require("fs"));
const googleapis_1 = require("googleapis");
const path = tslib_1.__importStar(require("path"));
const uuid_1 = require("uuid");
const configs_1 = require("../configs/configs");
class GoogleServiceFileUpload {
    async UploadFullImage(file) {
        async function uploadFile() {
            try {
                const GOOGLE_API_FOLDER_ID = "1XQyNHfAveU6Tr4qSvjEGqueUWs7MleKj";
                const uuidv4 = (0, uuid_1.v4)();
                const auth = new googleapis_1.google.auth.GoogleAuth({
                    keyFile: `${configs_1.configs.BUCKET_GOOGLE_SERVICE_FILE}`,
                    scopes: ["https://www.googleapis.com/auth/drive"],
                });
                const driveService = await googleapis_1.google.drive({
                    version: "v3",
                    auth,
                });
                const fileMetaData = {
                    name: `${uuidv4}.jpg`,
                    parents: [GOOGLE_API_FOLDER_ID],
                };
                const media = {
                    mimeType: "image/jpg",
                    body: await fs.createReadStream(path.join(process.cwd(), `/upload/${file.originalname}`)),
                };
                const response = await driveService.files.create({
                    resource: fileMetaData,
                    media: media,
                    field: "id",
                });
                await returnerModel_1.ReturnerModel.create({
                    image: `https://drive.google.com/uc?export=view&id=${response.data.id}`,
                });
                return response.data.id;
            }
            catch (err) {
                console.log("Upload file error", err);
            }
        }
        await uploadFile();
        await fs.unlinkSync(path.join(process.cwd(), `/upload/${file.originalname}`));
    }
    async UploadCropedImage(file) {
        async function uploadFile() {
            try {
                const GOOGLE_API_FOLDER_ID = "1XQyNHfAveU6Tr4qSvjEGqueUWs7MleKj";
                const uuidv4 = (0, uuid_1.v4)();
                const auth = new googleapis_1.google.auth.GoogleAuth({
                    keyFile: `${configs_1.configs.BUCKET_GOOGLE_SERVICE_FILE}`,
                    scopes: ["https://www.googleapis.com/auth/drive"],
                });
                const driveService = await googleapis_1.google.drive({
                    version: "v3",
                    auth,
                });
                const fileMetaData = {
                    name: `${uuidv4}.jpg`,
                    parents: [GOOGLE_API_FOLDER_ID],
                };
                const media = {
                    mimeType: "image/jpg",
                    body: await fs.createReadStream(path.join(process.cwd(), `/upload/${file.originalname}`)),
                };
                const response = await driveService.files.create({
                    resource: fileMetaData,
                    media: media,
                    field: "id",
                });
                const returner = await returnerModel_1.ReturnerModel.find();
                await plantsModel_1.Plants.create({
                    ...returner[0].value,
                    fullImage: returner[1].image,
                    cropImage: `https://drive.google.com/uc?export=view&id=${response.data.id}`,
                });
                return await response.data.id;
            }
            catch (err) {
                console.log("Upload file error", err);
            }
        }
        await uploadFile();
        await fs.unlinkSync(path.join(process.cwd(), `/upload/${file.originalname}`));
    }
    async deleteFile(file) {
        const fileArr = await JSON.parse(file);
        const fullImage = fileArr.fullImage.split(",")[1];
        const cropImage = fileArr.cropImage.split(",")[1];
        async function deleteFileR(full, crop) {
            try {
                const auth = new googleapis_1.google.auth.GoogleAuth({
                    keyFile: `${configs_1.configs.BUCKET_GOOGLE_SERVICE_FILE}`,
                    scopes: ["https://www.googleapis.com/auth/drive"],
                });
                const driveService = await googleapis_1.google.drive({
                    version: "v3",
                    auth,
                });
                await driveService.files.delete({
                    fileId: `${full}`,
                });
                await driveService.files.delete({
                    fileId: `${crop}`,
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        await deleteFileR(fullImage, cropImage);
    }
}
exports.googleServiceFileUpload = new GoogleServiceFileUpload();
