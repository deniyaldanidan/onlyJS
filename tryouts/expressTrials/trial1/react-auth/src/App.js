import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import { Routes, Route } from 'react-router-dom';
import RequiredAuth from './components/RequiredAuth';

const ROLES = {
  user: 2001,
  editor: 1984,
  admin: 5150
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* public routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='linkpage' element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* USER routes */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.user]} />}>
          <Route path='/' element={<Home />} />
        </Route>
        {/* Editor Routes */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.editor]} />} >
          <Route path='editor' element={<Editor />} />
        </Route>
        {/* Admin Routes */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.admin]} />} >
          <Route path='admin' element={<Admin />} />
        </Route>
        {/* Admin, Editor Routes */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.editor, ROLES.admin]} />} >
          <Route path='lounge' element={<Lounge />} />
        </Route>

        {/* 404 */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
