import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchAllIdeaType } from './apiSliceHelper';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3500/",
        headers: [["Content-Type", "application/json"], ['Accept', 'application/json, text/plain']],
        credentials: "include",
        timeout: 15*1000
    }),
    endpoints: builder => ({
        getAllIdeas: builder.query<fetchAllIdeaType[], number|void>({
            query: () => '/all/fetchAllIdeas'
        }),
        getOneIdea: builder.query<fetchAllIdeaType, number>({
            query: (postId:number)=> `/ideas/${postId}`
        })
    })
})

export const { useGetAllIdeasQuery, useGetOneIdeaQuery } = apiSlice;