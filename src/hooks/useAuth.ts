import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'
import {AppDispatch, RootState} from "../store/store";
import {IUserData} from "../interfaces/types/types";

export const useDispatch = () => useAppDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector

export const useUser = () =>{
   const auth =  useSelector((state) => state.auth);

   return auth as IUserData
}



export const useAuth = (): boolean => {
    const isAuth = useSelector((state) => state.auth.email)
    return !!isAuth;
}