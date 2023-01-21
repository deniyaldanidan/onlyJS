import { apiSlice } from "../api/apiSlice";


const myProfileSlice = apiSlice.injectEndpoints({
    endpoints(build) {
        return {
            getMyProfile: build.query<any, void>({
                query: () => ({
                    url: "/profile",
                    method: "get"
                }),
                keepUnusedDataFor: 1
            }),
            updateProfile: build.mutation<any, { firstname: string, lastname: string, location: string, bio: string }>({
                query: ({ firstname, lastname, bio, location }) => ({
                    url: "/profile",
                    method: "PUT",
                    body: { firstname, lastname, bio, location}
                }),
                invalidatesTags: ["profile"]
            })
        }
    },
})

export default myProfileSlice;

export const { useGetMyProfileQuery, useUpdateProfileMutation } = myProfileSlice;