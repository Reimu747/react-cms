import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./slice/countSlice";

export const store = configureStore({
    reducer: {
        countReducer,
    },
});

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型
export type AppDispatch = typeof store.dispatch;
