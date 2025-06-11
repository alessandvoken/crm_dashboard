import Grid from "@mui/material/Grid";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { StatCard } from "../components/StatCard";
import { useUsers } from "../hooks/useUsers";
import { useTickets } from "../hooks/useTickets";
import { getUserCardData } from "../helpers/userCardUtils";
import { getOpenTickets, getSlaPercent } from "../helpers/ticketUtils";
import { useSimulatedMRR } from "../hooks/useSimulatedMRR";
import { getMRRCardData } from "../helpers/getMRRCardData";

const Dashboard = () => {
  // 1. Dati utenti (custom hook)
  const { loading, error } = useUsers();
  const userHistory = useSelector(
    (state: RootState) => state.userHistory.history
  );

  // 2. Dati tickets (custom hook)
  const { tickets } = useTickets();
  const openTickets = getOpenTickets(tickets);
  const slaPercent = getSlaPercent(openTickets);

  // 3. Simulazione MRR
  useSimulatedMRR();
  const mrrSnapshots = useSelector(
    (state: RootState) => state.mrrHistory.snapshots
  );

  // 4. Helpers per le card
  const { value, percentChangeNode } = getUserCardData(
    userHistory,
    loading,
    "#388e3c"
  );

  const { value: mrrValue, percentChangeNode: mrrPercentChangeNode } =
    getMRRCardData(mrrSnapshots, false, "#ffc107");

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <Grid
        container
        spacing={5}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 5, mt: 2 }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Active users"
            value={value}
            icon={<PeopleAltOutlinedIcon fontSize="inherit" />}
            subtitle={percentChangeNode}
            color="#388e3c"
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
                  alert("Users details!");
                }}
              >
                View users info
              </span>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                View open tickets
              </span>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3 }}>
          <StatCard
            label="MRR"
            value={`€${mrrValue.toLocaleString()}`}
            icon={<AttachMoneyOutlinedIcon fontSize="inherit" />}
            subtitle={mrrPercentChangeNode}
            color="#ffc107"
            action={
              <span
                style={{
                  color: "#1976d2",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                }}
                onClick={() => alert("Turnover details coming soon!")}
              >
                View MRR trend
              </span>
            }
          />
        </Grid>
      </Grid>
      <div>{/* Table - Graphs */}</div>
    </div>
  );
};

export default Dashboard;
