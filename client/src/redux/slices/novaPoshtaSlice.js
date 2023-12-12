import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {novaPoshtaService} from "../../services/novaPoshtaService";


const initialState = {
    city: [],
    department: [],
    error: null,
    cityString: "",
    departmenString: ""
}

const getCity = createAsyncThunk("novaPoshtaSlice/getCity",async (city, rejectWithValue)=>{
    try{
       const {data} = await novaPoshtaService.getCity(city)
       return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const getDepartment = createAsyncThunk("novaPoshtaSlice/getDepartment", async (department, rejectWithValue)=>{
    try{
        const {data} = await novaPoshtaService.getDepartment(department)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const novaPoshtaSlice = createSlice({
    name: "novaPoshtaSlice",
    initialState,
    reducers: {
        cityString: (state, action)=>{
            state.cityString = action.payload
        },
        departmentString: (state, action)=>{
            state.departmenString = action.payload}
    },
    extraReducers: builder => builder
        .addCase(getCity.fulfilled,(state, action)=>{
        state.city = action.payload
    })
        .addCase(getDepartment.fulfilled, (state, action)=>{
            state.department = action.payload
        })
})

const {reducer: novaPoshtaReducer, actions: {cityString, departmentString }} = novaPoshtaSlice

const novaPoshtaActions = {
    getDepartment,
    getCity,
    cityString,
    departmentString
}

export {
    novaPoshtaActions,
    novaPoshtaReducer
}