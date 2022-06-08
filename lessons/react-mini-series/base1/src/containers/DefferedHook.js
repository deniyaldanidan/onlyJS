import {useMemo, useState, useDeferredValue} from 'react'

function List({input}){
    const LIST_SIZE = 20000;
    const defferedInput = useDeferredValue(input);
    const list = useMemo(()=>{
        const l = [];
        for (let i=0; i<LIST_SIZE; i++){
            l.push(<div key={i}>{defferedInput}</div>)
        }
        return l;
    }, [defferedInput])

    return list;
}


const DefferedHook = () => {

    const [input, setInput] = useState("");

  
    return (
    <>
        <input type="text" value={input} onChange={e=>setInput(e.target.value)} />
        <List input={input} />
    </>
    )
}

export default DefferedHook