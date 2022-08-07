import React, {useState, useRef} from 'react'
import {Link} from 'react-router-dom';
import {FiMenu} from 'react-icons/fi'
import {AnimatePresence, motion} from 'framer-motion';
import useClickOutside from '../../hooks/useClickOutside';

const menuAnimation={
    hidden: {
        opacity: 0,
        y: '-20px'
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10
        }
    }
}

const Hamburger = () => {
    const [show, setShow] = useState(false);
    const menuRef = useRef();

    useClickOutside(menuRef, ()=>setShow(false))

    return (
        <div className='hamburger-menu' ref={menuRef}>
            <motion.div 
                className='hamburger'
                whileHover={{ scale: 1.1}}
                whileTap={{scale:1}}
                onClick={()=>setShow(prev=>!prev)}
                transition={{type:"spring", stiffness: 500, damping:10 }}
            >
                <FiMenu />
            </motion.div>
            <AnimatePresence>
                {show && <motion.div 
                    className="menus"
                    variants={menuAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <Link to="/companies" className='menu' >SaaS Companies</Link>
                    <Link to="/investors" className='menu' >SaaS Investors</Link>
                    <Link to="/jobs" className='menu' >SaaS Jobs</Link>
                    <Link to="/service" className='menu' >Matching Service</Link>
                    <Link to="/blogs" className='menu' >Blog</Link>
                    <Link to="/about" className='menu' >About</Link>
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default Hamburger