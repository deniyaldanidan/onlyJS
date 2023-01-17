import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { isString } from "lodash";
import { RootState } from "../../app/store";
import validator from "validator";
import { setAuth, unSetAuth } from "../auth/authSlice";
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3500/",
    headers: [["Content-Type", "application/json"], ['Accept', 'application/json, text/plain']],
    credentials: "include",
    timeout: 20 * 1000,
    prepareHeaders: (headers, { getState }) => {
        const { isAuth, access_token } = (getState() as RootState).auth.data;
        if (isAuth && isString(access_token) && validator.isJWT(access_token)) {
            headers.set('authorization', `Bearer ${access_token}`)
        }
        return headers;
    }
})

const fetchBaseQ: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    const { isAuth } = (api.getState() as RootState).auth.data
    if (result.error && result.error.status==="PARSING_ERROR" && result.error.originalStatus === 401 && isAuth) {
        if (!mutex.isLocked()){
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
                if (refreshResult.data) {
                    const { accToken } = refreshResult.data as { accToken: string }
                    api.dispatch(setAuth(accToken))
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    console.log("Logging out...")
                    api.dispatch(unSetAuth())
                }
            } finally{
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
}

export default fetchBaseQ;