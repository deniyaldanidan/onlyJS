import React, { useCallback, useState } from 'react'

const MyChild1 = ({clickHandle})=>{
  return (
    <>
      <h1>Hello, I'm a child</h1>
      <button onClick={clickHandle}>Hello</button>
    </>
  )
}

const MemoisedChild = React.memo(MyChild1);
// MemoisedChild won't render when the state changes but MyChild1 will rerender when the state changes
// you can still give custom equal-prop-checks as a second argument
// But if the child got a callback from the parent the Memo doesn't work.
// To solve the above problem use useCallback to avoid re-rendering of the callbacks.

const Memoised1 = () => {
  const [myVal, setMyVal] = useState(0);

  const clickHandle = useCallback(()=>{
    console.log("Clicked");
  }, []);

  return (
    <>
      <button onClick={()=>setMyVal(prev=>prev+1)} >{myVal}</button>
      {/* <MyChild1 clickHandle={clickHandle}/> */}
      <MemoisedChild clickHandle={clickHandle} />
    </>
  )
}



export default Memoised1