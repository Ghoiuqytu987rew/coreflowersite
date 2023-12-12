import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {plantsReducer} from "./slices/allPlantsSlice";
import {novaPoshtaReducer} from "./slices/novaPoshtaSlice";
import {orderReducer} from "./slices/orderSlice";
import {userReducer} from "./slices/userSlice";
import { messageReducer } from "./slices/messageSlice";

const rootReducer = combineReducers({
    plant: plantsReducer,
    novaPoshta: novaPoshtaReducer,
    order: orderReducer,
    user: userReducer,
    message: messageReducer
})

const setUpStorage = () => configureStore({reducer: rootReducer})

export {
    setUpStorage
}