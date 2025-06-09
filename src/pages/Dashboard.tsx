import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { useUsers } from "../hooks/useUsers";
import { getStatCardData } from "../helpers/statCardUtils";
import { useTickets } from "../hooks/useTickets";
import { StatCard } from "../components/StatCard";
import { getOpenTickets, getSlaPercent } from "../helpers/ticketUtils";

const Dashboard = () => {
  const { users, loading, error } = useUsers();
  const { tickets } = useTickets();

  const openTickets = getOpenTickets(tickets);
  const slaPercent = getSlaPercent(openTickets);

  // Usa helper per preparare i dati della card utenti
  const { value, percentChangeNode } = getStatCardData(
    users.length,
    loading,
    "#388e3c"
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <StatCard
        label="Active users"
        value={value}
        icon={<PeopleAltOutlinedIcon fontSize="inherit" />}
        subtitle={percentChangeNode}
        color="#388e3c"
      />

      <StatCard
        label="Open tickets"
        value={openTickets.length}
        icon={<SupportAgentOutlinedIcon fontSize="inherit" />}
        subtitle={`SLA respected: ${slaPercent}%`}
        color="#1976d2"
        action={
          <span
            style={{
              color: "#1976d2",
              cursor: "pointer",
              textDecoration: "underline",
              fontWeight: 500,
              fontSize: "0.95rem",
            }}
            onClick={() => {
              alert("Show ticket details!");
            }}
          >
            See open tickets
          </span>
        }
      />
    </div>
  );
};

export default Dashboard;
