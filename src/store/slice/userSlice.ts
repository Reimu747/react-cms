import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserImpl from '@/types/user';
import { GUEST_ROLE } from '@/types/variable';

// user相关数据
const initialState: Partial<UserImpl> = {
    user: '',
    avatar: '',
    role: GUEST_ROLE,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<UserImpl>>): void => {
            state.user = action.payload.user;
            state.avatar = action.payload.avatar;
            state.role = action.payload.role;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
