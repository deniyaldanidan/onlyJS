import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Bg from './Bg';

const iconVariants = {
    open: {
        rotateZ: 135,
        x:6,
        y:3
    },
    closed: {
        rotateZ: -45,
        x:6,
        y:-3
    }
}

const labelAni = {
    initial: {opacity:0, y:-10},
    animate: {opacity:1, y:0, transition: {duration:0.35}},
    exit: {opacity:0, y:10, transition: {duration:0.35}}
  }

const MoreBTN = ({onClick, navState, show}) => {
    const [hoverState, setHoverState] = useState(false);

    return (
    <motion.div className='more-btn' onClick={onClick}
        onMouseEnter={()=>setHoverState(true)}
        onMouseLeave={()=>setHoverState(false)}
    >
        <motion.div className="more-content">
            <motion.div className="more-icon" variants={iconVariants} initial={false} animate={show ? "open" : "closed"} transition={{duration:0.75, type:"spring", bounce:0.5}} ></motion.div>
            <AnimatePresence>
                {navState && <motion.div className='more-label' variants={labelAni} initial="initial" animate="animate" exit="exit">Show More</motion.div>}
            </AnimatePresence>
        </motion.div>
        <AnimatePresence>
            {hoverState && <Bg /> }
        </AnimatePresence>
    </motion.div>
  )
}

export default MoreBTN