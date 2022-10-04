import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Showcaser1 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 4rem;
    padding: 2rem;
    min-height: 85vh;
`;

export const MainShow = styled(Showcaser1)`
    min-height: 95vh;
    font-size: 3.5rem;
    font-weight: 700;
    color: #a5c9ca;
`

export const CircleBox = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    font-size: 1.25rem;
    font-weight: 600;
    text-transform: capitalize;
    text-align: center;
    background-color: white;
    color: #101;
    cursor: pointer;
`

export const CircleBoxWithHandle = styled(CircleBox)`
    position: relative;
    cursor: default;

    .handle{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 5px;
        padding: 6px 8px;
        font-size: 1rem;
        font-weight: 400;
        background-color: #ccc;
        border-radius: 2px;
        color: black;
        cursor: pointer;
    }
`