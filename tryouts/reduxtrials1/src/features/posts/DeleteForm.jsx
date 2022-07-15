import React from 'react'
import { createPortal } from 'react-dom'

const DeleteForm = ({closePort, postName, submitHandler})=>{
    return createPortal((
        <div className="delete-form">
            <div className="delete-info">Do you want to delete post " {postName} " ?</div>
            <div className="delete-btns">
                <button onClick={closePort} >Cancel</button>
                <button onClick={submitHandler} >Delete</button>
            </div>
        </div>
    ), document.getElementById("pop-port1"));
}

export default DeleteForm;