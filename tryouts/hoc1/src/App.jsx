import React, {useState} from "react";
import Modal1 from "./Modal1";
import Modal2 from "./Modal2";


function App() {
  const [mod1, setMod1] = useState(false);
  const [mod2, setMod2] = useState(false);

  return (
    <div className="App">
      <div className="btns">
        <button onClick={()=>setMod1(prev=>!prev)}>BTN-1</button>
        <button onClick={()=>setMod2(prev=>!prev)} >BTN-2</button>
        {mod1 && <Modal1 />}
        {mod2 && <Modal2/>}
      </div>
    </div>
  );
}

export default App;
