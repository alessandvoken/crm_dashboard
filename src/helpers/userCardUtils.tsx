import type { ReactNode } from "react";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

// Prende la storia completa e calcola il trend sugli ultimi 2 snapshot
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

  // Solo mostra trend se esistono almeno 2 valori
  let percentChangeNode: ReactNode = null;
  if (
    !loading &&
    last &&
    prev &&
    typeof last.value === "number" &&
    typeof prev.value === "number" &&
    prev.value > 0
  ) {
    const percentChangeValue = ((last.value - prev.value) / prev.value) * 100;
    const isPositive = percentChangeValue >= 0;
    percentChangeNode = (
      <motion.span
        key={percentChangeValue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.12 }}
        style={{ fontWeight: 500, display: "flex", alignItems: "center" }}
      >
        {isPositive ? (
          <TrendingUpIcon
            fontSize="medium"
            sx={{ color: color, mr: 0.5, verticalAlign: "middle" }}
          />
        ) : (
          <TrendingDownIcon
            fontSize="medium"
            sx={{ color: "#d32f2f", mr: 1, verticalAlign: "middle" }}
          />
        )}
        <span style={{ color: isPositive ? color : "#d32f2f" }}>
          {isPositive ? "+" : ""}
          {Math.abs(percentChangeValue).toFixed(2)}%
        </span>
      </motion.span>
    );
  } else {
    percentChangeNode = null;
  }

  return { value, percentChangeNode };
}
