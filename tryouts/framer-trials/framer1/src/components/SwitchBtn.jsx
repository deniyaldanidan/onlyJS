import '../styles/switch-btn.scss';
import {AnimatePresence, motion} from 'framer-motion';

const downAni = {
    initial: {
        y: -50,

    },
    animate: {
        y:0,
        transition: {
            duration:0.5
        }
    },
    exit: {
        y:50,
        transition: {
            duration:0.5
        }
    }
}

const IconWrapper = ({children})=><motion.div className='btn-icon' variants={downAni} initial="initial" animate="animate" exit="exit" layout="switch-btn">{children}</motion.div>

const SwitchBtn = ({btnState, toggState, rightIcon, leftIcon}) => {
  return (
    <div className={`btn-container ${btnState ? "right" : ""}`} onClick={toggState}>
        <motion.div 
            className="btn" 
            layout 
            transition={{type:"spring", stiffness:100, damping:30}}
        >
            <AnimatePresence layout="switch-btn" mode='wait'>
                {btnState ? <IconWrapper key="1">{rightIcon}</IconWrapper> : <IconWrapper key="2">{leftIcon}</IconWrapper>}
            </AnimatePresence>
        </motion.div>
    </div>
  )
}

export default SwitchBtn