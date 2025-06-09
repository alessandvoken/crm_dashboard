import { StatCard } from "../components/StatCard";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

const Dashboard = () => (
  <div>
    <StatCard
      label="Active users"
      value={128}
      icon={<PeopleAltOutlinedIcon fontSize="inherit" />}
      subtitle="+3% vs yesterday"
      color="#388e3c"
    />
  </div>
);

export default Dashboard;
