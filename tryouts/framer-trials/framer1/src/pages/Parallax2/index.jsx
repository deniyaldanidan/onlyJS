import React, {useRef} from 'react';
import { FloatingLink } from '../../components/CustLinks';
import './parallax2.scss';
import {motion} from 'framer-motion';
import LineProgressBar from '../../components/LineProgressBar';

const Card = ({cardNo, containerRef})=>{

  return (
    <div className="card">
      <motion.span 
        initial={{y:-300, opacity:0}}
        whileInView={{y:0, opacity:1, transition: {type:"spring", bounce:0.5}}}
        viewport={{once:false, amount:0.5, root:containerRef}}
      >
        Card {cardNo}
      </motion.span> 
    </div>
  )
}

const Parallax2 = () => {
  const containerRef = useRef(null);
  
  return (
    <>
        <div className="cards-container">
          <div className="cards" ref={containerRef}>
            {[...Array(10)].map((a, index)=><Card cardNo={index} key={index} containerRef={containerRef} />)}
          </div>
          <div className="prev act-btn"></div>
          <div className="next act-btn"></div>
          <LineProgressBar target={containerRef} />
        </div>
        <FloatingLink to="/extras">Extras</FloatingLink>
    </>
  )
}

export default Parallax2