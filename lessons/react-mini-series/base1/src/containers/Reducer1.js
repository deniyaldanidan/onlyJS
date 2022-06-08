import {useReducer, useState} from 'react'

// const initialState = {count:0};
// Used Lazy loading
function init(initial){
    return {count: initial};
}

function reducer(state, action){
    switch (action.type) {
        case 'increment':
            return {count: state.count+1};
        case 'decrement':
            return state.count<=0 ? {count:0} : {count: state.count-1};
        case 'incrementBy':
            return {count: state.count + action.payload}
        case 'reset':
            return init(action.payload);
        default:
            throw new Error();
    }
}

const Reducer1 = ({initial}) => {
    const [state, dispatch] = useReducer(reducer, initial, init);
    const [input, setInput] = useState(0);
  
    return (
        <>
            <p>{state.count}</p>
            <button onClick={()=>dispatch({type: "increment"})}>Increment</button>
            <button onClick={()=>dispatch({type:"decrement"})} >Decrement</button>
            <button onClick={()=>dispatch({type: "reset", payload:initial})} >Reset</button>
            <fieldset>
                <legend>Increment By</legend>
                <input type="number" value={input} onChange={e=>setInput(parseInt(e.target.value))} min={0} />
                <button onClick={()=>dispatch({type: "incrementBy", payload: input})}>Done</button>
            </fieldset>
        </>
    )
}

export default Reducer1