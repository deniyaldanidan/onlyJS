import React from 'react';
import {MdDragIndicator} from 'react-icons/md';
import {useDragControls, Reorder, useMotionValue, useTransform, motion, AnimatePresence} from 'framer-motion';

const itemVariants = {
    hidden:{opacity:0},
    visible:{opacity:1, transition:{duration:1}},
    exit:{opacity:0, transition:{duration:0.5}}
}

const Item = ({value, containerRef, unComplete, complete, Delete})=>{
    const dragControl = useDragControls();
    const x = useMotionValue(0);
    const backgroundColor = useTransform(x, [-80, 0, 80], ["#f44", "#fff", "#8fa"])
    
    const dragHandler = (pos)=>{
        if (pos<=-80) Delete(value.id)
        if (pos>=80) complete(value.id)
    }

    return (
        <Reorder.Item 
            as="div"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            value={value} 
            className="item"
            drag
            dragConstraints={containerRef}
            dragListener={false}
            dragControls={dragControl}
            dragElastic={0.5}
            // whileDrag={{backgroundColor:"#def"}}
            onDragEnd={(e,info)=>dragHandler(info.offset.x)}
            dragDirectionLock
            style={{x, backgroundColor}}
            onDoubleClick={()=>unComplete(value.id)}
        >
            <span>
                <span>
                    {value.data}
                </span>
                <AnimatePresence mode="wait">
                    {value.complete && <motion.div 
                        className="complete-bar" 
                        initial={{width:0}}
                        animate={{width:"110%", transition: {duration:1, delay:0.5}}}
                        exit={{width:0, transition:{duration:1, delay:0.25}}}
                        ></motion.div>}
                </AnimatePresence>
            </span>
            <div className="handle" onPointerDown={e=>dragControl.start(e)}><MdDragIndicator/></div>
        </Reorder.Item>
    );
}

export default Item;