import { getDaysInMonth } from "date-fns";
import { Event } from "../../interface/event";
import { getMonthHeader } from "./components/calendarHeader";
import { getDayHTML, setupDayCardClickHandlers } from "./components/dayCard";
import {
  getNavigationButtons,
  setupEventListeners,
} from "./components/navigationButtons";

export let events: Event[] = [
  {
    id: 1,
    titre: "Meeting",
    description: "Team meeting",
    date_deb: new Date("2024-08-31"),
    date_fin: new Date("2024-09-01"),
    location: "Conference Room A",
    categorie: "Technologie",
    statut: "Scheduled",
    transparence: "Opaque",
    nbMaj: 1,
  },
  {
    id: 2,
    titre: "Conference",
    description: "Annual conference",
    date_deb: new Date("2024-08-29"),
    date_fin: new Date("2024-08-31"),
    location: "Conference Hall",
    categorie: "Éducation",
    statut: "Scheduled",
    transparence: "Opaque",
    nbMaj: 1,
  },
  {
    id: 3,
    titre: "Holiday",
    description: "Summer vacation",
    date_deb: new Date("2024-09-08"),
    date_fin: new Date("2024-09-12"),
    location: "Beach",
    categorie: "Finance",
    statut: "Confirmed",
    transparence: "Semi-transparent",
    nbMaj: 0,
  },
];

export let currentDate: Date = new Date();

export function setCurrentDate(newDate: Date): void {
  currentDate = newDate;
}

function generateCalendarHTML(date: Date): string {
  const monthHeader = getMonthHeader(date);
  const navigationButtons = getNavigationButtons();
  const daysInMonth = getDaysInMonth(date);

  let calendarHTML = `<div><div class="flex items-center justify-between whitespace-nowrap">${monthHeader}${navigationButtons}</div><div class="grid grid-cols-7 px-1">`;

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
    calendarHTML += getDayHTML(day, dayDate, events);
  }

  calendarHTML += `</div></div></div>`;
  return calendarHTML;
}

export function renderCalendar(date: Date): void {
  const appElement = document.getElementById("app");
  if (appElement) {
    appElement.innerHTML = generateCalendarHTML(date);
    setupEventListeners(currentDate, setCurrentDate);
    setupDayCardClickHandlers(events);
  } else {
    console.error('Element with ID "app" not found');
  }
}

window.addEventListener("resize", () => {
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
