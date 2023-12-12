"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const email_templates_1 = tslib_1.__importDefault(require("email-templates"));
const path = tslib_1.__importStar(require("path"));
const template_1 = require("../templetes/template");
const configs_1 = require("../configs/configs");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            secure: false,
            service: configs_1.configs.EMAIL_SERVICE,
            auth: {
                user: configs_1.configs.NO_REPLY_EMAIL,
                pass: configs_1.configs.NO_REPLY_EMAIL_PASSWORD,
            },
        });
        this.templateParser = new email_templates_1.default({
            views: {
                root: path.join(process.cwd(), "dist", "templetes"),
                options: {
                    extension: "hbs",
                },
            },
            juice: true,
            juiceResources: {
                webResources: {
                    relativeTo: path.join(process.cwd(), "dist", "templetes", "css"),
                },
            },
        });
    }
    async sendMail(email, order) {
        const Html = await template_1.template.getHtml(order);
        return this.transporter.sendMail({
            from: "service",
            to: email,
            subject: "Nev Order",
            html: Html,
        });
    }
    async sendMailActivate(email, activateToken, user) {
        const Html = await template_1.template.activate(activateToken, user);
        return this.transporter.sendMail({
            from: "service",
            to: email,
            subject: "activation",
            html: Html,
        });
    }
    async sendInForAdmin(email, tokenPair) {
        const Html = await template_1.template.inToSite(tokenPair);
        return this.transporter.sendMail({
            from: "system",
            to: email,
            subject: "logIn",
            html: Html,
        });
    }
    async sendMessageFromUserToAdmin(email, message, user) {
        const Html = await template_1.template.sendMessageToAdmin(message, user);
        return this.transporter.sendMail({
            from: `${user.name}`,
            to: email,
            subject: "userMessage",
            html: Html,
        });
    }
    async sendMessageFromGuestToAdmin(email, message, guestEmail) {
        const Html = await template_1.template.sendMessageGuestToAdmin(message, guestEmail);
        return this.transporter.sendMail({
            from: "Guest",
            to: email,
            subject: "userMessage",
            html: Html,
        });
    }
}
exports.emailService = new EmailService();
