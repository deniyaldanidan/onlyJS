import React from 'react'
import '../styles/donut-progress.scss'
import {motion, useSpring} from 'framer-motion';

const DonutProgress = ({progress}) => {

  const pathLength = useSpring(progress, {damping:100, stiffness:100});

  return (
    <svg className='svg-indicator' width="100" height="100" viewBox='0 0 100 100'>
        <circle className="svg-indicator-track" cx="50" cy="50" r="40" pathLength="1" />
        <motion.circle className="svg-indicator-indication" cx="50" cy="50" r="40" pathLength="1" style={{pathLength}} />
    </svg>
  )
}

export default DonutProgress