import styled from 'styled-components';

type Props = {
    dark:boolean
}

const TextAreaStyled = styled.textarea<Props>`
    font-size: 1.15rem;
    /* line-height: 1.65rem; */
    padding: 30px;
    height: 50ch;
    width: 100%;
    resize: none;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    text-align: justify;
    background-color: ${props=> props.dark ? "#9795a4" : "#eeeef5" };
    border: none;
    outline: none;
    border-bottom: ${props=>props.dark ? "#1c1728" :'#9c99aa'} 2px solid;
    border-radius: 15px;

    &::-webkit-scrollbar{
        display: none;
    }

    &::placeholder{
        color: ${props=>props.dark ? "#444" : '#777'};
        opacity: 1;
    }

    &::-ms-input-placeholder{
        color: ${props=>props.dark ? "#444" : '#777'};
    }

`;

export default TextAreaStyled;