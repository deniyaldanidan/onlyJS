import React from 'react'
import illustration from '../imgs/illustration-stay-productive.png';
import arrow from '../imgs/icon-arrow.svg'


const Info = () => {
  return (
    <div className='container flex flex-col gap-14 justify-center items-center mx-auto px-5 pt-16 py-24 md:flex-row md:px-8'>
        <div><img src={illustration} alt="" /></div>
        <div className='flex flex-col items-start gap-y-6'>
            <div className="text-white text-left text-2xl md:text-4xl font-bold md:max-w-sm">Stay Productive, wherever you are</div>
            <div className="text-gray-300 text-lg">Never let location be an issue when accessing your files. Fylo has you covered for all of your file storage needs.</div>
            <div className="text-gray-300 text-lg">Securely share files and folders with friends, family and colleagues for live collaboration. No email attachments required.</div>
            <a href='/' className="text-cyan-300 inline-flex items-center gap-x-1 border-b-2 border-b-cyan-300 hover:text-white hover:border-b-white">See how Fylo works <img src={arrow} className="h-full" alt="" /></a>
        </div>
    </div>
  )
}

export default Info