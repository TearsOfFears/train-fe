import {ErrorResponse} from "../interfaces/errorResponse";

export const errorResponseParse = (error: any): ErrorResponse => ({
    error: error.error,
    message: error.message,
    statusCode: error.statusCode,
})