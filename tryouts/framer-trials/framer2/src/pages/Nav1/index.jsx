import {AnimatePresence, motion, useCycle} from 'framer-motion';
import Hamburger from '../../components/Hamburger';
import './nav1.scss';
import NavBarContents from './NavBarContents';

const navBarVariants = {
    closed: {
        clipPath: "circle(25px at 42.5px 39px)",
        transition: {
            delay: 1.1,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    },
    open: {
        clipPath: "circle(130vh at 42.5px 39px)",
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }
}

const Nav1 = ()=>{
    const [navState, navStateTogg] = useCycle(false, true);

    return (
        <motion.nav className='navbar-1' initial={false} 
            variants={navBarVariants} 
            animate={navState ? "open" : "closed"}
        >
            <AnimatePresence>
                {navState && <NavBarContents /> }
            </AnimatePresence>
            <Hamburger navState={navState} togg={()=>navStateTogg()} style={{position: "absolute", top: "30px", left: "30px"}} />
        </motion.nav>
    )
}

export default Nav1;