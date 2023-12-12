import {axiosService} from "./axiosService";
import {urls} from "../configs/urls";
const queryParams = new URLSearchParams(window.location.search)
const token = queryParams.get("token")

const userService = {
    getToken:(auth) => axiosService.post(urls.user + urls.auth + `?token=${token || "0"}`, auth),
    addNewUser:(user) => axiosService.post(urls.user + urls.new, user),
    checkToken:(token) => axiosService.get(urls.user + urls.checkToken + `?token=${token}`),
    checkTokenA:(tokenA) => axiosService.get(urls.user + urls.checkTokenA + `?tokenA=${tokenA}`),
    getAllUsers:(tok) => axiosService.get(urls.user + `?tokenA=${tok}`),
    getUserById:(id) => axiosService.get(urls.user + `/gd?userId=${id}`),
    deleteById:(id) => axiosService.delete(urls.user + `/gd?userId=${id}`),
    forceNoActivate: (data) => axiosService.patch(urls.user + urls.forceNoActivate, data),
    forceActivate: (data) => axiosService.patch(urls.user + urls.forceActivate, data),
}

export {userService}