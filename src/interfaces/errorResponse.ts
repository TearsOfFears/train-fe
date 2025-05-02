import type { HttpStatusCode } from 'axios'

export interface PropertyError {
    property: string
    message: string
}

export interface ErrorResponse {
    error: string
    message: string,
    statusCode: HttpStatusCode
}

export interface ErrorMessage {
    error?: {
        message?: string | PropertyError[]
    }
}

export interface APIError {
    message: string
    [key: string]: any // Other possible fields
}

function isAPIError(error: any): error is APIError {
    return typeof error === 'object' && error !== null && 'message' in error
}

export function getError(error: unknown, fallbackMessage = 'Failed to submit action'): string {
    return isAPIError(error) ? error.message : fallbackMessage
}
