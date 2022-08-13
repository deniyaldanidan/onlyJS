import React from 'react'
import joinsrc from '../../assets/illustrations/illustration-companies.png';
import IllustrationShowcase from './IllustrationShowcase';

const headText = "Add your company listing";
const paraText = "Start collecting traffic and get your product or service in front of the thousands of buyers. Add your listing to the SaaS database for free.";

const Join = () => {
  return (
    <div className='join-sec'>
        <div className="container-md">
            <div className="join-intro">Join our growing SaaS community</div>
            <IllustrationShowcase illustSrc={joinsrc} head={headText} para={paraText} />
        </div>
    </div>
  )
}

export default Join