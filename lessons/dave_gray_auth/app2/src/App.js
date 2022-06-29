import Register from "./components/Register";
import Login from "./components/Login";
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";


const ROLES = {
  'USER': 2001,
  'EDITOR': 1984,
  'ADMIN': 5150
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            {/* Allowed Only for All with basic user privilege */}
            <Route element={<RequireAuth allowedRoles={[ROLES.USER]}/>}>
              <Route path="/" element={<Home />} />
            </Route>
            {/* Editor Route */}
            <Route element={<RequireAuth allowedRoles={[ROLES.EDITOR]}/>}>
              <Route path="editor" element={<Editor />} />
            </Route>
            {/* Admin Route */}
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]}/>}>
              <Route path="admin" element={<Admin />} />
            </Route>
            {/* Route For Both Admin and Editor */}
            <Route element={<RequireAuth allowedRoles={[ROLES.EDITOR, ROLES.ADMIN]}/>}>
              <Route path="lounge" element={<Lounge />} />
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
