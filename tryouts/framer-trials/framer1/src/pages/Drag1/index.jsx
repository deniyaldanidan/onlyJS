import React from 'react';
import { FloatingLink } from '../../components/CustLinks';
import {CircleBox, CircleBoxWithHandle} from '../../components/Showcasers';
import {motion, useDragControls} from 'framer-motion';
import {MdDragIndicator} from 'react-icons/md';

const dragVariant = {
    scale: 1.1,
    backgroundColor: "#aef",
}

const Drag1 = ()=>{
    const dragControls = useDragControls();

    const startDrag = e=>{
        dragControls.start(e, {snapToCursor:false})
    }

    return (
        <>
            <CircleBox 
                drag 
                whileDrag={dragVariant} 
                dragConstraints={{left:0, right:1000, top:0, bottom: 500}}
                dragMomentum={false}
            >
                Drag Me
            </CircleBox>
            <CircleBoxWithHandle
                drag 
                dragControls={dragControls}
                whileDrag={dragVariant} 
                dragConstraints={{left:0, right:1000, top:0, bottom: 500}}
                dragMomentum={false}
                dragListener={false}
            >
                Drag My Handle
                <motion.div className="handle" onPointerDown={startDrag}><MdDragIndicator /></motion.div>
            </CircleBoxWithHandle>
            <FloatingLink to="/extras">Extras</FloatingLink>
        </>
    );
}

export default Drag1;