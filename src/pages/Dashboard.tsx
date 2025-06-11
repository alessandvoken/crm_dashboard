import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Grid from "@mui/material/Grid";
import { useUsers } from "../hooks/useUsers";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getUserCardData } from "../helpers/userCardUtils";
import { useTickets } from "../hooks/useTickets";
import { StatCard } from "../components/StatCard";
import { getOpenTickets, getSlaPercent } from "../helpers/ticketUtils";

const Dashboard = () => {
  const { loading, error } = useUsers();

  const { tickets } = useTickets();

  const openTickets = getOpenTickets(tickets);
  const slaPercent = getSlaPercent(openTickets);

  const userHistory = useSelector(
    (state: RootState) => state.userHistory.history
  );

  const { value, percentChangeNode } = getUserCardData(
    userHistory,
    loading,
    "#388e3c"
  );

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
            value="€12,340"
            icon={<AttachMoneyOutlinedIcon fontSize="inherit" />}
            subtitle={
              <span style={{ color: "inherit", fontWeight: 500 }}>
                Compared to last month
              </span>
            }
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
