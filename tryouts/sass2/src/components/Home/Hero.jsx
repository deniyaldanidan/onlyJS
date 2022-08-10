import React, {useMemo, useState} from 'react'
import CompanySearch from '../tools/CompanySearch';
import IndustrySearch from '../tools/IndustrySearch';
import JobSearch from '../tools/JobSearch';

const myOpts = {
  dataopt: "SaaS Database",
  investopt: "SaaS Investors",
  jobopt: "SaaS Jobs"
}

const Hero = () => {

  const [selectOpt, setSelectOpt] = useState(Object.keys(myOpts)[0]);
  const renderSearch = useMemo(()=>{
    if (selectOpt===Object.keys(myOpts)[0]){
      return <CompanySearch/>;
    }
    if (selectOpt===Object.keys(myOpts)[1]){
      return <IndustrySearch/>;
    }
    if (selectOpt===Object.keys(myOpts)[2]){
      return <JobSearch/>;
    }
  }, [selectOpt])

  return (
    <div className='hero-sec'>
        <div className="intro-sec">
            <div className="intro-big">Find SaaS companies investors and jobs</div>
            <div className="intro-sm">All around the globe</div>
        </div>
        <div className="search-sec">
            <div className="search-opts">
                {Object.keys(myOpts).map((key, index)=>(<div className={`search-opt ${(selectOpt===key) ? "selected-opt" : ""}`} key={key} onClick={()=>setSelectOpt(key)}>{myOpts[key]}</div>))}
            </div>
            {renderSearch}
        </div>
    </div>
  )
}

export default Hero