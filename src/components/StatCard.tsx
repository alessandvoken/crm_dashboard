import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import type React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export const StatCard = ({
  label,
  value,
  icon,
  subtitle,
  color,
  action,
}: StatCardProps) => (
  <Card
    component={motion.div}
    whileHover={{
      scale: 1,
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.12)",
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.1 }}
    sx={{
      width: "20rem",
      borderLeft: `6px solid ${color ?? "#1976d2"}`,
      mb: 2,
      boxShadow: "0 1.5px 6px 0 rgba(0,0,0,0.12)",
      borderRadius: 2,
      backgroundColor: "#fff",
      transition: "box-shadow 0.1s, transform 0.1s",
      overflow: "visible",
      display: "inline-block",
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        alignItems: "start",
        gap: 1.5,
        height: "100%",
      }}
    >
      {icon && (
        <Box
          sx={{
            fontSize: "2.2rem",
            color: color ?? "#1976d2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      )}
      <Box>
        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          sx={{ mt: 0.7 }}
        >
          {label}
        </Typography>
        <Typography variant="h4">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            style={{ display: "inline-block" }}
          >
            {value}
          </motion.span>
        </Typography>
        {subtitle && (
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {subtitle}
          </Typography>
        )}
        {action && <Box sx={{ mt: 1 }}>{action}</Box>}
      </Box>
    </CardContent>
  </Card>
);
