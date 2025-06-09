import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userApi";
import { useDispatch } from "react-redux";
import { addSnapshot } from "../store/userHistorySlice";

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    async function getAndSet() {
      try {
        setLoading(true);
        let result = await fetchUsers();

        // --- Simulazione variazioni ---

        const variation = Math.floor(Math.random() * 7) - 3;
        if (variation > 0) {
          for (let i = 0; i < variation; i++) {
            result = [...result, { id: 1000 + i, name: `Fake user ${i}` }];
          }
        } else if (variation < 0) {
          // Rimuovi utenti a caso
          result = result.slice(0, result.length + variation);
        }

        if (isMounted) {
          setUsers(result);
          setLoading(false);

          // lunghezza simulata
          const now = new Date();
          const timestamp = now.toLocaleTimeString("it-IT");
          dispatch(addSnapshot({ date: timestamp, value: result.length }));
        }
      } catch (err) {
        if (isMounted) {
          setError("Error while fetching users");
          setLoading(false);
        }
      }
    }

    getAndSet();
    const interval = setInterval(getAndSet, 6000 + Math.random() * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [dispatch]);

  return { users, loading, error };
}
