import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const CenteredShow1 = styled.div`
    display: flex;
    flex-direction: ${(props)=>props.column ? "column" : "row"};
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 85%;
    margin: 50px auto;
    font-size: 1.5rem;
    gap: 40px;
`

export const FakeSection1 = styled(CenteredShow1)`
    width: 100%;
    max-width: 100%;
    margin: 0;
    font-size: 2.5rem;
    min-height: 110vh;
    background-color: #1d272c;
`

export const CLink1 = styled(Link)`
    display: ${props => props.block ? "block" : "default"};
    font-size: ${props => props.fontSize ? props.fontSize : "inherit"};
    font-weight: 500;
    color: ${props => props.color ? props.color : "inherit"};
    text-decoration: none;
    transition: all 500ms ease-in-out;

    &:hover{
        transform: scale(1.1);
    }
`