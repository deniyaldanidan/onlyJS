import React, {useState, useEffect} from 'react';
import {motion, useScroll} from 'framer-motion'

const LinePBar = ({fill="#bbb5", progress, track=true})=>{

    return (
        <motion.rect 
            x="0" y="0" 
            rx="10"
            width={track ? "100%" : progress}
            style={{
                fill:fill, 
                height:"20",
                overflow:"hidden"
            }} 
        />
    );
}

const toPercent = (value)=> value <= 0.04 ? "4%" :`${value * 100}%`

const LineProgressBar = ({target, fillColor="#fff"}) => {
    const {scrollXProgress, scrollX} = useScroll({container:target});
    
    const [progress, setProgress] = useState(toPercent(scrollXProgress.current));

    useEffect(()=>{
        scrollX.onChange(()=>{
            let newProgress = toPercent(scrollXProgress.current);
            console.log(newProgress);
            setProgress(newProgress);
        })
    }, [scrollX, scrollXProgress]);

  return (
    <svg
        style={{
            width:"100%", 
            height:"50px",
            margin: "10px auto", 
            }}
    >
        {/* Path */}
        <LinePBar />
        {/* Progress */}
        <LinePBar progress={progress} fill={fillColor} track={false}/>
    </svg>
  )
}

export default LineProgressBar