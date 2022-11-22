import { privateApi } from "../api/api";
import useAuth from "../context/AuthContext";

export default function useRefresh (){
    const { setAuth } = useAuth();

    return async ()=>{
        try {
            const response = await privateApi.get("/refresh");
            setAuth(prev=>({...prev, accessToken:response.data.accessToken}))
            return response.data.accessToken
        } catch (error) {
            setAuth({});
            throw error;
        }
    }
}