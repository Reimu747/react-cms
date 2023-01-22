import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserImpl from '@/types/user';

// user相关数据
const initialState: Partial<UserImpl> = {
    user: '',
    avatar: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<UserImpl>>): void => {
            state.user = action.payload.user;
            state.avatar = action.payload.avatar;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
