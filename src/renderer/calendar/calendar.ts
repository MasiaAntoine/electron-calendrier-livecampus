import { getDaysInMonth } from "date-fns";
import { Event } from "../interface/event";
import { getMonthHeader } from "./components/CalendarHeader";
import { getDayHTML } from "./components/DayCard";
import {
  getNavigationButtons,
  setupEventListeners,
} from "./components/NavigationButtons";

const events: Event[] = [
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

  let calendarHTML = `<div><div class="flex items-center justify-between whitespace-nowrap">${monthHeader}${navigationButtons}</div><div class="grid grid-cols-6 gap-4 mt-4">`;

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
  } else {
    console.error('Element with ID "app" not found');
  }
}

setupEventListeners(currentDate, setCurrentDate);
