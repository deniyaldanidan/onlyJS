import { apiSlice } from "../api/apiSlice";

type testResType = {
    uname: string,
    fname: string,
    lname: string
}

export const testSlice = apiSlice.injectEndpoints({
    endpoints(build) {
        return {
            testAuth: build.query<testResType, void>({
                query: ()=>"/test",
                keepUnusedDataFor: 2
            })
        }
    },
    overrideExisting: false
})

const {useTestAuthQuery} = testSlice;

export default useTestAuthQuery;