import {useEffect, useLayoutEffect} from 'react'

const LayoutHook = () => {

    useEffect(()=>console.log("Hey I'm useEffect"), [])
    useLayoutEffect(()=>console.log("I'm Layout Effect"), [])

    return (
        <div>useLayoutEffectHook fires before the useEffect</div>
    )
}

export default LayoutHook