export type PageParams = {
  limit: number
  page: number
  name?: string
  sortDirection?: SortDirectionTypes
  sortField?: SortFieldTypes
}

export type SearchParams = {
  limit?: number
  page?: number
  query?: string
  sortingOrder?: `${SortDirectionTypes}`
}

export type PageParamsTrains = SearchParams & { sortBy?: SortFieldTypes }

export enum SortDirectionTypes {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortFieldTypes {
  NAME = 'name',
  AVAILABLE_SEATS = 'availableSeats',
}