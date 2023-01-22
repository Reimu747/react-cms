import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./slice/countSlice";
import userReducer from './slice/userSlice';

export const store = configureStore({
    reducer: {
        countReducer,
        userReducer,
    },
});

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型
export type AppDispatch = typeof store.dispatch;
