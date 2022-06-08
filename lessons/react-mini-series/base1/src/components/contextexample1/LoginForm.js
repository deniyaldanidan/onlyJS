import { useState } from 'react';
import { useUserContext } from '../../contexts/userContext';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const {logIn} = useUserContext();

    const submitHandle = (e)=>{
        e.preventDefault();
        if(!username) return;
        logIn(username);
        setUsername("");
    }
  
    return (
      <form onSubmit={submitHandle} >
          <h1 >Login Form</h1>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="submit" value="Login" />
      </form>
    )
}

export default LoginForm