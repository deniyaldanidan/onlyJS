import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    increment,
    decrement,
    incrementByAsync,
    incrementByAmount,
    selectCount
} from './counterSlice';

const Counter = ()=>{
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incAmt, setIncAmt] = useState('2');

    return (
        <div>
            <div className="sub-sec">
                <button onClick={()=>dispatch(decrement())}>Decrement</button>
                <div className="showcase">{count}</div>
                <button onClick={()=>dispatch(increment())} >Increment</button>
            </div>
            <div className="sub-sec">
                <input type="text" value={incAmt} onChange={e=>setIncAmt(e.target.value)} />
                <button onClick={()=>dispatch(incrementByAmount(Number(incAmt) || 0))} >Fast Increment</button>
                <button onClick={()=>dispatch(incrementByAsync((Number(incAmt) || 0)))} >Slow Increment</button>
            </div>
        </div>
    )
}

export default Counter;