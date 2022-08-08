import React, {useState, useRef, useEffect} from 'react';
import '../../../styles/header.scss'
import BottomHeader from './BottomHeader'
import TopHeader from './TopHeader';

const Header = () => {
    const [sticky, setSticky] = useState(false);
    const headerRef = useRef(null);

    useEffect(()=>{
        const scrollEvent = ()=>{
            const headerBound = headerRef.current.getBoundingClientRect();
            const headerViewRatio = headerBound.bottom/headerBound.height;
            // console.log(headerViewRatio);
            setSticky(headerViewRatio<0.4);
        }
        window.addEventListener("scroll", scrollEvent);
        return ()=>window.removeEventListener("scroll", scrollEvent);
    }, [])

  return (
    <div className='header' ref={headerRef}>
        <TopHeader/>
        <BottomHeader sticky={sticky}/>
    </div>
  )
}

export default Header