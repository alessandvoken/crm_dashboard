import { configureStore } from "@reduxjs/toolkit";
import userHistoryReducer from "./userHistorySlice";

export const store = configureStore({
  reducer: {
    userHistory: userHistoryReducer,
    // slices aggiuntivi
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
