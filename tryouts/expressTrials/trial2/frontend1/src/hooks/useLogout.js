import { basicApi } from "../api/api";
import useAuth from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function useLogout(){
    const {setAuth} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    return async ()=>{
        try {
            await basicApi.get("/logout", {withCredentials:true});
        } catch (error) {
            console.log(error);
        } finally{
            console.log("Logged out successfully");
            setAuth({});
            location.pathname!=="/" && navigate("/");
        }
    }    
}