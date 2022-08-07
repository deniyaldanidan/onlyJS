import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';


function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />} >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
