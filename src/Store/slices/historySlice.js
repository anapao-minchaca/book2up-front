import { createSlice } from '@reduxjs/toolkit';


export const historySlice = createSlice({
    name: 'history',
    initialState: [],
    reducers: {
        setHistory: (_state, { payload }) => {
            return payload
        }
    }
});

export default historySlice.reducer;
export const { setHistory} = historySlice.actions;