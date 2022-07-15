import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import postsReducer from '../features/posts/postsSlice';
import userReducer from '../features/users/userSlice';

export default configureStore({
    reducer: {
        // reducers from slice comes here 
        counter: counterReducer,
        posts: postsReducer,
        users: userReducer,
        notifications: notificationsReducer
    }
})