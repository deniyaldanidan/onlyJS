import React from 'react';
// import {Link} from 'react-router-dom';
import {LayoutGroup, motion} from 'framer-motion';
import cardData from './cardData';
import './layoutAni2.scss'
import { MotionLink } from '../../components/CustLinks';

const LayoutAni2 = ()=>{
    return (
        <div className="layoutAni2 cards-container">
            <LayoutGroup id="card-group">
            {
                cardData.map(card=>(
                    <MotionLink 
                    to={`/layout2/${card.id}`} 
                    className="card" 
                    key={card.id} 
                    initial={{scale:1}} 
                        whileHover={{scale:1.1, transition:{duration:0.5, type:"spring"}}}
                        style={{display: "block"}}
                    >
                        <motion.div className="img-sec" layoutId={`card-img-${card.id}`}>
                            <img src={card.img} alt="" />
                        </motion.div>
                        <div className="title-sec">{card.name}</div>
                    </MotionLink>
                ))
            }
            </LayoutGroup>
        </div>
    );
}

export default LayoutAni2;

// /layout2/:id