import React from 'react'
import {FaLinkedinIn, FaTwitter} from 'react-icons/fa';

const TopHeader = () => {
  return (
    <div className='top-header'>
        <div className="top-email">support@saascommunity.com</div>
        <div className="top-socials">
            <span className="linkedin social-icon-sm"><FaLinkedinIn/></span>
            <span className="twitter social-icon-sm"><FaTwitter/></span>
        </div>
    </div>
  )
}

export default TopHeader