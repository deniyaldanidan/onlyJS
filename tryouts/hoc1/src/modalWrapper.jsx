import React from 'react';
import {createPortal} from "react-dom";

const translateProps = (props)=>{
    let type= "This is a Modal";
    const newProps = {...props, type:type};
    return newProps;
}

const modalWrapper = (WrapperComponent)=>{
    const modalPort = document.getElementById("modal-port");
    return function wrappedRender(args){
        const myEL = <WrapperComponent {...translateProps(args)} />
        return createPortal(myEL, modalPort);
    }
}
export default modalWrapper;