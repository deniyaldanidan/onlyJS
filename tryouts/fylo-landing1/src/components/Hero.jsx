import React from 'react'
import illustration from '../imgs/illustration-intro.png';
import CTABTN from './CTABTN';

const Hero = () => {
  return (
    <div className='container flex flex-col px-6 space-y-6 items-center mx-auto my-0 pt-4 pb-48 max-w-2xl md:px-0 md:space-y-10'>
        <div><img src={illustration} alt="" className='w-full mb-12 md:mb-0' /></div>
        <div className='text-center text-3xl leading-relaxed text-white font-semibold md:text-4xl md:leading-relaxed md:mt-0'>All your files in one secure location, accessible anywhere</div>
        <p className='text-center text-base text-gray-300 max-w-xs md:text-lg md:max-w-lg'>Fylo stores all your most important files in one secure location. Access them wherever you need, share and collaborate with friends family and coworkers.</p>
        <CTABTN btntext="Get Started" />
    </div>
  )
}

export default Hero