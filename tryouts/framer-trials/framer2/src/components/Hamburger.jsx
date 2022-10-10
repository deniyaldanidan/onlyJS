import {motion} from 'framer-motion';
import PropTypes from 'prop-types';

const HamLayerStyle = {
    width: "100%",
    height: "3px",
    backgroundColor: "#fff",
    border: "none"
}

const HamStyle = {
    display: "flex",
    flexDirection: "column",
    rowGap: "4px",
    height: "18px",
    width: "25px",
    cursor: "pointer"
}

const HamLayerTransition = {
    duration: 0.6,
    type: "spring",
    bounce: 0.6
}

const HamMidLayerTransition = {
    duration: 0.2,
    type: "spring"
}

const HamLayer1Variants = {
    open: {
        rotateZ: "45deg",
        y: "9px"
    },
    closed: {}
}

const HamLayer2Variants = {
    open: {
        rotate: "20deg",
        opacity: 0
    },
    closed: {}
}

const HamLayer3Variants = {
    open: {
        rotate: "-45deg",
        y: "-4.5px"
    },
    closed: {}
}

const Hamburger = ({navState, togg, style}) => {
  return (
    <div onClick={togg} style={{...HamStyle, ...style}} >
        <motion.div style={HamLayerStyle} initial={false} 
            variants={HamLayer1Variants} 
            animate={navState ? "open" : "closed"}
            transition={HamLayerTransition}
        ></motion.div>
        <motion.div style={HamLayerStyle} initial={false}
            variants={HamLayer2Variants}
            animate={navState ? "open" : "closed"}
            transition={HamMidLayerTransition}
        ></motion.div>
        <motion.div style={HamLayerStyle} initial={false} 
            variants={HamLayer3Variants}
            animate={navState ? "open" : "closed"}
            transition={HamLayerTransition}
        ></motion.div>
    </div>
  )
}

Hamburger.propTypes = {
    navState: PropTypes.bool.isRequired,
    togg: PropTypes.func.isRequired,
    style: PropTypes.object
}


export default Hamburger;