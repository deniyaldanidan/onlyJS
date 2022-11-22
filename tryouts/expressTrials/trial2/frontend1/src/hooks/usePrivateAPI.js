import { privateApi } from "../api/api";
import useAuth from "../context/AuthContext";
import useRefresh from "./useRefresh";
import { useEffect } from "react";

export default function usePrivateApi(){
    const {auth} = useAuth();
    const refresh = useRefresh();

    useEffect(()=>{
        const requestIntercept = privateApi.interceptors.request.use(
            config=>{
                if (!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            err=>Promise.reject(err)
        )

        const responseIntercept = privateApi.interceptors.response.use(
            response=>response,
            async err=>{
                const prevRequest = err?.config;
                if (err?.response?.status === 403 && !prevRequest?.sent){
                    const accessToken = await refresh();
                    return privateApi({
                        ...prevRequest,
                        headers: {...prevRequest.headers, Authorization: `Bearer ${accessToken}`},
                        sent: true
                    });
                }
                return Promise.reject(err)
            }
        )

        return ()=>{
            privateApi.interceptors.request.eject(requestIntercept);
            privateApi.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return privateApi;
}