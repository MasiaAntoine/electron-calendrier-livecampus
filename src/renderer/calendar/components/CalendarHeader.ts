import { format } from "date-fns";

export function getMonthHeader(date: Date): string {
  const month = format(date, "MMMM yyyy");
  return `<h1 class="text-2xl">${month}</h1>`;
}
