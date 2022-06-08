import LoginForm from './LoginForm';
import Home from './Home';
import { useUserContext } from '../../contexts/userContext';

const Auth = () => {
    const {user} = useUserContext();

    return (
    <>
        { user.isGuestUser ? <LoginForm /> : <Home /> }
    </>
  )
}

export default Auth