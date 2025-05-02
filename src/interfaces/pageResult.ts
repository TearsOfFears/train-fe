export interface PageResult<T> {
    items: T[]
    meta: Meta
}

interface Meta {
    totalItems: number
    totalPages: number
}
