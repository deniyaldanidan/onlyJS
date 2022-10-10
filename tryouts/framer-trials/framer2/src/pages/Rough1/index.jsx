import {motion} from 'framer-motion';
import {loremIpsum} from 'react-lorem-ipsum';
import { CenteredShow1 } from '../../components/Showcasers';

const BoxStyles1 = {
    position: "fixed",
    top: "20px",
    left: "30px",
    backgroundColor: "#668", 
    width: "500px", 
    height: "fit-content", 
    padding: "20px 30px",
    cursor: "pointer"
}

const Rough1 = ()=>{
    return(
        <CenteredShow1 column={true}>
            <motion.div style={BoxStyles1} initial={{clipPath: "circle(10% at 55px 48px)"}} whileHover={{clipPath: "circle(300% at 55px 48px)", transition: {duration:1}}} transition={{duration: 1}}>
                <div style={{marginBottom: "40px"}}>Box-1</div>
                {loremIpsum({p:4, startWithLoremIpsum:false}).map(text=><div style={{fontSize:"0.75rem", fontWeight:400}}>{text}</div>)}
            </motion.div>

            <div>Hello World</div>
        </CenteredShow1>
    )
}

export default Rough1;