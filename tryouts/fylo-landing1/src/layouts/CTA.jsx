import React from 'react'
import CTABTN from '../components/CTABTN'

const CTA = () => {
  return (
    <div className='container mx-auto mt-16 max-w-sm bg-dBlueIntro px-12 pt-8 pb-10 relative z-10 md:max-w-lg lg:max-w-3xl' >
        <div className='text-white text-center text-lg font-bold lg:text-3xl'>Get early access today</div>
        <div className='text-gray-300 mx-auto my-5 text-center text-sm max-w-xl'>It only takes a minute to sign up and our free starter tier is extremely generous. If you have any questions, our support team would be happy to help you.</div>
        <div className='flex justify-center items-center gap-5 flex-col lg:flex-row'>
            <input type="email" placeholder='email@example.com' className='rounded-full w-full px-8 py-3 lg:w-3/5' />
            <CTABTN btntext="Get Started For Free" primary={false} />
        </div>
    </div>
  )
}

export default CTA