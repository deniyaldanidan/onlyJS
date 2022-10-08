import React, {useState} from 'react';
import { FloatingLink } from '../../components/CustLinks';
import {motion, AnimatePresence} from 'framer-motion';
import {AiFillCaretLeft, AiFillCaretRight} from 'react-icons/ai';
import './carousel1.scss';

const card_data = ["item_1", "item_2", "item_3", "item_4", "item_5"];

const cardVariants = {
    initial: (right)=>{
        return {x:right ? -710 : 710};
    },
    animate: {
        x:0
    },
    exit: (right)=>{
        return {x:right ? 710 : -710};
    }
}

const Carousel1 = ()=>{
    const [{curr, right}, setParams] = useState({curr:0, right:false});

    const prevHandler = ()=>{
        setParams(prev=>{
            if(prev.curr<=0) return {curr: card_data.length - 1, right:true};
            return {curr: prev.curr-1, right:true}
        })
    };
    const nextHandler = ()=>{
        setParams(prev=>{
            if(prev.curr>=card_data.length-1) return {curr:0, right:false};
            return {curr: prev.curr+1, right:false}
        })
    }

    return (
        <>
            <div className="carousel1-cards-container">
                <AnimatePresence initial={false} custom={right}>
                    <motion.div 
                        className="card"
                        custom={right}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{duration:0.35, type:"spring"}}
                        key={curr}
                    >
                        {card_data[curr]}
                    </motion.div>
                </AnimatePresence>
                <div className="prev" onClick={prevHandler}><AiFillCaretLeft/></div>
                <div className="next" onClick={nextHandler}><AiFillCaretRight/></div>
            </div>
            <FloatingLink to="/extras">Extras</FloatingLink>
        </>
    );
};


export default Carousel1;