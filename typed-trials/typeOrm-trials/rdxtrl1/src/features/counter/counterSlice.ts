import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';

interface CounterState {
    value: number
}

const initialValue:CounterState = {
    value: 0
};

export const counterSlice = createSlice({
    name: "counter",
    initialState: initialValue,
    reducers: {
        increment : state=>{
            state.value += 1
        },
        decrement: state=>{
            if (state.value<=0){
                state.value = 0
                return;
            }
            state.value -= 1
        },
        reset: state=>{
            state.value = initialValue.value
        },
        incrementByAmt: (state, action:PayloadAction<number>)=>{
            state.value += action.payload
        }
    }
})

export const {increment, decrement, reset, incrementByAmt} = counterSlice.actions;

export const incrementAsync = (amount:number) => (dispatch:AppDispatch) => {
    setTimeout(()=>{
        dispatch(incrementByAmt(amount))
    }, 1000)
}

export default counterSlice.reducer;

export const selectCount = (state:RootState):number=>state.counter.value;