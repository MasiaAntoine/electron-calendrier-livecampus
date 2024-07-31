import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function getMonthHeader(date: Date): string {
  const month = format(date, "MMMM yyyy", { locale: fr });
  return `<h1 class="text-4xl font-medium p-2">${month}</h1>`;
}
