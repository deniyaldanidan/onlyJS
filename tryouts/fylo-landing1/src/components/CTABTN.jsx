import React from 'react'

const CTABTN = ({btntext, primary=true}) => {
  return (
    <button className={`text-white btn-grad font-semibold rounded-full ${primary ? 'py-4 px-24' : 'w-full lg:w-fit py-3 px-6'}`} >{btntext}</button>
  )
}

export default CTABTN