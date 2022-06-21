import React from 'react'
import { useState } from 'react'

const ErrChild = () => {
    const [error, setError] = useState(false)

    if(error){
        throw new Error("An Error Happened");
    }


    return (
        <>
            <button className='errBTN' onClick={()=>setError(true)}>Don't Click this Button</button>
        </>
    )
}

export default ErrChild