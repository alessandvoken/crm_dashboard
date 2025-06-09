import { useEffect, useState } from "react";

export type Ticket = {
  id: number;
  status: string;
  inSla: boolean;
};

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTickets([
        { id: 1, status: "open", inSla: true },
        { id: 2, status: "closed", inSla: true },
        { id: 3, status: "open", inSla: false },
      ]);
      setLoading(false);
    }, 350);
  }, []);

  return { tickets, loading, error: null };
}
