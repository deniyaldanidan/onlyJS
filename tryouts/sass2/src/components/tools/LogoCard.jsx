import React from 'react'

const LogoCard = ({logosrc, logoname}) => {

  const clickHandler = ()=>console.log(`Clicked ${logoname}`)

  return (
    <div className="logo-card" onClick={clickHandler}>
        <img src={logosrc} alt="logo" />
        <div className="logo-text-block">
            <div className="logo-inner">
                <div className="logo-name">{logoname}</div>
                <div className="logo-tick"><span></span></div>
            </div>
        </div>
    </div>
  )
}

export default LogoCard