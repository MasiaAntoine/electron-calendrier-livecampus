import { format, eachDayOfInterval } from "date-fns";
import { Event } from "../../../interface/event";
import { getEventTitle } from "./eventTitle";
import { categories } from "../../../resources/data/categoryList"; // Importer les catégories

// Fonction pour obtenir la couleur de la catégorie
function getCategoryColor(categoryName: string): string {
  const category = categories.find((cat) => cat.nameCat === categoryName);
  return category ? category.color : "#ffffff"; // Retourner une couleur par défaut si la catégorie n'est pas trouvée
}

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

    // Obtenez la couleur de la catégorie
    const categoryColor = getCategoryColor(event.categorie);

    // Utilisez la fonction getEventTitle pour générer le HTML du titre de l'événement
    const eventTitleHTML = getEventTitle(
      event.titre,
      categoryColor, // Utilisez la couleur de la catégorie
      eventIndicator
    );

    dayHTML += `<div class="event-title" data-event-id="${event.id}">
      ${eventTitleHTML}
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
        window.electron.send("open-event-window", { date: selectedDate });
      }
    });
  });

  // Ajout de l'écouteur d'événements pour les titres d'événements
  const eventTitles = document.querySelectorAll(".event-title");

  eventTitles.forEach((title) => {
    title.addEventListener("click", (e) => {
      e.stopPropagation(); // Empêche la propagation à l'élément parent
      const target = e.currentTarget as HTMLElement;
      const eventId = target.getAttribute("data-event-id");

      if (eventId) {
        const eventToEdit = events.find(
          (event) => event.id === parseInt(eventId)
        );
        if (eventToEdit) {
          window.electron.send("open-event-window", { event: eventToEdit });
        }
      }
    });
  });
}
