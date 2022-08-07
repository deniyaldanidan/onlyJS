import React from 'react'
import {FaTwitter, FaLinkedinIn} from 'react-icons/fa';
import footerLogo from '../../assets/saascommunity-logo-white.png';
import FooterBlogs from './FooterBlogs';

const Primary = () => {
  
    return (
        <div className="pri-footer">
            <div className="col-1 col">
                <div className="contact pri-row">
                    <div className="pri-head">Contact</div>
                    <div className="address">
                        <span>Chamber of commerce: 75983591</span>
                        <span>Amsterdam, Netherlands</span>
                        <span className="email">support@saascommunity.com</span>
                    </div>
                </div>
                <div className="social pri-row">
                    <div className="pri-head">Social</div>
                    <div className="socials">
                        <span className="linkedin social-icon"><FaLinkedinIn/></span>
                        <span className="twitter social-icon"><FaTwitter/></span>
                    </div>
                </div>
                <div className="footer-logo">
                    <img src={footerLogo}  alt="logo" />
                </div>
            </div>

            <div className="col-2 col">
                <div className="pri-row">
                    <div className="pri-head">Our database</div>
                    <div className="row-list">
                        <a href="/">Saas Companies</a>
                        <a href="/">Saas Investors</a>
                        <a href="/">Saas Jobs</a>
                    </div>
                </div>
                <div className="pri-row">
                    <div className="pri-head">SaaS Community</div>
                    <div className="row-list">
                        <a href="/">About</a>
                        <a href="/">Blog</a>
                        <a href="/">Join</a>
                        <a href="/">Matching service</a>
                    </div>
                </div>
            </div>

            <div className="col-3 col">
                <div className="pri-row">
                    <div className="pri-head">Latest Posts</div>
                    <FooterBlogs />
                </div>
            </div>
        </div>
  )
}

export default Primary