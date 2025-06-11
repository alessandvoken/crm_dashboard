import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSnapshot } from "../store/mrrHistorySlice";
import type { RootState } from "../store";

const INITIAL_MRR = 121733;

export function useSimulatedMRR() {
  const dispatch = useDispatch();
  const snapshots = useSelector(
    (state: RootState) => state.mrrHistory.snapshots
  );

  useEffect(() => {
    if (snapshots.length === 0) {
      dispatch(addSnapshot({ value: INITIAL_MRR, timestamp: Date.now() }));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const last = snapshots[snapshots.length - 1] || { value: INITIAL_MRR };
      // Oscillazione tra -2% e +2%
      const deltaPerc = (Math.random() * 4 - 2) / 100;
      const newValue = Math.round(last.value * (1 + deltaPerc));

      dispatch(
        addSnapshot({
          value: newValue,
          timestamp: Date.now(),
        })
      );
    }, 2000 + Math.random() * 1500);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [snapshots, dispatch]);
}
