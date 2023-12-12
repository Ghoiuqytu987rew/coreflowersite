import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {messageService} from "../../services/messageService";

const initialState = {
    error: null,
    message: null,
    filter:[],
    sendMessage: [],
    replay: [],
    becomeToRed: [],
    setReplay: false,
    byEmail: [],
    SSl: []
}
const getSSl = createAsyncThunk("userSlice/getSSl",async (_, rejectWithValue)=>{
    try{
        const {data} = await messageService.getSsl()
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})



const get = createAsyncThunk("userSlice/get",async (auth, rejectWithValue)=>{
    try{
        const {data} = await messageService.get()
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const delate = createAsyncThunk("userSlice/delate",async (id, rejectWithValue)=>{
    try{
        const {data} = await messageService.delete(id)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const getMessageById = createAsyncThunk("userSlice/getMessageById",async (id, rejectWithValue)=>{
    try{
        const {data} = await messageService.getById(id)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const getByFilter = createAsyncThunk("userSlice/getByFilter",async (filfer, rejectWithValue)=>{
    try{
        const {data} = await messageService.filter(filfer)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const becomeToRed = createAsyncThunk("userSlice/becomeToRed",async (id, rejectWithValue)=>{
    try{
        const {data} = await messageService.becomeRed(id)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const sendMessageUG = createAsyncThunk("userSlice/sendMessageUG",async (message, rejectWithValue)=>{
    try{
        const {data} = await messageService.sendMessageFromUG(message)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const replay = createAsyncThunk("userSlice/replay",async (item, rejectWithValue)=>{
    try{
        const {data} = await messageService.replay(item)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const getMessageByEmail = createAsyncThunk("userSlice/getMessageByEmail",async (email, rejectWithValue)=>{
    try{
        const {data} = await messageService.getMessageByEmail(email)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})


const messageSlice = createSlice({
    name: "messageSlice",
    initialState,
    reducers: {setReplay: (state, action)=>{
        state.setReplay = action.payload
    }},
    extraReducers: builder => builder
        .addCase(get.fulfilled,(state, action)=>{
            state.message = action.payload
        })
        .addCase(getMessageById.fulfilled,(state, action)=>{
            state.message = action.payload
        })
        .addCase(delate.fulfilled,(state, action)=>{
            state.message = action.payload
        })
        .addCase(getByFilter.fulfilled,(state, action)=>{
            state.filter = action.payload
        })
        .addCase(becomeToRed.fulfilled,(state, action)=>{
            state.becomeToRed = action.payload
        })
        .addCase(sendMessageUG.fulfilled,(state, action)=>{
            state.sendMessage = action.payload
        })
        .addCase(replay.fulfilled,(state, action)=>{
            state.replay = action.payload
        })
        .addCase(getMessageByEmail.fulfilled,(state, action)=>{
            state.byEmail = action.payload
        })
        .addCase(getSSl.fulfilled,(state, action)=>{
            state.SSl = action.payload
        })

})

const {reducer: messageReducer, actions:{setReplay}} = messageSlice

const messageActions = {
    get,
    getMessageById,
    delate,
    getByFilter,
    becomeToRed,
    sendMessageUG,
    replay,
    setReplay,
    getMessageByEmail,
    getSSl
}

export {
    messageActions,
    messageReducer
}