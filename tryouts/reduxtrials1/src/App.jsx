import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Counter from './features/counter/counter';
import Notifications from './features/notifications/Notifications';
import AddPost from './features/posts/AddPost';
import EditPost from './features/posts/EditPost';
import Main from './features/posts/Main';
import Posts from './features/posts/Posts';
import PostView from './features/posts/PostView';
import User from './features/users/User';
import Users from './features/users/Users';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route index element={<Posts/>} />
          <Route path='add' element={<AddPost/>} />
          <Route path='post/'>
            <Route path=':id' element={<PostView />} />
            <Route path='edit/:id' element={<EditPost />} />
          </Route>
          <Route path='users/' element={<Users />}/>
          <Route path='user/:id' element={<User />} />
          <Route path='notifs' element={<Notifications />} />
        </Route>
        <Route path='/counter' element={<Counter />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
