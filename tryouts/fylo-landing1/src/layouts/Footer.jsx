import React from 'react'
import logo from '../imgs/logo.svg';
import locationIcon from '../imgs/icon-location.svg';
import phoneIcon from '../imgs/icon-phone.svg';
import emailIcon from '../imgs/icon-email.svg';
import {TiSocialFacebook, TiSocialTwitter,  TiSocialInstagram} from 'react-icons/ti';



const Footer = () => {
  return (
    <div className='mx-auto pt-52 pb-16 -my-28 bg-dBlueFooter px-12 lg:-my-20 lg:px-20'>
        <div>
            <img src={logo} alt="" className='' />
        </div>

        <div className='mt-10 text-gray-300 flex flex-col gap-y-12 items-start lg:flex-row lg:justify-between'>

            <div className='flex items-start text-sm gap-x-4 lg:w-1/4'>
                <img src={locationIcon} alt="" />
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>
            </div>
            
            <div className='flex flex-col gap-12 lg:gap-8'>
                <div className='flex items-center text-sm gap-x-4'>
                    <img src={phoneIcon} alt="" />
                    <span>+1-543-123-4567</span>
                </div>
                <div className='flex items-center text-sm gap-x-4'>
                    <img src={emailIcon} alt="" />
                    <span>example@fylo.com</span>
                </div>
            </div>

            <div className='flex flex-col gap-y-3'>
                <a href="/" className='text-sm hover:text-white hover:font-semibold'>About Us</a>
                <a href="/" className='text-sm hover:text-white hover:font-semibold'>Jobs</a>
                <a href="/" className='text-sm hover:text-white hover:font-semibold'>Press</a>
                <a href="/" className='text-sm hover:text-white hover:font-semibold'>Blog</a>
            </div>

            <div className='flex flex-col gap-y-3'>
                <a href="/" className='text-sm hover:text-white hover:font-semibold'>Contact US</a>
                <a href="/" className='text-sm hover:text-white hover:font-semibold'>Terms</a>
                <a href="/" className='text-sm hover:text-white hover:font-semibold'>Privacy</a>
            </div>
            
            <div className='text-white text-xl flex mx-auto justify-center items-center gap-x-4 lg:mx-0'>
                <TiSocialFacebook/>
                <TiSocialTwitter/>
                <TiSocialInstagram/>
            </div>
        </div>
    </div>
  )
}

export default Footer