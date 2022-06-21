import React from 'react'
import modalWrapper from './modalWrapper'

const Modal1 = (props) => {
  return (
    <div className='modal' >{props.type} 1</div>
  )
}

export default modalWrapper(Modal1);