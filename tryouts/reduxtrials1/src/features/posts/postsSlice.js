import { createAsyncThunk, createDraftSafeSelector, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import api from '../../api';

const postsAdapter = createEntityAdapter({
    sortComparer: (a,b)=> b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
    data: [],
    status: 'idle', //? idle | loading | succeeded | failed
    error: null
})

const emptyReactions = {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
}

// Thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
    const response = await api.get("/posts")
    return response.data
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async(initialData)=>{
    const { title, excerpt, user } = initialData;
    const initailPost = {title, excerpt, user, reactions: emptyReactions, date: new Date().toISOString()};
    const response = await api.post("/posts", initailPost);
    return response.data;
})

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // add: {
        //     reducer (state, action) {
        //         state.data.push(action.payload)
        //     },
        //     prepare(title, excerpt, userId){
        //         return{
        //             payload: {
        //                 id: parseInt(Math.random()*100000),
        //                 title,
        //                 excerpt,
        //                 date: new Date().toISOString(),
        //                 reactions: {
        //                     thumbsUp: 0,
        //                     hooray: 0,
        //                     heart: 0,
        //                     rocket: 0,
        //                     eyes: 0
        //                 },
        //                 user: parseInt(userId) || 0
        //             }
        //         }
        //     }
        // },
        update (state, action) {
            const {id, title, excerpt} = action.payload;
            const myPost = state.entities[id]; //state.data.find(post=>post.id === id);
            if(myPost){
                myPost.title = title;
                myPost.excerpt = excerpt
            }
        },
        addReaction(state, action){
            const {postId, reaction} = action.payload;
            const myPost = state.entities[postId]; //state.data.find(post=>post.id===postId);
            if(myPost){
                myPost.reactions[reaction]++;
            }
        },
        deletePost (state, action){
            //* Using `return` cause array.filter will produce a new altered copy of the original array and doesn't mutate the original local state so we need to return the new filtered array to replace the local state. 
            return state.data.filter(post=>post.id !== parseInt(action.payload));
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, state=>{
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action)=>{
                state.status = "succeeded";
                // set the data value
                // state.data = action.payload
                postsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action)=>{
                state.status = "failed"
                // set the error field
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, postsAdapter.addOne)/*(state, action)=>{
                // state.data.push(action.payload);
            })*/
    }
})

// Exporting actions
export const { update, addReaction, deletePost } = postsSlice.actions;
// Selectors
export const {
    selectAll: selectPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state=>state.posts);

/*
export const selectPosts = state=>state.posts.data;
export const selectPostById = (state, id)=>state.posts.data.find(post=>post.id===id);
export const selectOrderedPosts = state=>state.posts.data.slice().sort((a,b)=>b.date.localeCompare(a.date));
*/
export const selectPostsByUserId = createDraftSafeSelector([selectPosts, (state, userId)=>userId], (posts,userId)=>posts.filter(post=>post.user===userId));


export default postsSlice.reducer;