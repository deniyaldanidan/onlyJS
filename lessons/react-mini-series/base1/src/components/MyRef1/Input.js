import React, { useId, useImperativeHandle, useRef } from 'react';

const Input = ({placeholder, type, onKeyDown}, ref) => {
  const inputRef = useRef(null);
  const inpId = useId()
  useImperativeHandle(ref, ()=>({
    focus: ()=>{
      inputRef.current.focus();
    }
  }));

  return (
    <div>
      <label htmlFor={inpId} >{placeholder}</label>
      <input type={type} id={inpId} placeholder={placeholder} onKeyDown={onKeyDown} ref={inputRef} />
    </div>
  );
}

const ForwardInput =  React.forwardRef(Input)

export default ForwardInput;