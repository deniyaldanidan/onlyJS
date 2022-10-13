import React from 'react';
import {motion} from 'framer-motion';

const Bg = ()=>{
    return (
        <motion.div className="background" 
            initial={{width:0}}
            animate={{width:"100%", transition: {duration:0.3}}}
            exit={{width:0, transition:{duration:0.3}}}
            key="bg"
          ></motion.div>
    );
}

export default Bg;