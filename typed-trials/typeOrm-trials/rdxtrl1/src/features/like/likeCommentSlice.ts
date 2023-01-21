import { apiSlice } from "../api/apiSlice";
import { createCommentPayload, postLikePayload, postLikeReturnType, updateCommentPayload } from "./likeComSliceHelper";

const commentUrl: string = "/comment"

const likeCommentSlice = apiSlice.injectEndpoints({
    endpoints(build) {
        return {
            postLike: build.mutation<postLikeReturnType, postLikePayload>({
                query: (args) => ({
                    url: "/like",
                    method: "post",
                    body: args
                }),
                invalidatesTags: (_, __, args) => ["Idea", { type: "Idea", id: args.ideaId }]
            }),
            createComment: build.mutation<any, createCommentPayload>({
                query: (args) => ({
                    url: commentUrl,
                    method: "post",
                    body: args
                }),
                invalidatesTags: (_, __, args) => ["Idea", { type: "Idea", id: args.idea_id }]
            }),
            updateComment: build.mutation<any, updateCommentPayload>({
                query: (args) => ({
                    url: commentUrl,
                    method: "put",
                    body: args
                }),
                invalidatesTags: (_, __, args) => ["Idea", { type: "Idea", id: args.idea_id }]
            }),
            deleteComment: build.mutation<any, { id: number, idea_id: number }>({
                query: (args) => ({
                    url: commentUrl,
                    method: "delete",
                    body: args
                }),
                invalidatesTags: (_, __, args) => ["Idea", { type: "Idea", id: args.idea_id }]
            })
        }
    },
    overrideExisting: false
})

export default likeCommentSlice;

export const { usePostLikeMutation, useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } = likeCommentSlice;