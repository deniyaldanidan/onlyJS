import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import AddIdea from "./pages/AddIdea";
import EditIdea from "./pages/EditIdea";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TestPage from './pages/TestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/add-idea" element={<AddIdea/>} />
        <Route path="/edit-idea" element={<EditIdea/>} />
        <Route path="/test-page" element={<TestPage/>} />

        <Route path="*" element={<div className="info-bar">404 Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
