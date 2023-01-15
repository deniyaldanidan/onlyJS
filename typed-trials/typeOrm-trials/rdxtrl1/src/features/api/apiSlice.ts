import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addIdeaInp, EditIdeaInp, fetchAllIdeaType, ideaViewType } from './apiSliceHelper';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3500/",
        headers: [["Content-Type", "application/json"], ['Accept', 'application/json, text/plain']],
        credentials: "include",
        timeout: 20 * 1000
    }),
    tagTypes: ["Idea"],
    keepUnusedDataFor: 220,
    endpoints: builder => ({
        getAllIdeas: builder.query<fetchAllIdeaType[], number | void>({
            query: () => '/all/fetchAllIdeas',
            providesTags: (result = []) => [
                'Idea',
                ...result.map(idea => ({ type: "Idea" as const, id: idea.id }))
            ]
        }),
        getOneIdea: builder.query<ideaViewType, number>({
            query: (postId: number) => `/ideas/${postId}`,
            providesTags: (_, __, arg) => [{ type: "Idea", id: arg }]
        }),
        addNewIdea: builder.mutation<any, addIdeaInp>({
            query: ({ title, description, acc_tkn }) => ({
                url: "/ideas",
                method: "POST",
                body: { title, description },
                headers: {
                    'authorization': `Bearer ${acc_tkn}`
                }
            }),
            invalidatesTags: ["Idea"]
        }),
        editIdea: builder.mutation<any, EditIdeaInp>({
            query: ({ id, title, description, acc_tkn }) => ({
                url: "/ideas",
                method: "PUT",
                body: { id, title, description },
                headers: {
                    'authorization': `Bearer ${acc_tkn}`
                }
            }),
            invalidatesTags: (__, _, payload) => [{ type: "Idea", id: payload.id }]
        }),
        deleteIdea: builder.mutation<any, { id: number, acc_token: string }>({
            query: ({ id, acc_token }) => ({
                url: `/ideas/${id}`,
                method: "DELETE",
                headers: {
                    'authorization': `Bearer ${acc_token}`
                }
            }),
            onQueryStarted: async({id}, {dispatch, queryFulfilled})=>{
                const patch = dispatch(apiSlice.util.updateQueryData('getAllIdeas', undefined, draft=>draft.filter(idea=>idea.id!==id)))
                try {
                    await queryFulfilled;
                    setTimeout(()=>{
                        dispatch(apiSlice.util.invalidateTags(["Idea", {type: "Idea", id}]))
                    }, 1000)
                } catch (error) {
                    patch.undo()
                    console.log("Deletion is failed")
                }
            }
        })
    })
})

export const { useGetAllIdeasQuery, useGetOneIdeaQuery, useAddNewIdeaMutation, useEditIdeaMutation, useDeleteIdeaMutation} = apiSlice;