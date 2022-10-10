import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { CenteredShow1, CLink1 } from './components/Showcasers';
import Nav1 from './pages/Nav1';
import Rough1 from './pages/Rough1';


const Home = ()=>{
  return (
    <CenteredShow1 column={true}>
      <div style={{fontSize:"2.5rem", fontWeight:600}}>Home-Page</div>
      <CenteredShow1>
        <CLink1 to="/rough">Rough-1</CLink1>
        <CLink1 to="/nav1">Nav-1</CLink1>
        <CLink1 to="/nav2">Nav-2</CLink1>
      </CenteredShow1>
    </CenteredShow1>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/rough" element={<Rough1 />} />
      <Route path="/nav1" element={<Nav1/>} />
      <Route path="/nav2" element={<></>} />

      <Route path="*" element={<CenteredShow1>404 Not Found</CenteredShow1>} />
    </Routes>
  );
}

export default App;
