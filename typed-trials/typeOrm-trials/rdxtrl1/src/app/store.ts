import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';
import IdeaReducer from "../features/ideas/IdeaSlice";

const store =  configureStore({
    reducer: {
        counter: counterReducer,
        idea: IdeaReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;