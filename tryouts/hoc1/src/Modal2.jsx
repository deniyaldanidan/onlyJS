import React from 'react'
import modalWrapper from './modalWrapper'

const Modal2 = (props) => {
  return (
    <div className='modal'>{props.type} 2</div>
  )
}

export default modalWrapper(Modal2)