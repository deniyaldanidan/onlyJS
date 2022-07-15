import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from '../../api';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk("users/fetchUsers", async()=>{
    const response = await api.get("/users");
    return response.data
})

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        .addCase(fetchUsers.fulfilled, usersAdapter.setAll) /*(state, action)=>{
            
            //return action.payload
        })*/
    }
});

// export const {} = userSlice.actions;

export const {
    selectAll: selectUsers,
    selectById: selectUserById
} = usersAdapter.getSelectors(state=>state.users);

/*
export const selectUsers = state=>state.users;
export const selectUserById = (state, userId)=>state.users.find(user=>user.id===userId);
*/
export default userSlice.reducer;