import {motion} from 'framer-motion';


const menuVariants = {
    initial: {opacity:0, y:-10},
    visible: {opacity:1, y:0},
    exit: {opacity: 0, y:-10, transition: {duration: 0.4}}
}

const navVariants = {
    initial: {opacity:0},
    visible: {opacity:1, transition: {
        delay:0.6, 
        staggerChildren: 0.2, 
        when:"beforeChildren"
    }},
    exit: {opacity:0, transition:{
        staggerChildren:0.2, 
        when: "afterChildren",
        staggerDirection:-1
    }}
}

const NavBarContents = ()=>{
    return (
        <motion.div className='navbar-contents' 
        >
            <motion.div className="nav-menu" 
                variants={navVariants}
                initial="initial"
                animate="visible"
                exit="exit"
            >
                <motion.div className="menu" variants={menuVariants}>Home</motion.div>
                <motion.div className="menu" variants={menuVariants}>Blogs</motion.div>
                <motion.div className="menu" variants={menuVariants}>Shop</motion.div>
                <motion.div className="menu" variants={menuVariants}>About</motion.div>
            </motion.div>

            <motion.div className="nav-actions" 
                variants={navVariants}
                initial="initial"
                animate="visible"
                exit="exit"
            >
                <motion.div className="action" variants={menuVariants}>Login</motion.div>
                <motion.div className="action" variants={menuVariants}>Register</motion.div>
            </motion.div>
        </motion.div>
    )
}

export default NavBarContents;