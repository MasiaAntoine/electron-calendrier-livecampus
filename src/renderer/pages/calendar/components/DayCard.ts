import { format, eachDayOfInterval } from "date-fns";
import { Event } from "../../../interface/event";
import { getEventFormHTML, setupEventForm } from "../../event/event";

export function getDayHTML(day: number, date: Date, events: Event[]): string {
  const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
  const dayString = format(dayDate, "yyyy-MM-dd");

  // Filtrer les événements pour le jour courant
  const dayEvents = events
    .filter((event) => {
      const eventDateDeb = format(new Date(event.date_deb), "yyyy-MM-dd");
      const eventDateFin = format(new Date(event.date_fin), "yyyy-MM-dd");
      return dayString >= eventDateDeb && dayString <= eventDateFin;
    })
    // Trier les événements par date de début
    .sort(
      (a, b) => new Date(a.date_deb).getTime() - new Date(b.date_deb).getTime()
    );

  const isToday = dayString === format(new Date(), "yyyy-MM-dd");

  // Initialisation du HTML pour le jour
  let dayHTML = `<div class="border border-gray-200 m-[.1px] p-2 h-[18.4vh] cursor-pointer" data-date="${dayString}">
    <div class="${
      isToday ? "bg-blue-500 text-gray-200" : "bg-transparent text-black"
    } rounded-full flex items-center justify-center mx-auto w-6 h-6">${day}</div>`;

  // Ajouter un bloc d'événement pour chaque événement du jour
  dayEvents.forEach((event) => {
    const eventStartDate = new Date(event.date_deb);
    const eventEndDate = new Date(event.date_fin);
    const daysSpan = eachDayOfInterval({
      start: eventStartDate,
      end: eventEndDate,
    }).length;

    // Calculez la position du jour actuel dans la durée de l'événement
    const startIndex = Math.max(
      0,
      (dayDate.getTime() - eventStartDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const dayIndex = Math.min(daysSpan - 1, Math.round(startIndex));

    const eventIndicator = `(${dayIndex + 1}/${daysSpan})`; // Créer l'indicateur

    dayHTML += `<div class="flex justify-between items-center p-1 rounded mt-1 text-xs overflow-hidden whitespace-nowrap text-white" style="background-color: ${event.color};">
        <span>${event.titre}</span> <span>${eventIndicator}</span>
      </div>`;
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
