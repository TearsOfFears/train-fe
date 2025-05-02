import {BaseQueryFn, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {ErrorResponse} from "../interfaces/errorResponse";
import {RootState} from "../store/store";
import {getTokenFromLocalStorage} from "../utils/localstorage";

const basicBaseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers) => {
        const token = getTokenFromLocalStorage()
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})

export const baseQuery: BaseQueryFn<
    string | { url: string; method: string; body?: any },
    unknown,
    FetchBaseQueryError | ErrorResponse
> = async (args, api, extraOptions) => {
    const result = await basicBaseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        return {
            error: {
                ...result.error,
                isAuthError: true,
            },
        }
    }

    if (result.error && Number(result.error?.status) >= 400) {
        const errorData = result.error.data as ErrorResponse
        return {
            error: {
                ...errorData,
            },
        }
    }

    return result
}