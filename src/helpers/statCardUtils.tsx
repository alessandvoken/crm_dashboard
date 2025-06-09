import type { ReactNode } from "react";
import { motion } from "framer-motion";

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

  const percentChangeNode =
    percentChangeValue === null ? null : (
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          color: percentChangeValue >= 0 ? color : "#d32f2f",
          fontWeight: 500,
        }}
      >
        {percentChangeValue >= 0 ? "+" : ""}
        {percentChangeValue.toFixed(1)}% vs yesterday
      </motion.span>
    );

  return { value, percentChangeNode };
}
