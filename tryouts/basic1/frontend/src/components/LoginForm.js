import ReactDOM from 'react-dom';
import {motion} from 'framer-motion'
import '../styles/loginform.css';
import {RiCloseLine} from 'react-icons/ri'

const LoginForm = ({closeAction})=>{
    const submitHandler = ()=>{

    }

    return (
        <>  
            <motion.div 
                className="form-container"
                initial={{scale:0, translateX: '-50%', translateY:'-50%' }}
                animate={{scale:1}}
                exit={{scale:0}}
                transition={{duration:0.4}}
            >
                <form onSubmit={submitHandler}>
                    <div className="form-title">Login</div>
                    <div className="inp-grp">
                        <label>Username or Email</label>
                        <input type="text" />
                    </div>
                    <div className="inp-grp">
                        <label htmlFor="">Password</label>
                        <input type="password" />
                    </div>
                    <input type="submit" value="Login" />
                </form>
                <div onClick={()=>closeAction(false)}><RiCloseLine /></div>
            </motion.div>
        </>
    );
}

const LoginFormPortal = ({closeAction}) => {
  return ReactDOM.createPortal(
        <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}} onClick={()=>closeAction(false)} className="modal-wrapper">
            </motion.div>
            <LoginForm closeAction={closeAction}/>
        </> , 
        document.getElementById("portal1")
    )
}


export default LoginFormPortal