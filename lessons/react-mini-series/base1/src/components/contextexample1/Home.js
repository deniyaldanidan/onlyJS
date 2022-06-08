import { useUserContext } from "../../contexts/userContext"


const Home = () => {
    const {user, logOut} = useUserContext();

    return (
      <>
        <div>You're Logged in, {user.name}</div>
        <button onClick={logOut}>logOut</button>
      </>
    )
}

export default Home