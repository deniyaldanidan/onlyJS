import React, {useState} from 'react'
import '../../styles/cta.scss';
import { HiOutlineMail, HiOutlineMailOpen } from 'react-icons/hi';

const CTA = () => {
    const [hover, setHover] = useState(false);
  
    return (
        <div className="cta">
            <div className="head">
                Subscribe to our newsletter
            </div>
            <div className="email-col">
                <div className="email-box">
                    <input type="text" placeholder='Your email' />
                    <button onMouseEnter={e=>setHover(true)} onMouseLeave={e=>setHover(false)} >{hover ? <HiOutlineMailOpen/> : <HiOutlineMail/>}</button>
                </div>
                <div className="email-check">
                    <input type="checkbox" id='email-cta-check'/>
                    <label htmlFor='email-cta-check' >
                        I agree with the <a href="/">Privacy Policy</a>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CTA