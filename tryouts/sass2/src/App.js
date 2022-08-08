import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';


function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
