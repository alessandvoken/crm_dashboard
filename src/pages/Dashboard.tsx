import { StatCard } from "../components/StatCard";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useUsers } from "../hooks/useUsers";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { users, loading, error } = useUsers();

  // 1. Calcolo valore simulato attuale
  const value = loading
    ? 0
    : Math.floor(users.length * (1 + Math.random() * 0.1 - 0.15));

  // 2. Calcolo valore simulato "ieri"
  const yesterday = loading
    ? 0
    : Math.max(0, value + Math.floor(Math.random() * 11 - 5)); // +/-5

  // 3. Calcolo variazione percentuale
  const percentChangeValue =
    loading || yesterday === 0 ? null : ((value - yesterday) / yesterday) * 100;

  // 4. ReactNode animato per il subtitle
  const percentChangeNode =
    percentChangeValue === null ? null : (
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          color: percentChangeValue >= 0 ? "#388e3c" : "#d32f2f",
          fontWeight: 500,
        }}
      >
        {percentChangeValue >= 0 ? "+" : ""}
        {percentChangeValue.toFixed(1)}% vs yesterday
      </motion.span>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <StatCard
        label="Active users"
        value={value}
        icon={<PeopleAltOutlinedIcon fontSize="inherit" />}
        subtitle={percentChangeNode}
        color="#388e3c"
      />
    </div>
  );
};

export default Dashboard;
