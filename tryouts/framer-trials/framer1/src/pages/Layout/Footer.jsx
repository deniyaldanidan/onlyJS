import React from 'react';
import {Link} from 'react-router-dom';
import {RiFacebookFill, RiDribbbleLine, RiTwitterFill, RiLinkedinFill, RiInstagramFill} from 'react-icons/ri';

const Footer = () => {
  return (
    <div className="footer">
        <div className="primary">
            <div className="footer-logo-div">
              <span className='footer-logo-main'>
                Frame Me
              </span>
              <span className='footer-logo-sub'>We'll Frame Everything</span>
            </div>
        </div>
        <div className="secondary">
            <div className="socials">
              <div className="social-icon-wrapper">
                <RiFacebookFill className='social-icon'/>
              </div>
              <div className="social-icon-wrapper">
                <RiDribbbleLine className='social-icon'/>
              </div>
              <div className="social-icon-wrapper">
                <RiTwitterFill className='social-icon'/>
              </div>
              <div className="social-icon-wrapper">
                <RiLinkedinFill className='social-icon'/>
              </div>
              <div className="social-icon-wrapper">
                <RiInstagramFill className='social-icon'/>
              </div>
            </div>
            <div className="footer-menus">
              <Link to="/" className='footer-menu'>Home</Link>
              <Link to="/about" className='footer-menu'>About</Link>
              <Link to="/blogs" className='footer-menu'>Blogs</Link>
              <Link to="/shop" className='footer-menu'>Shop</Link>
              <Link to="/jobs" className='footer-menu'>Jobs</Link>
            </div>
            <div className="footer-menus">
              <Link to="/privacy" className='footer-menu'>Privacy Policy</Link>
              <Link to="/terms" className='footer-menu'>Terms and conditions</Link>
              <Link to="/cookie-policy" className='footer-menu'>Cookie Policy</Link>
              <Link to="/faq" className='footer-menu'>FAQ</Link>
              <Link to="/extras" className='footer-menu'>Extras</Link>
            </div>
        </div>
        <div className="teritiary">&copy; 2022. All rights reserved</div>
    </div>
  )
}

export default Footer