import { getDaysInMonth } from "date-fns";
import { Event } from "../../interface/event";
import { getMonthHeader } from "./components/calendarHeader";
import { getDayHTML, setupDayCardClickHandlers } from "./components/dayCard";
import {
  getNavigationButtons,
  setupEventListeners,
} from "./components/navigationButtons";

export let events: Event[] = [];

async function fetchEvents() {
  const fetchedEvents: any[] = await window.api.requestData();
  console.log(fetchedEvents);
  const events = fetchedEvents.map(event => ({
    ...event,
    date_deb: new Date(event.date_deb),
    date_fin: new Date(event.date_fin),
  }));
  console.log(events);
  return events;
}

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

export async function renderCalendar(date: Date): Promise<void> {
  console.log("render");
  events = await fetchEvents();
  console.log(events)
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
