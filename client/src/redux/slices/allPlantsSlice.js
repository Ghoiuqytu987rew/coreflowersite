import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {plantsApiService} from "../../services";

const initialState = {
    plants: [],
    error: null,
    dataPlant: {},
    objectForCard: {},
    search: [],
    serchName: [],
    searchWithFilter: [],
    newItem: [],
    homeI: [],
    have: null,
    newPrice: [],
    forSell: [],
    editInfo: [],
    editInfoForm: false
}

const getAll = createAsyncThunk(
    "allPlantsSlice/getAll", async (page ,rejectWithValue)=>{
        try {
            const {data} = await plantsApiService.getAll(page)
            return data
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const getForSell = createAsyncThunk(
    "allPlantsSlice/getForSell", async (page ,rejectWithValue)=>{
        try {
            const {data} = await plantsApiService.getForSell(page)
            return data
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const sellStatus = createAsyncThunk(
    "allPlantsSlice/sellStatus", async (dataN, rejectWithValue)=>{
        try {
            const {data} = await plantsApiService.sellStatus(dataN)
            return data
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const getNewItem = createAsyncThunk(
    "allPlantsSlice/getNewItem", async (page, rejectWithValue)=>{
        try {
            const {data} = await plantsApiService.newItems(page)
            return data
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const home = createAsyncThunk(
    "allPlantsSlice/home", async (name, rejectWithValue)=>{
        try {
            const {data} = await plantsApiService.search(name)
            return data
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const search = createAsyncThunk(
    "allPlantsSlice/search", async (name,rejectWithValue)=>{
        try {
            const {data} = await plantsApiService.search(name)
            return data
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const searchWithFilter = createAsyncThunk(
    "allPlantsSlice/searchWithFilter", async (name,rejectWithValue)=>{
        try {
            const {data} = await plantsApiService.searchWithFilters(name)
            return data
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const post = createAsyncThunk(
    "allPlantsSlice/post", async (data,rejectWithValue)=>{
        try {
            await plantsApiService.post(data)
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const getOneById = createAsyncThunk(
    "allPlantsSlice/getOneById", async (id,rejectWithValue)=>{
        try {
            const {data} = await plantsApiService.getOneById(id)
            return data
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const updateOneById = createAsyncThunk(
    "allPlantsSlice/updateOneById", async (id,rejectWithValue)=>{
        try {
            const {data} =  await plantsApiService.updateOne(id)
            return data
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const changePrice = createAsyncThunk(
    "allPlantsSlice/changePrice", async (newPrice, rejectWithValue)=>{
        try {
            const {data} =  await plantsApiService.changePrice(newPrice)
            return data
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const have = createAsyncThunk(
    "allPlantsSlice/have", async (dataH, rejectWithValue)=>{
        try {
            const {data} =  await plantsApiService.have(dataH)
            return data
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const deleteOne = createAsyncThunk(
    "allPlantsSlice/deleteOne", async (id,rejectWithValue)=>{
        try {
            await plantsApiService.deleteOne(id)
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const uploadFullSizePicture = createAsyncThunk(
    "allPlantsSlice/uploadFullSizePicture", async (image, rejectWithValue)=>{
        try {
            await plantsApiService.uploadFullSizePicture(image)
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)
const uploadCropPicture = createAsyncThunk(
    "allPlantsSlice/uploadCropPicture", async (image, rejectWithValue)=>{
        try {
            await plantsApiService.uploadCropPicture(image)
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const editInfo = createAsyncThunk(
    "allPlantsSlice/editInfo", async (data,rejectWithValue)=>{
        try {
            await plantsApiService.changeInfo(data)
        }catch (e) {
            return  rejectWithValue(e.response.data)
        }
    }
)

const plantsSlice = createSlice({
    name: "plantsSlice",
    initialState,
    reducers:{
        moveCropedFile: (state, action) => {
            state.dataPlant = action.payload
        },
        objectCard: (state, action) => {
            state.objectForCard = action.payload
        },
        searchName: (state, action) => {
            state.serchName = action.payload
        },
        buttonFormChange: (state, action) => {
            state.editInfoForm = action.payload
        }
    },
    extraReducers: builder => builder.addCase(getAll.fulfilled, (state, action)=>
    {state.plants = action.payload})
        .addCase(post.fulfilled, (state, action)=>
    {state.plants = action.payload})
        .addCase(getOneById.fulfilled, (state, action)=>
        {state.plants = action.payload})
        .addCase(updateOneById.fulfilled, (state, action)=>
        {state.plants = action.payload})
        .addCase(deleteOne.fulfilled, (state, action)=>
        {state.plants = action.payload})
        .addCase(uploadFullSizePicture.fulfilled, (state, action)=>
        {state.plants = action.payload})
        .addCase(uploadCropPicture.fulfilled, (state, action)=>
        {state.plants = action.payload})
        .addCase(search.fulfilled, (state, action)=>
        {state.search = action.payload})
        .addCase(searchWithFilter.fulfilled, (state, action)=>
        {state.searchWithFilter = action.payload})
        .addCase(sellStatus.fulfilled, (state, action)=>
        {state.sellStatus = action.payload})
        .addCase(getNewItem.fulfilled, (state, action)=>
        {state.newItem = action.payload})
        .addCase(home.fulfilled, (state, action)=>
        {state.homeI = action.payload})
        .addCase(have.fulfilled, (state, action)=>
        {state.have = action.payload})
        .addCase(changePrice.fulfilled, (state, action)=>
        {state.newPrice = action.payload})
        .addCase(getForSell.fulfilled, (state, action)=>
        {state.forSell = action.payload})
        .addCase(editInfo.fulfilled, (state, action)=>
        {state.editInfo = action.payload})
})

const {reducer: plantsReducer,actions:{moveCropedFile, objectCard, searchName, buttonFormChange}} = plantsSlice

const plantsActions = {
    getAll,
    post,
    getOneById,
    updateOneById,
    deleteOne,
    uploadFullSizePicture,
    uploadCropPicture,
    search,
    objectCard,
    moveCropedFile,
    searchName,
    searchWithFilter,
    getNewItem,
    home,
    sellStatus,
    changePrice,
    have,
    getForSell,
    editInfo,
    buttonFormChange
}

export {
plantsActions,
    plantsReducer
}