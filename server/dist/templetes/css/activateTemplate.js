"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
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
                                <h2>адреса: ${order.departmentOfCity.department}</h2>
                                <h2>метод доставки: ${order.deliveryMethod.method}</h2>
                                <h2>метод оплати: ${order.payMethod.method}</h2>
                                <h2>людина котра забирає товар:</h2>
                                
                                <h3>Прізвище: ${order.personWhoWillTAke.lastName}</h3>
                                <h3>Імя: ${order.personWhoWillTAke.FirstName}</h3>
                                <h3>Телефон: ${order.personWhoWillTAke.PhoneNumber}</h3>
                                <h3>Емейл: ${order.personWhoWillTAke.email}</h3>
                                
                                <h2>людина котра замовила товар: ${order.cityString}</h2>
                                <h3>Прізвище: ${order.personWhoOrder.lastName}</h3>
                                <h3>Імя: ${order.personWhoOrder.FirstName}</h3>
                                <h3>Телефон: ${order.personWhoOrder.PhoneNumber}</h3>
                                <h3>Емейл: ${order.personWhoOrder.email}</h3>
                                
                                <h1>Зміст замовлення</h1>
                                <h2>назва: ${order.objectForCard.p.PlantName}</h2>
                                <h1>ціна: ${order.objectForCard.p.price} грн</h1>
                                <img src="${order.objectForCard.p.cropImage}">
                               <h3>Дата замовлення: ${order.objectForCard.p.createdAt}</h3>
                            </div>
                    
                    </body>
                    </html>`;
            return Html;
        }
        catch (e) {
            console.log(e);
        }
    }
    async activate(user) {
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
                              <h2>Доброго дня ${user.name}! Дякуємо за реєстрацію на нашому сайті, для активації натисніть кнопку нижче.</h2>
                              <button href="google.com/">Активувати</button>
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
