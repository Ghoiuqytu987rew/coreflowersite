import {axiosService} from "./axiosService";
import {urls} from "../configs/urls";

const novaPoshtaService = {
    getCity: (city) => axiosService.get(urls.novaPoshta + urls.city + `?city=${city}`),
    getDepartment: (department) =>  axiosService.get(urls.novaPoshta + urls.department + `?department=${department}`),
}

export {novaPoshtaService}