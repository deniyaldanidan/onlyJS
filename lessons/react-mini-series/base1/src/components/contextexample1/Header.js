import  {useUserContext} from '../../contexts/userContext';

const Header = () => {
    const {user} = useUserContext();
    return (
    <div>
        {user.name}
    </div>
  )
}

export default Header