import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterStateImpl {
    count: number;
}

const initialState: CounterStateImpl = {
    count: 0,
};

export const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>): void => {
            state.count += action.payload;
        },
    },
});

export const { increment } = countSlice.actions;
export default countSlice.reducer;
