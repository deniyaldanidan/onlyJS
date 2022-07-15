import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import api from "../../api";

const ranIdGen = ()=>parseInt(Math.random()*10)+1;

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a,b)=> b.date.localeCompare(a.date)
});

export const fetchNotifications = createAsyncThunk('notifications/fetchNotications', async()=>{
    const notifId = ranIdGen();
    const response = await api.get(`/notifications/${notifId}`);
    return response.data;
})

const notificationSlice = createSlice({
    name: "notifications",
    initialState: notificationsAdapter.getInitialState(),
    reducers: {},
    extraReducers(builders){
        builders
            .addCase(fetchNotifications.fulfilled, notificationsAdapter.addOne)/*(state, action)=>{
                if(Object.values(action.payload).length){
                    state.push(action.payload);
                    console.log(state);
                    state.sort((a,b)=>b.date.localeCompare(a.date));
                }
            })*/
    }
})

export default notificationSlice.reducer;

export const {
    selectAll: selectAllNotifcations
} = notificationsAdapter.getSelectors(state=>state.notifications);

// export const selectAllNotifcations = state=>state.notifications;