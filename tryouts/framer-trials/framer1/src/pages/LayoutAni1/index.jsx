import React, {useState} from 'react';
import { FloatingLink } from '../../components/CustLinks';
import SwitchBtn from '../../components/SwitchBtn';
import {BsFillMoonFill, BsFillSunFill} from 'react-icons/bs';
import { Showcaser1 } from '../../components/Showcasers';
import ExpandingCard from './ExpandingCard';
import Shared1 from './Shared1';


const LayoutAni1 = ()=>{
    const [btnState, setBtnState] = useState(false);

    const toggState = ()=>setBtnState(prev=>!prev);

    return (
        <>
            <div style={{position:"absolute", left:"50px", top: "50px"}}>
                <SwitchBtn 
                    btnState={btnState} 
                    toggState={toggState}
                    leftIcon={<BsFillSunFill />}
                    rightIcon={<BsFillMoonFill />} 
                />
            </div>
            <Showcaser1>
                <ExpandingCard>Card-1</ExpandingCard>
                <ExpandingCard>Card-2</ExpandingCard>
                <Shared1/>
            </Showcaser1>
            <FloatingLink to="/extras">Extras</FloatingLink>
        </>
    );
}

export default LayoutAni1;