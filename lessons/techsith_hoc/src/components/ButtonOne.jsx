import React from 'react'
import stylesWrapper from '../hoc/stylesWrapper';

const ButtonOne = (props) => {
  return (
    <button style={props.styles}>I am Button 1</button>
  )
}

export default stylesWrapper(ButtonOne)