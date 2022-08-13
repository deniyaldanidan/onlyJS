import React from 'react'
import IllustrationShowcase from './IllustrationShowcase';
import investIllus from '../../assets/illustrations/llustration-investor.png';


const headText = "Add your investment listing";
const paraText = "Find the right SaaS investment opportunities. Get meaningful introductions and connections. Create your investment page now.";

const AddInvestment = () => {
  return (
    <div className='add-investment-sec'>
        <div className="container-md">
            <IllustrationShowcase illustSrc={investIllus} head={headText} para={paraText} reverse={true} />
        </div>
    </div>
  )
}

export default AddInvestment;