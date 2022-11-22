import styled, { css } from 'styled-components';

const MyInput = styled.input`
    display: block;
    width: 100%;
    font-size: 1.25rem;
    padding: ${props => props.textArea ? "7.5px 10px" : "5px 7.5px"};
    outline: none;
    border: none;
    background-color: #222;
    color: #fff;
    margin-bottom: 12px;

    ${props => props.textArea && css`
    height: 210px;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    padding: 7.5px 10px;
    line-height: 1.5rem;
      
    &::-webkit-scrollbar{
        display: none;
    }

    `}
`;

export default MyInput