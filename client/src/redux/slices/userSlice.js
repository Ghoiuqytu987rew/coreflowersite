import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../../services/userService";



const initialState = {
    checkToken: null,
    auth: [],
    user: [],
    token: localStorage.getItem("accessToken"),
    error: null,
    logIn: true,
    userShow: false,
    userById: [],
    admin: false,
    TokenA: [],
    delete: null,
    allUsers: [],
    userByIdShow: false
}

const getToken = createAsyncThunk("userSlice/getToken",async (auth, rejectWithValue)=>{
    try{
        const {data} = await userService.getToken(auth)
        if(data.accessToken !== (null || undefined)){
            localStorage.setItem("accessToken", data.accessToken)
        }
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const checkToken = createAsyncThunk("userSlice/checkToken",async (h, rejectWithValue)=>{
    try{
        const {data} = await userService.checkToken(h)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const checkTokenA = createAsyncThunk("userSlice/checkTokenA",async (tokenA, rejectWithValue)=>{
    try{
        const {data} = await userService.checkTokenA(tokenA)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const addNewUser = createAsyncThunk("userSlice/addNewUser",async (user, rejectWithValue)=>{
    try{
        const {data} = await userService.addNewUser(user)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const getUserById = createAsyncThunk("userSlice/getUserById",async (id, rejectWithValue)=>{
    try{
        const {data} = await userService.getUserById(id)
        localStorage.setItem("email", data.email )
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const getAllUsers = createAsyncThunk("userSlice/getAllUsers",async (_, rejectWithValue)=>{
    try{
        const {data} = await userService.getAllUsers()
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const deleteU = createAsyncThunk("userSlice/deleteU",async (id, rejectWithValue)=>{
    try{
        const {data} = await userService.deleteById(id)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const forceAct = createAsyncThunk("userSlice/forceAct",async (item, rejectWithValue)=>{
    try{
        const {data} = await userService.forceActivate(item)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const forceNoAct = createAsyncThunk("userSlice/forceNoAct",async (item, rejectWithValue)=>{
    try{
        const {data} = await userService.forceNoActivate(item)
        return data
    }catch (e){
        return rejectWithValue(e.response.data)
    }
})

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        authStatus: (state, action) => {
            state.auth = action.payload
        },
        logIn: (state, action) => {
            state.logIn = action.payload
        },
        userShow: (state, action) => {
            state.userShow = action.payload
        },
        adminShow: (state, action) => {
            state.admin = action.payload
        },
        UBIdShow: (state, action) => {
            state.userByIdShow = action.payload
        }

    },
    extraReducers: builder => builder
        .addCase(getToken.fulfilled,(state, action)=>{
            state.auth = action.payload
        })
        .addCase(addNewUser.fulfilled,(state, action)=>{
            state.user = action.payload
        })
        .addCase(checkToken.fulfilled,(state, action)=>{
            state.checkToken = action.payload
        })
        .addCase(getUserById.fulfilled,(state, action)=>{
            state.userById = action.payload
        })
        .addCase(checkTokenA.fulfilled,(state, action)=>{
            state.TokenA = action.payload
        })
        .addCase(getAllUsers.fulfilled,(state, action)=>{
            state.allUsers = action.payload
        })
        .addCase(deleteU.fulfilled,(state, action)=>{
            state.delete = action.payload
        })

})

const {reducer: userReducer, actions:{UBIdShow ,authStatus, logIn, userShow, adminShow}} = userSlice

const userActions = {
    getToken,
    addNewUser,
    authStatus,
    checkToken,
    logIn,
    userShow,
    getUserById,
    adminShow,
    checkTokenA,
    getAllUsers,
    deleteU,
    UBIdShow,
    forceAct,
    forceNoAct
}

export {
    userActions,
    userReducer
}