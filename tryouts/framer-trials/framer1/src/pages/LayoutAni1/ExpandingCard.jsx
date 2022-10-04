import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

const Card = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    background-color: white;
    color: black;
    border-radius: 80px;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 500ms ease-in-out;

    &.active{
        width: 450px;
        height: 300px;
    }
`

const ExpandingCard = ({children})=>{
    const [active, setActive] = useState(false);
    const toggActive = ()=>setActive(prev=>!prev);

    return (
        <Card className={active ? "active" : ""} onClick={toggActive} layout>
            {children}
        </Card>
    );
}

export default ExpandingCard;