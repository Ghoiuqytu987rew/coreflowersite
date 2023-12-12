"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const tslib_1 = require("tslib");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const configs_1 = require("../configs/configs");
class Template {
    async getHtml(order) {
        try {
            const Html = `<!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport"
                              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Document</title>
                        <link rel="stylesheet" href="style.css">
                    </head>
                    <body>
                            <div class="HBS">
                                <h1>Нове замовлення</h1>
                                <h2>користувач: ${order.userId}</h2>
                                <h2>місто: ${order.cityString}</h2>
                                <h2>адреса: ${order.departmentOfCity}</h2>
                                <h2>метод доставки: ${order.deliveryMethod.method}</h2>
                                <h2>метод оплати: ${order.payMethod.method}</h2>
                                <hr/>
                                <h2>людина котра забирає товар:</h2>
                                <h3>Прізвище: ${order.personWhoWillTAke.lastName}</h3>
                                <h3>Імя: ${order.personWhoWillTAke.FirstName}</h3>
                                <h3>Телефон: ${order.personWhoWillTAke.PhoneNumber}</h3>
                                <h3>Емейл: ${order.personWhoWillTAke.email}</h3>
                                <hr/>
                                <h2>людина котра замовила товар:</h2>
                                <h3>Прізвище: ${order.personWhoOrder.lastName}</h3>
                                <h3>Імя: ${order.personWhoOrder.FirstName}</h3>
                                <h3>Телефон: ${order.personWhoOrder.PhoneNumber}</h3>
                                <h3>Емейл: ${order.personWhoOrder.email}</h3>
                                <hr/>
                                <h1>Зміст замовлення</h1>
                                <h2>назва: ${order.objectForCard.PlantName}</h2>
                                <h1>ціна: ${order.objectForCard.price} грн</h1>
                                <img src="${order.objectForCard.cropImage}">
                               <h3>Дата замовлення:${(0, dayjs_1.default)().get("date")}</h3>
                            </div>
                    
                    </body>
                    </html>`;
            return Html;
        }
        catch (e) {
            console.log(e);
        }
    }
    async activate(token, user) {
        try {
            const Html = `<!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport"
                              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Document</title>
                        <link rel="stylesheet" href="style.css">
                        <style>
                                .HBS{
                                  display: flex;
                                  justify-content: center;
                                  align-items: center;
                                  flex-wrap: wrap;
                                }
                                  .divBtn{
                                  width: 100%;
                                  display: flex;
                                  justify-content: center;
                                  align-items: center;
                                }
                                button {
                                justify-content: center;
                                align-items: center;
                                  background-color: green;
                                  color: white;
                                  padding: 14px 25px;
                                  text-align: center;
                                  text-decoration: none;
                                  display: inline-block;
                                  border-radius: 30px;
                                  border: solid black 1px;
                                  height: 50px;
                                  width: 120px;    
                                }
                                button:hover, button:active {
                                  background-color: blueviolet;
                                  transition: 2s;
                                }
                        </style>
                    </head>
                    <body>
                            <div class="HBS">
                              <h2>Доброго дня ${user.name}! Дякуємо за реєстрацію на нашому сайті, для активації натисніть кнопку нижче.</h2>
                                
                                <divclass="divBtn">
                                <a href="${configs_1.configs.FRONT_URL}/message/?token=${token}" target="activate">
                                <button>Активувати</button>
                                </a>
                                </div>
                            </div>
                    
                    </body>
                    </html>`;
            return Html;
        }
        catch (e) {
            console.log(e);
        }
    }
    async inToSite(token) {
        try {
            const Html = `<!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport"
                              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Document</title>
                        <link rel="stylesheet" href="style.css">
                        <style>
                                button {
                                  background-color: green;
                                  color: white;
                                  padding: 14px 25px;
                                  text-align: center;
                                  text-decoration: none;
                                  display: inline-block;
                                  border-radius: 30px;
                                  border: solid black 1px;
                                  height: 50px;
                                  width: 100px;
                                 
                                }
                                
                                button:hover, button:active {
                                  background-color: blueviolet;
                                  transition: 2s;
                                }
                        </style>
                    </head>
                    <body>
                            <div class="HBS">
                              <h2>Вхід на сайт</h2>
          
                                <a href="${configs_1.configs.FRONT_URL}/admin/?token=${token.accessToken}" target="activate">
                                <button>Вхід</button>
                                </a>
                            </div>
                    
                    </body>
                    </html>`;
            return Html;
        }
        catch (e) {
            console.log(e);
        }
    }
    async sendMessageToAdmin(message, user) {
        try {
            const Html = `<!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport"
                              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Document</title>
                        <link rel="stylesheet" href="style.css">
                        <style>
                               
                        </style>
                    </head>
                    <body>
                            <div class="HBS">
                              <h2>Нове повідомлення від ${user.name}</h2>
                              <h2>імя користувача ${user.userName}</h2>
                              <h3>id користувача ${user._id} </h3>
                              <h3>емейл ${user.email} </h3>
                              <hr>
          
                              <h3>${message}</h3>
                            </div>
                    
                    </body>
                    </html>`;
            return Html;
        }
        catch (e) {
            console.log(e);
        }
    }
    async sendMessageGuestToAdmin(message, email) {
        try {
            const Html = `<!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport"
                              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Document</title>
                        <link rel="stylesheet" href="style.css">
                        <style>
                               
                        </style>
                    </head>
                    <body>
                            <div class="HBS">
                              <h2>Нове повідомлення від Гостя</h2>
                              <h3>емейл ${email} </h3>
                              <hr>
          
                              <h3>${message}</h3>
                            </div>
                    
                    </body>
                    </html>`;
            return Html;
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.template = new Template();
