import React from "react";
import BtnCnt from "./BtnCnt";
import ErrChild from "./ErrChild";
import Modal1 from "./Modal1";
import Modal2 from "./Modal2";
import MyErrorBoundary from "./MyErrorBoundary";


function App() {

  return (
    <div className="App">
      <div className="btns">
        <MyErrorBoundary>
          <ErrChild />
          <BtnCnt render={(show)=>(show && <Modal1 />)} text="BTN-1" />
        </MyErrorBoundary>
        <BtnCnt render={(show)=>(show && <Modal2 />)} text="BTN-2" />
      </div>
    </div>
  );
}

export default App;
