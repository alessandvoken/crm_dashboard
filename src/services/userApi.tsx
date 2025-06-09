import axios from "axios";

const USERCOUNT_API_URL = import.meta.env.VITE_USERCOUNT_API as string;

export const fetchUsers = async () => {
  const res = await axios.get(USERCOUNT_API_URL);
  return res.data.users;
};
