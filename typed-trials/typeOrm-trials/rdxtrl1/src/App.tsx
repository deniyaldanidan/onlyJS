// import Counter from './features/counter/Counter';

import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import AddIdea from "./pages/AddIdea";
import EditIdea from "./pages/EditIdea";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>} />
        <Route path="/add-idea" element={<AddIdea/>} />
        <Route path="/edit-idea" element={<EditIdea/>} />

        <Route path="*" element={<div className="info-bar">404 Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
