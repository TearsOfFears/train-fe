import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../api/baseQuery'
import { ITrain, IResponseTrain, IResponseTrainData } from '../../interfaces/types/types'
import {PageParamsTrains} from "../../interfaces/pageParams";
import {PageResult} from "../../interfaces/pageResult";
import {DEFAULT_PAGINATION} from "../../defaults/pagination";
import {TrainStatusEnum} from "../../interfaces/trainStatus.enum";

export const trainApi = createApi({
    reducerPath: 'trainApi',
    baseQuery,
    tagTypes: ['Train'],
    endpoints: (builder) => ({
        getTrainList: builder.query<PageResult<IResponseTrain>, PageParamsTrains>({
            query: ({ page = DEFAULT_PAGINATION.page, limit = DEFAULT_PAGINATION.limit,sortingOrder,sortBy,query = '' }) => ({
                url: `train/list`,
                method: 'GET',
                params: { index:page, size:limit,sortingOrder,sortBy,query},
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map(({id}) => ({ type: 'Train' as const, id })),
                        { type: 'Train', id: 'LIST' },
                    ]
                    : [{ type: 'Train', id: 'LIST' }],
        }),
        updateTrainStatus: builder.mutation<void, { id: string; status: TrainStatusEnum }>({
            query: ({ id, status }) => ({
                url: `/train/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Train'],
        }),
        getTrainById: builder.query<IResponseTrain, string>({
            query: (id) => ({
                url: `train/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Train', id }],
        }),

        createTrain: builder.mutation<ITrain, Partial<ITrain>>({
            query: (train) => ({
                url: 'train',
                method: 'POST',
                body: train,
            }),
            invalidatesTags: [{ type: 'Train', id: 'LIST' }],
        }),

        updateTrain: builder.mutation<ITrain, { id: string; train: Partial<ITrain> }>({
            query: ({ id, train }) => ({
                url: `train/${id}`,
                method: 'PUT',
                body: train,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Train', id },
                { type: 'Train', id: 'LIST' },
            ],
        }),
        deleteTrain: builder.mutation<IResponseTrainData, string>({
            query: (id) => ({
                url: `train/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Train', id },
                { type: 'Train', id: 'LIST' },
            ],
        }),
    }),
});


export const {
    useGetTrainListQuery,
    useGetTrainByIdQuery,
    useCreateTrainMutation,
    useUpdateTrainMutation,
    useDeleteTrainMutation,
    useUpdateTrainStatusMutation
} = trainApi
