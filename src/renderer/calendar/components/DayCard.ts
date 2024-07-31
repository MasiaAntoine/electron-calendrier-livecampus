import { format } from "date-fns";
import { Event } from "../../interface/event";
import { getEventTitle } from "./EventTitle";

export function getDayHTML(day: number, date: Date, events: Event[]): string {
  const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
  const dayString = format(dayDate, "yyyy-MM-dd");
  const dayEvents = events.filter((event) => event.date === dayString);

  const isToday =
    format(dayDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

  let dayHTML = `<div class="border p-2 min-h-[12vh] text-center"><span class="${
    isToday ? "bg-blue-500 text-gray-200" : "bg-transparent text-black"
  } rounded-full p-1">${day}</span>`;

  dayEvents.forEach((event) => {
    dayHTML += getEventTitle(event.title, event.color);
  });

  dayHTML += `</div>`;
  return dayHTML;
}
