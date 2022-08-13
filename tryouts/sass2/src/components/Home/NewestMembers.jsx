import React from 'react'
import LogoSlider from './LogoSlider'


const NewestMembers = () => {
  return (
    <div className="newest">
        <div className="newest-header">
            <div className="newest-title">Newest Members</div>
            <div className="newest-sub">Thousands of SaaS ethusiasts like you. These are our newest members.</div>
        </div>
        <LogoSlider/>
    </div>
  )
}

export default NewestMembers