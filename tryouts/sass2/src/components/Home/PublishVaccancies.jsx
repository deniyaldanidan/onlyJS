import React from 'react'
import IllustrationShowcase from './IllustrationShowcase';
import companyIllus from '../../assets/illustrations/illustration-companies.png';


const headText = "Publish your vacancies";
const paraText = "Reach thousands of SaaS enthousiasts who are looking for a new job. This is the #1 jobs board focussed on SaaS.";

const PublishVaccancies = () => {
  return (
    <div className='pub-vacc-sec'>
        <div className="container-md">
            <IllustrationShowcase illustSrc={companyIllus} head={headText} para={paraText} />
        </div>
    </div>
  )
}

export default PublishVaccancies;