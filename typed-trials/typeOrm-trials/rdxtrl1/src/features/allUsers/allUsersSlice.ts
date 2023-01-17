import { apiSlice } from "../api/apiSlice";
import { createSelector } from "@reduxjs/toolkit";
import { fetchAllUsersResType, fetchAllUsersType } from "../api/apiSliceHelper";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUserInfos: builder.query<fetchAllUsersType[], number|void>({
            query: ()=>"/all/fetchAllUsers",
            transformResponse: (responseData:fetchAllUsersResType[])=>{
                return responseData.map(res=>({...res, fullname: res.profile.firstname + " " + res.profile.lastname}))
            },
            providesTags: ['profile']
        })
    }),
    overrideExisting: false
})

export const {useGetAllUserInfosQuery} = extendedApiSlice;

export const selectAllUsersResult = extendedApiSlice.endpoints.getAllUserInfos.select();

const emptyUserInfos:Array<fetchAllUsersType> = [];

export const selectAllUsers = createSelector(
    selectAllUsersResult,
    usersResult=> usersResult.data ?? emptyUserInfos
);

export const selectUserByUsername = createSelector(
    selectAllUsers,
    (_:any, username:string)=>username,
    (users, username)=>users.find(user=>user.username===username)
)