import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {orderService} from "../../services";



const initialState = {
    order: [],
    error: {message: ""},
    deliveryMethod: {},
    payMethod: {},
    personWhoWillTAke: {},
    personWhoOrder: {},
    departmentOfCity: [],
    ordersById: [],
    numberOfBuyMenu: 1,
    newPostShow: 0,
    adresNoNP:[],
    orderIsDone: false
}

const sendOrderToEmail = createAsyncThunk("orderSlice/sendOrderToEmail",async (data, rejectWithValue)=>{
    try{
        await orderService.sendOrderToEmail(data)
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const getOrdersByUserId = createAsyncThunk("orderSlice/getOrdersByUserId",async (id, rejectWithValue)=>{
    try{
        const {data} = await orderService.getOrdersByUserId(id)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const orderSlice = createSlice({
    name: "sendEmailSlice",
    initialState,
    reducers: {
        deliveryMethod: (state, action)=>{
            state.deliveryMethod = action.payload
        },
        payMethod: (state, action)=>{
            state.payMethod = action.payload},
        personWhoWillTAke: (state, action)=>{
            state.personWhoWillTAke = action.payload
        },
        personWhoOrder:(state, action)=>{
            state.personWhoOrder = action.payload
        },
        departmentOfCity:(state, action)=>{
            state.departmentOfCity = action.payload
        },
        chengeNumberOfBuyMenu:(state, action)=>{
            state.numberOfBuyMenu = action.payload
        },
        newPostShow:(state, action)=>{
            state.newPostShow = action.payload
        },
        adressNoNP:(state, action)=>{
            state.adresNoNP = action.payload
        },
        orderDone:(state, action)=>{
            state.orderIsDone = action.payload
        },
        error:(state, action)=>{
            state.error = action.payload
        }
    },
    extraReducers: builder => builder
        .addCase(sendOrderToEmail.fulfilled,(state, action)=>{
            state.order = action.payload
        })
        .addCase(getOrdersByUserId.fulfilled,(state, action)=>{
            state.ordersById = action.payload
        })
})

const {reducer: orderReducer, actions: {error ,orderDone, adressNoNP, deliveryMethod, payMethod, personWhoWillTAke, personWhoOrder, departmentOfCity, chengeNumberOfBuyMenu, newPostShow}} = orderSlice

const orderActions = {
   sendOrderToEmail,
    deliveryMethod,
    payMethod,
    personWhoWillTAke,
    personWhoOrder,
    departmentOfCity,
    getOrdersByUserId,
    chengeNumberOfBuyMenu,
    newPostShow,
    adressNoNP,
    orderDone,
    error
}

export {
    orderActions,
    orderReducer
}