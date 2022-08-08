import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../../assets/saascommunity-logo-c.png'
import {FiUser} from 'react-icons/fi';
import {motion} from 'framer-motion';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Hamburger from './Hamburger';

const BottomHeader = ({sticky}) => {

    const isLarge = useMediaQuery("(min-width: 1240px)")
  
    return (
        <div className={`bottom-header ${sticky ? "sticky-header" :""}`} >
            <div className="header-contents">
            <Link to="/" className='logo' ><img src={logo} alt="logo" /></Link>
            {isLarge && <div className="menus">
                <Link to="/companies" className='menu' >SaaS Companies</Link>
                <Link to="/investors" className='menu' >SaaS Investors</Link>
                <Link to="/jobs" className='menu' >SaaS Jobs</Link>
                <Link to="/service" className='menu' >Matching Service</Link>
                <Link to="/blogs" className='menu' >Blog</Link>
                <Link to="/about" className='menu' >About</Link>
            </div>}

            <div className="sec-menus">
                {!isLarge && <Hamburger/>}
                <div className='signin'><FiUser className='icon' /> Sign In</div>
                <motion.div
                    whileHover={{ scale: 1.1}}
                    transition={{type:"spring", stiffness: 500, damping:10 }}
                    >
                    <Link to="/join" className='join'>JOIN</Link>
                </motion.div> 
            </div>
            </div>
        </div>
    )
}

export default BottomHeader;