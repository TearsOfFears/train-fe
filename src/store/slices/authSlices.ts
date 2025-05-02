import {createSlice} from "@reduxjs/toolkit";
import {IUserData} from "../../interfaces/types/types";
import {removeTokenFromLocalStorage, setTokenToLocalStorage} from "../../utils/localstorage";


const initialState: Partial<IUserData> = {}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            removeTokenFromLocalStorage()
            return {};
        },
        login: (state, action) => {
            if (action?.payload?.token){
                setTokenToLocalStorage(action.payload.token)
            }
            state = action.payload
            return state
        },
    }
})

export const { logout, login } = authSlice.actions
export const authReducer = authSlice.reducer