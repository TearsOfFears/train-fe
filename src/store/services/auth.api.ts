import { createApi } from '@reduxjs/toolkit/query/react'
import {IRegisterData, IResponseUserData, IUser, IUserData, IUserLoginData} from "../../interfaces/types/types";
import {baseQuery} from "../../api/baseQuery";
import {ErrorResponse} from "../../interfaces/errorResponse";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        register: builder.mutation<void | ErrorResponse, IRegisterData>({
            query: (data) => ({
                url: 'auth/register',
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation<IUser,  IUserLoginData>({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data,
            }),
        }),
        getProfile: builder.query<IUser,void>({
            query: () => ({
                url: 'user/me',
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetProfileQuery,
    useLazyGetProfileQuery
} = authApi
