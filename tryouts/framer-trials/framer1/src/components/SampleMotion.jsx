import React from 'react'
import PropTypes from 'prop-types';
import {motion} from 'framer-motion';

const SampleMotion = ({bgColor, altBgColor, children}) => {
  return (
    <motion.div className='showcase-section' initial={{backgroundColor:bgColor, transition: {duration:0.5, delay: 0.25}}} whileInView={{backgroundColor:altBgColor, transition: {duration:0.5, delay: 0.25}}} viewport={{amount: 0.45, once:false}}>{children}</motion.div>
  )
}

SampleMotion.propTypes = {
    bgColor: PropTypes.string.isRequired,
    altBgColor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default SampleMotion