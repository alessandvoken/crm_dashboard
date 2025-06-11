import { configureStore } from "@reduxjs/toolkit";
import userHistoryReducer from "./userHistorySlice";
import mrrReducer from "./mrrHistorySlice";

export const store = configureStore({
  reducer: {
    userHistory: userHistoryReducer,
    mrrHistory: mrrReducer,
    // slices aggiuntivi
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
