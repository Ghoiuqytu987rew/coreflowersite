import {axiosService} from "./axiosService";
import {urls} from "../configs/urls";

const plantsApiService = {
  getAll:(page)=>axiosService.get(urls.plants + `/?page=${page}`),
  search:(name)=>axiosService.get(urls.plants + urls.searchResult + `?name=${name}`),
  searchWithFilters:(name)=>axiosService.get(urls.plants + urls.searchResult + `?name=${name}`),
  post: (data)=> axiosService.post(urls.plants + urls.post, data),
  getOneById: (id) => axiosService.get(urls.plants +`/${id}`),
  deleteOne: (id) => axiosService.delete(urls.plants +`?id=${id}`),
  changePrice: (newPrice) => axiosService.patch(urls.plants + urls.changePrice, newPrice),
  have: (data) => axiosService.patch(urls.plants + urls.have, data),
  sellStatus: (data) => axiosService.patch(urls.plants + urls.sellStatus, data),
  newItems: (page) => axiosService.get(urls.plants + urls.newItems + `/?page=${page}`),
  updateOne: (id) => axiosService.put(urls.plants +`/${id}`),
  uploadFullSizePicture: (image) => axiosService.post(urls.plants + urls.uploadFull, image),
  uploadCropPicture: (image) => axiosService.post(urls.plants + urls.uploadCrop, image),
  getForSell: (page) => axiosService.get(urls.plants + urls.getForSell + `/?page=${page}`),
  changeInfo: (data)=> axiosService.patch(urls.plants + urls.change, data),
}

export {plantsApiService}