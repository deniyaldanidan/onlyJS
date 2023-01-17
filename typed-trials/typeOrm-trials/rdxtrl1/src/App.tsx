import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import ProtectedRoutesWrapper from "./Components/ProtectedRoutesWrapper";
import AddIdea from "./pages/AddIdea";
import EditIdea from "./pages/EditIdea";
import Home from "./pages/Home";
import IdeaView from "./pages/IdeaView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TestPage from './pages/TestPage';
import UsersList from "./pages/UsersList";
import ViewUserProfile from "./pages/ViewUserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Unprotected-Routes */}
        <Route index element={<Home />} />
        <Route path="/idea/:id" element={<IdeaView />} />
        <Route path="/users-list" element={<UsersList />} />
        <Route path="/view-profile/:username" element={<ViewUserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        
        {/*  Protected-routes */}
        <Route element={<ProtectedRoutesWrapper />}>
          <Route path="/add-idea" element={<AddIdea />} />
          <Route path="/edit-idea" element={<EditIdea />} />
          <Route path="/test-page" element={<TestPage />} />
        </Route>

        <Route path="*" element={<div className="info-bar">404 Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
