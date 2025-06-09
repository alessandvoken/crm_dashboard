import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userApi";

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setError("Error while fetching users"))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
}
