import { createSlice } from '@reduxjs/toolkit';

const alterSlice = createSlice({
    name: 'alter',
    initialState: {},
    reducers: {
        alter: state => {
            return state
        }
    }
})

export const { alter } = alterSlice.actions;
export default alterSlice.reducer;