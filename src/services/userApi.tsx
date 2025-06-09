import axios from "axios";

const API_URL = "https://dummyjson.com/users";

export const fetchUsers = async () => {
  const res = await axios.get(API_URL);
  return res.data.users;
};
