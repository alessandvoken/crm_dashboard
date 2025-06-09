import type { ReactNode } from "react";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export function getStatCardData(
  rawValue: number,
  loading: boolean,
  color: string
): {
  value: number;
  percentChangeNode: ReactNode;
} {
  const value = loading
    ? 0
    : Math.floor(rawValue * (1 + Math.random() * 0.1 - 0.15));

  const yesterday = loading
    ? 0
    : Math.max(0, value + Math.floor(Math.random() * 11 - 5)); // +/-5

  const percentChangeValue =
    loading || yesterday === 0 ? null : ((value - yesterday) / yesterday) * 100;

  let percentChangeNode: ReactNode = null;
  if (percentChangeValue !== null) {
    const isPositive = percentChangeValue >= 0;
    percentChangeNode = (
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
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
          {percentChangeValue.toFixed(1)}%
        </span>
      </motion.span>
    );
  }

  return { value, percentChangeNode };
}
