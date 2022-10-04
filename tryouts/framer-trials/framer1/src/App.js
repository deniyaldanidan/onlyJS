import {Routes, Route, useLocation, Outlet} from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import './index.scss';
import Privacy from './pages/Privacy/Privacy';
import Parallax1 from './pages/Parallax1/Parallax1';
import Extras from './pages/Extras/Extras';
import Parallax2 from './pages/Parallax2';
import { MainShow } from './components/Showcasers';
import LayoutAni1 from './pages/LayoutAni1';
import {FloatingLink} from './components/CustLinks';
import ViewCard from './pages/LayoutAni2/ViewCard';
import LayoutAni2 from './pages/LayoutAni2';
import Drag1 from './pages/Drag1';
import Reorder1 from './pages/Reorder1';

function App() {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path='about' element={<MainShow>About-Page</MainShow>}/>
        <Route path='blogs' element={<MainShow>Blogs-Page</MainShow>}/>
        <Route path='shop' element={<MainShow>Shop-Page</MainShow>}/>
        <Route path="privacy" element={<Privacy/>} />
        <Route path="extras" element={<Extras/>} />
      </Route>
      
      <Route path='/parallax1' element={<Parallax1/>} />
      <Route path="/parallax2" element={<Parallax2/>} />
      <Route path="/layout1" element={<LayoutAni1 />} />
      
      <Route path="/layout2" element={<><Outlet/><FloatingLink to="/extras">Extras</FloatingLink></>}>
        <Route index element={<LayoutAni2 />} />
        <Route path="/layout2/:id" element={<ViewCard />} />
      </Route>
      <Route path="/drag1" element={<Drag1/>} />
      <Route path="/reorder1" element={<Reorder1/>} />
      
      <Route path='*' element={<MainShow>Error 404 not found</MainShow>}/>
    </Routes>
  );
}

export default App;
