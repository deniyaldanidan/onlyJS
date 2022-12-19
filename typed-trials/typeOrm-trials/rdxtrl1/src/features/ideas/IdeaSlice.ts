import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type IdeaDataType = {
    title: string,
    author: string
}

export type IdeaType = IdeaDataType & {
    id : number
}

interface IdeaState{
    ideas: Array<IdeaType>
}

const initialState:IdeaState = {
    ideas: [
        {
            id: 1,
            title: "Something is nothing",
            author: "Sandra"
        },
        {
            id: 2,
            title: "Sometimes i sing",
            author: "Alex"
        },
        {
            id: 3,
            title: "All is well",
            author: "Abel"
        },
        {
            id: 4,
            title: "Say something",
            author: "Christina"
        }
    ]
}

const IdeaSlice = createSlice({
    name: "idea",
    initialState: initialState,
    reducers:{
        addIdea: {
            reducer(state, action:PayloadAction<IdeaType>){
                state.ideas.push(action.payload)
            },
            prepare(title, author){
                return {
                    payload: {
                        id: Math.round(Math.random()*100000),
                        title: title,
                        author: author
                    }
                }
            }
        },
        editIdea(state, action:PayloadAction<{id: IdeaType['id'], title: IdeaType['title']}>){
            const myIdea = state.ideas.find(idea=>idea.id===action.payload.id);
            if (myIdea){
                myIdea.title = action.payload.title;
            }
        },
        deleteIdea(state, action:PayloadAction<IdeaType['id']>){
            state.ideas = state.ideas.filter(idea=>idea.id!==action.payload)
        }
    }
})

export default IdeaSlice.reducer

export const {addIdea, editIdea, deleteIdea} = IdeaSlice.actions;

export const selectIdeas = (state:RootState)=>state.idea.ideas;