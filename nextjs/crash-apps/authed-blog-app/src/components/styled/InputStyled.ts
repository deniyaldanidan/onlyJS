import styled from 'styled-components';

type Props ={
    dark: boolean
}

const InputStyled = styled.input<Props>`
    font-size: 1.15rem;
    line-height: 1.15rem;
    padding: 8px 15px;
    width: 100%;
    background-color: ${props=> props.dark ? "#9795a4" : "#eeeef5" };
    border: none;
    outline: none;
    border-bottom: ${props=>props.dark ? "#1c1728" :'#9c99aa'} 2px solid;
    border-radius: 8px;

    &::placeholder{
        color: ${props=>props.dark ? "#444" : '#777'};
        opacity: 1;
    }

    &::-ms-input-placeholder{
        color: ${props=>props.dark ? "#444" : '#777'};
    }

`;

export default InputStyled;