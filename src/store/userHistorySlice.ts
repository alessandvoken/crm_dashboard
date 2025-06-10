import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserHistoryItem = {
  date: string;
  value: number;
};

type UserHistoryState = {
  history: UserHistoryItem[];
};

const initialState: UserHistoryState = {
  history: [],
};

const userHistorySlice = createSlice({
  name: "userHistory",
  initialState,
  reducers: {
    addSnapshot: (state, action: PayloadAction<UserHistoryItem>) => {
      // Mantieniamo solo gli ultimi 5 snapshot
      state.history.push(action.payload);
      if (state.history.length > 5) {
        state.history = state.history.slice(-5);
      }
    },
    setHistory: (state, action: PayloadAction<UserHistoryItem[]>) => {
      state.history = action.payload;
    },
    resetHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addSnapshot, setHistory, resetHistory } =
  userHistorySlice.actions;
export default userHistorySlice.reducer;
