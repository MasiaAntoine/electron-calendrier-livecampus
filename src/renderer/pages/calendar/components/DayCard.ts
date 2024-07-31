import { format } from "date-fns";
import { Event } from "../../../interface/event";
import { getEventTitle } from "./eventTitle";
import { getEventFormHTML, setupEventForm } from "../../event/event";

export function getDayHTML(day: number, date: Date, events: Event[]): string {
  const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
  const dayString = format(dayDate, "yyyy-MM-dd");

  const dayEvents = events.filter((event) => {
    const eventDateDeb = format(new Date(event.date_deb), "yyyy-MM-dd");
    const eventDateFin = format(new Date(event.date_fin), "yyyy-MM-dd");
    return dayString >= eventDateDeb && dayString <= eventDateFin;
  });

  const isToday = dayString === format(new Date(), "yyyy-MM-dd");

  let dayHTML = `<div class="border border-gray-200 m-[.1px] py-2 h-[18.4vh] text-right cursor-pointer" data-date="${dayString}"><span class="${
    isToday ? "bg-blue-500 text-gray-200" : "bg-transparent text-black"
  } rounded-full p-1">${day}</span>`;

  dayEvents.forEach((event) => {
    dayHTML += getEventTitle(event.titre, event.color);
  });

  dayHTML += `</div>`;
  return dayHTML;
}

export function setupDayCardClickHandlers(
  events: Event[],
  addEventCallback: (event: Event) => void,
  editEventCallback: (event: Event) => void
): void {
  const dayCards = document.querySelectorAll("[data-date]");

  dayCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLElement;
      const selectedDate = target.getAttribute("data-date");

      if (selectedDate) {
        const selectedDateObj = new Date(selectedDate);
        const dayEvents = events.filter((event) => {
          const eventDateDeb = new Date(event.date_deb);
          return eventDateDeb.toISOString().split("T")[0] === selectedDate;
        });

        if (dayEvents.length > 0) {
          const eventToEdit = dayEvents[0];
          document.body.insertAdjacentHTML(
            "beforeend",
            getEventFormHTML(selectedDate, eventToEdit)
          );
          setupEventForm(eventToEdit, editEventCallback);
        } else {
          document.body.insertAdjacentHTML(
            "beforeend",
            getEventFormHTML(selectedDate)
          );
          setupEventForm(undefined, addEventCallback);
        }
      }
    });
  });
}
