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
    title: "Meeting",
    description: "Team meeting",
    date: "2024-07-31",
    color: "#ff8686",
  },
  {
    id: 2,
    title: "Meeting",
    description: "Team meeting",
    date: "2024-07-31",
    color: "#ff8686",
  },
  {
    id: 3,
    title: "Meeting",
    description: "Team meeting",
    date: "2024-07-31",
    color: "#ff8686",
  },
  {
    id: 4,
    title: "Birthday Party",
    description: "Friend's birthday",
    date: "2024-08-01",
    color: "#0d26a2",
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
    setupDayCardClickHandlers(events, addNewEvent, editEvent);
  } else {
    console.error('Element with ID "app" not found');
  }
}

export function addNewEvent(newEvent: Event): void {
  events.push(newEvent);
  renderCalendar(currentDate);
}

export function editEvent(updatedEvent: Event): void {
  const eventIndex = events.findIndex((event) => event.id === updatedEvent.id);
  if (eventIndex > -1) {
    events[eventIndex] = updatedEvent;
    renderCalendar(currentDate);
  }
}

export function deleteEvent(eventToDelete: Event): void {
  events = events.filter((event) => event.id !== eventToDelete.id);
  renderCalendar(currentDate);
}

window.addEventListener("resize", () => {
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
