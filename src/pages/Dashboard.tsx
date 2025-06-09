import { StatCard } from "../components/StatCard";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useUsers } from "../hooks/useUsers";
import { getStatCardData } from "../helpers/statCardUtils";

const Dashboard = () => {
  const { users, loading, error } = useUsers();

  // Usa helper per preparare i dati della card
  const { value, percentChangeNode } = getStatCardData(
    users.length,
    loading,
    "#388e3c"
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
