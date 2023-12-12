import {axiosService} from "./axiosService";
import {urls} from "../configs/urls";

const orderService = {
    sendOrderToEmail:(data) => axiosService.post(urls.order + urls.saveAndSend, data),
    getOrdersByUserId:(id) => axiosService.get(urls.order + urls.getById +`?userId=${id}`)
}

export {orderService}