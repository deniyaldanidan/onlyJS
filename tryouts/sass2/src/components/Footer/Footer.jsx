import React from 'react';
import '../../styles/footer.scss';
import CTA from './CTA';
import Primary from './Primary';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container-md">
        <CTA/>
        <Primary />
        <div className="secondary-footer">
          <div className="rights">&copy; SaaScommunity.com 2021. All rights reserved.</div>
          <div className="terms">
            <a href="/">Terms and conditions</a>
            <a href="/">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer