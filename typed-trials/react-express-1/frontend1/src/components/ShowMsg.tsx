import React, { useState } from 'react';

type ShowMsgProps = {
    msg: string,
    year: number,
    // children?: React.ReactNode
}

const ShowMsg = ({ year, msg }: ShowMsgProps): JSX.Element => {
    const [num, setNum] = useState<number>(year)

    const clickHandler = (): void => {
        setNum(prev => prev + 1)
    }

    return <>
        <div>{msg}. This is {num}</div>
        <button onClick={clickHandler}>nextYear</button>
    </>
}

export default ShowMsg;