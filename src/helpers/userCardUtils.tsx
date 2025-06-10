import type { ReactNode } from "react";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export function getUserCardData(
  history: { date: string; value: number }[],
  loading: boolean,
  color: string
): {
  value: number;
  percentChangeNode: ReactNode;
} {
  const last = history[history.length - 1];
  const prev = history[history.length - 2];
  const value = last ? last.value : 0;

  let percentChangeNode: ReactNode = null;

  if (
    !loading &&
    last &&
    prev &&
    typeof last.value === "number" &&
    typeof prev.value === "number" &&
    prev.value > 0
  ) {
    const delta = last.value - prev.value;
    const isPositive = delta >= 0;

    const absDelta = Math.abs(delta);
    const userLabel = absDelta === 1 ? "user" : "users";

    percentChangeNode = (
      <motion.span
        key={delta}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.12 }}
        style={{ fontWeight: 500, display: "flex", alignItems: "center" }}
      >
        {isPositive ? (
          <TrendingUpIcon
            fontSize="medium"
            sx={{ color: color, mr: 0.3, verticalAlign: "middle" }}
          />
        ) : (
          <TrendingDownIcon
            fontSize="medium"
            sx={{ color: "#d32f2f", mr: 1, verticalAlign: "middle" }}
          />
        )}
        <span style={{ color: isPositive ? color : "#d32f2f" }}>
          {isPositive ? "+" : ""}
          {delta} {userLabel}
        </span>
      </motion.span>
    );
  } else if (!loading && history.length < 2) {
    // First render
    percentChangeNode = (
      <span
        style={{
          color: "inherit",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
        }}
      >
        Awaiting user activity
      </span>
    );
  } else {
    percentChangeNode = null;
  }

  return { value, percentChangeNode };
}
