import React from 'react'
import SearchBox from '../tools/SearchBox'

const Hero = () => {
  return (
    <div className='hero-sec'>
        <div className="intro-sec">
            <div className="intro-big">Find SaaS companies investors and jobs</div>
            <div className="intro-sm">All around the globe</div>
        </div>
        <div className="search-sec">
            <div className="search-opts">
                <div className="search-opt">SaaS Database</div>
                <div className="search-opt">SaaS Investors</div>
                <div className="search-opt">SaaS Jobs</div>
            </div>
            <SearchBox/>
        </div>
    </div>
  )
}

export default Hero