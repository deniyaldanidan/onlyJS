// import ContextExample1 from "./containers/ContextExample1";
// import Reducer1 from "./containers/Reducer1";
// import MyRef1 from "./containers/MyRef1";
// import Memoised1 from "./containers/Memoised1";
// import MemoHook from "./containers/MemoHook";
// import LayoutHook from "./containers/LayoutHook";
// import DefferedHook from "./containers/DefferedHook";
// import ClickSim1 from "./components/ClickSim1";
// import Draggable1 from "./containers/Draggable1";

import Peoples from "./containers/Peoples";

// import {useState} from 'react';
// import useLocalStorage from './hooks/useLocalStorage';


function App() {

  // const [name, setName] = useLocalStorage("name", "")
  
  return (
    <>
      {/* <ContextExample1 /> */}
      {/* <MyRef1 /> */}
      {/* <Reducer1 initial={1} /> */}
      {/* <Memoised1 /> */}
      {/* <MemoHook /> */}
      {/* <LayoutHook /> */}
      {/* <DefferedHook /> */}
      {/* <input type="text" value={name} onChange={e=>setName(e.target.value)}  /> */}
      {/* <ClickSim1 /> */}
      {/* <Draggable1 /> */}
      <Peoples />
      
    </>
  );
}

export default App;
