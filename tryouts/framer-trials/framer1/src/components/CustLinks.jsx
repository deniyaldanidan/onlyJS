import { motion } from 'framer-motion';
import {Link} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';

const anime1 = keyframes`
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(1.25);
    }
    100%{
        transform: scale(1);
    }
`;

export const CLink1 = styled(Link)`
    display: block;
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: 600;
    color: inherit;

    &:hover{
        animation: ${anime1} 1.5s ease-in-out infinite;
    }
`;

export const FloatingLink = styled(CLink1)`
    position: fixed;
    bottom: 40px;
    left: 40px;
    padding: 1rem 2rem;
    background-color: rgba(0,0,0, 0.5);
    border-radius: 20px;
`;

export const MotionLink = motion(Link);