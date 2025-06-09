import type { Ticket } from "../hooks/useTickets";

export function getOpenTickets(tickets: Ticket[]) {
  return tickets.filter((t) => t.status === "open");
}

export function getSlaPercent(openTickets: Ticket[]) {
  if (!openTickets.length) return 0;
  const slaRespected = openTickets.filter((t) => t.inSla).length;
  return Math.round((slaRespected / openTickets.length) * 100);
}
