import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from './components/Login';
import Register from './components/Register';
import LinksPage from './components/LinksPage'


function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/links" element={<LinksPage/>} />
        </Route>
      </Routes>
  );
}

export default App;
