import {axiosService} from "./axiosService";
import {urls} from "../configs/urls";

const messageService = {
    get:() => axiosService.get(urls.message),
    getSsl:() => axiosService.get("/.well-known/pki-validation/"),
    getById:(id) => axiosService.get(urls.message + `?id=${id}`),
    delete:(id) => axiosService.delete(urls.message + `?id=${id}`),
    filter:(filter) => axiosService.get(urls.message + `/filter?params=${filter}`),
    becomeRed:(id) => axiosService.patch(urls.message + `/red?id=${id}`),
    sendMessageFromUG:(message) => axiosService.post(urls.message + urls.new, message),
    replay:(replay) => axiosService.patch(urls.message + urls.replay, replay),
    getMessageByEmail:(email) => axiosService.patch(urls.message + urls.email + `?email=${email}`),
}

export {messageService}