import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from './components/Login';
import Register from './components/Register';
import LinksPage from './components/LinksPage'
import ProtectedLayout from "./components/ProtectedLayout";
import Wrapper from "./styledComponents/Wrapper";
import { H2BTN } from "./styledComponents/Btns";
import Unauthorized from "./components/Unauthorized";
import { IoHome } from 'react-icons/io5';
import AllBlogs from "./components/blogs/AllBlogs";
import GetBlog from "./components/blogs/GetBlog";
import NewBlog from "./components/blogs/NewBlog";
import ROLES_LIST from "./ROLES_LIST";
import EditBlog from "./components/blogs/EditBlog";
import DeleteBlog from "./components/blogs/DeleteBlog";


const Page404 = () => {

  return (
    <Wrapper>
      <h1>404 Not Found</h1>
      <H2BTN as={Link} to="/"><IoHome /></H2BTN>
    </Wrapper>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedLayout Allowed_Roles={[ROLES_LIST.User]} />}>
          {/* Routes for Authenticated Users */}
          <Route path="/links" element={<LinksPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blog/:id" element={<GetBlog />} />
        </Route>

        <Route element={<ProtectedLayout Allowed_Roles={[ROLES_LIST.Admin]} />}>
          {/* Routes for Admin Only */}
          <Route path="/delete-blog" element={<DeleteBlog/>} />
        </Route>

        <Route element={<ProtectedLayout Allowed_Roles={[ROLES_LIST.Editor, ROLES_LIST.Admin]} />}>
          {/* Routes for both Editor & Admin */}
          <Route path="/create-blog" element={<NewBlog />} />
          <Route path="/edit-blog" element={<EditBlog/>} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
