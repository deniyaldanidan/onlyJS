import React from 'react';
import DonutProgress from '../../components/DonutProgress';
import Policy from './Policy';
import {useScroll} from 'framer-motion';
import './privacy.scss';

const Privacy = () => {

    const {scrollYProgress} = useScroll();

    return (
        <>
            <DonutProgress progress={scrollYProgress}/>
            <Policy/>
        </>
  )
}

export default Privacy