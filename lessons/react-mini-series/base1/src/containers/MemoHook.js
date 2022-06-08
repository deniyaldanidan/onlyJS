import {useMemo, useState} from 'react'

const MemoHook = () => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);

    const num3 = useMemo(()=>bigFunction(num1), [num1]);
    
    return (
        <>
            <fieldset>
                <legend>Set 1</legend>
                <input type="number" value={num1} onChange={e=>setNum1(e.target.value)} />
                <div>Original: {num1}, Modified: {num3}</div>
            </fieldset>
            <fieldset>
                <legend>Set 2</legend>
                <input type="number" value={num2} onChange={e=>setNum2(e.target.value)} />
                <div>Value: {num2}</div>
            </fieldset>
        </>
    ) 
}

const bigFunction = (num)=>{
    for (let i=0; i<=10**9; i++) {}
    return num*2;
}

export default MemoHook