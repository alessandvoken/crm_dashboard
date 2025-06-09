import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import "./StatCard.scss";

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

export const StatCard = ({ label, value, icon, subtitle }: StatCardProps) => (
  <Box
    component={motion.div}
    whileHover={{
      scale: 1,
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.20)",
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="stat-card-motion"
  >
    <Card className="stat-card">
      <CardContent className="stat-card__content">
        {icon && <span className="stat-card__icon">{icon}</span>}
        <div className="stat-card__main">
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {label}
          </Typography>
          <Typography variant="h4" className="stat-value">
            {value}
          </Typography>
          {subtitle && (
            <Typography
              variant="subtitle2"
              color="text.secondary"
              className="stat-card__subtitle"
            >
              {subtitle}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  </Box>
);
