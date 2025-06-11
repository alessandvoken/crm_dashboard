import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MRRSnapshot {
  value: number;
  timestamp: number;
}

interface MRRState {
  snapshots: MRRSnapshot[];
}

const initialState: MRRState = {
  snapshots: [],
};

const mrrSlice = createSlice({
  name: "mrr",
  initialState,
  reducers: {
    addSnapshot: (state, action: PayloadAction<MRRSnapshot>) => {
      state.snapshots.push(action.payload);
      if (state.snapshots.length > 10) {
        state.snapshots.shift();
      }
    },
    clearSnapshots: (state) => {
      state.snapshots = [];
    },
  },
});

export const { addSnapshot, clearSnapshots } = mrrSlice.actions;
export default mrrSlice.reducer;
