import React from 'react'

const MyFeautre = ({icon, headText, bodyText}) => {
  return (
    <div className='flex flex-col items-center justify-center max-w-lg space-y-4'>
        <div><img src={icon} alt="" className="" /></div>
        <div className="text-white font-semibold text-xl text-center">{headText}</div>
        <div className="text-gray-300 text-base max-w-sm text-center leading-6">{bodyText}</div>
    </div>
  )
}

export default MyFeautre