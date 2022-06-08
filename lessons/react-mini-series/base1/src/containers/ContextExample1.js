import Auth from '../components/contextexample1/Auth';
import Header from '../components/contextexample1/Header';
import { UserContextProvider } from '../contexts/userContext'

const ContextExample1 = () => {
  
    return (
      <>
        <UserContextProvider>
            <fieldset>
                <legend>Context Example 1</legend>
                <Header />
                <Auth />
            </fieldset>
        </UserContextProvider>
      </>
    );
}

export default ContextExample1