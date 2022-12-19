import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { decrement, increment, incrementAsync, reset, selectCount } from './counterSlice';


const Counter = () => {

    const count = useSelector(selectCount);
    const dispatch= useAppDispatch();

    return (
        <div>
            <h1>{count}</h1>
            <div>
                <button onClick={()=>dispatch(increment())}>increment</button>
                <button onClick={()=>dispatch(decrement())}>decrement</button>
                <button onClick={()=>dispatch(reset())}>Reset</button>
                <button onClick={()=>dispatch(incrementAsync(2))} >Increment By 2</button>
            </div>
        </div>
    )
}

export default Counter;