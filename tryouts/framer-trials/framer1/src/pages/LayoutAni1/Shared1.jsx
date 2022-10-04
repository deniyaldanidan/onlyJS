import React, {useState} from 'react';
import {motion} from 'framer-motion'
import styled from 'styled-components';

const myList = ["Apple", "Mango", "Grapes", "PineApple", "Banana", "Guava"];

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 750px;
    border-radius: 30px;
    gap: 2.5rem;
    padding: 2.5rem;
    background-color: #000;
`
const Box = styled.div`
    position: relative;
    text-align: center;
    padding: 1rem 2.5rem;
    font-size: 1.25rem;
    background-color: white;
    color: black;
    cursor: pointer;
`

const Border = styled(motion.div)`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: #d5c 2.5px solid;
    z-index: 1;
`

const Shared1 = ()=>{
    const [selected, setSelected] = useState(myList[0])

    return (
        <Container>
            {
                myList.map((fruit)=>(
                    <Box key={fruit} onClick={()=>setSelected(fruit)}>
                        <span>
                            {fruit}
                        </span>
                        {selected===fruit && <Border layoutId="underline" />}
                    </Box>
                ))
            }
        </Container>
    );
}

export default Shared1;