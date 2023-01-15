import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/authSlice";
import counterReducer from '../features/counter/counterSlice';
import { apiSlice } from "../features/api/apiSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: AuthReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;