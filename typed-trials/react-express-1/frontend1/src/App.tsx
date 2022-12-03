import React from "react";
import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add";
import Home from "./Pages/Home";
// import ShowMsg from "./components/ShowMsg";
import TaskApp from "./Pages/TaskApp";



const App: React.FC = () => {
  return (
    <>
      {/* <ShowMsg msg="Hello World" year={2022} /> */}
      <Routes>
        <Route path="/" element={<TaskApp />}>
          <Route index element={<Home />} />
          <Route path="/add" element={<Add />} />

          
          <Route path="*" element={<h1>Sorry, Page Not Found</h1>} />
        </Route>
      </Routes>

    </>
  )
}

export default App;
