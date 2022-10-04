import React, {
  useRef,
  useEffect
} from 'react';
import './parallax1.scss';
import {
    motion,
    useScroll,
    useTransform
  } from "framer-motion";
import { FloatingLink } from '../../components/CustLinks';

function useParallax(value, distance){
    return useTransform(value, [0,1], [-distance, distance])
}

const Image = ({id})=>{
    const ref = useRef(null);
const {scrollYProgress, scrollY} = useScroll({target:ref});
    const y = useParallax(scrollYProgress, 600);
    useEffect(()=>{
      scrollY.onChange(latest=>{
        console.log(`${id} ${scrollYProgress.current} ${y.current}`);
      })
    }, [id, scrollY, scrollYProgress, y]);

    return (
        <div className='parallax1-container'>
            <div className="parallax-box" ref={ref}>Image-{id}</div>
            <motion.h2 style={{y}} >{`#00${id}`}</motion.h2>
        </div>
    );
}

const Parallax1 = () => {
  return (
    <div>
      <div className="contents">
        {[1,2,3,4,5].map(image=><Image key={image} id={image} />)}
      </div>
      <FloatingLink to="/extras">Extras</FloatingLink>
    </div>
  )
}

export default Parallax1