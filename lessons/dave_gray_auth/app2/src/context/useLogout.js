import axios from '../api/axios';
import useAuth from '../context/AuthProvider';

const useLogout = () => {
    const {setAuth} = useAuth();

    const logoutFunc =  async()=>{
        try {
          const response = await axios.get("/logout", {
            withCredentials: true
          });
          console.log(response);
        } catch (error) {
            console.log(error);
        } finally{
            setAuth({});
        }
      }

    return logoutFunc;
}

export default useLogout