import { format, addMonths, subMonths } from "date-fns";
import { Event } from "./event";

const events: Event[] = [
  { id: 1, title: "Meeting", description: "Team meeting", date: "2024-07-31" },
  {
    id: 2,
    title: "Birthday Party",
    description: "Friend's birthday",
    date: "2024-08-01",
  },
];

export let currentDate: Date = new Date();

function getMonthHeader(date: Date): string {
  const month = format(date, "MMMM yyyy");
  return `<h1 class="text-2xl">${month}</h1>`;
}

function getNavigationButtons(): string {
  return `
    <button id="prev-month" class="bg-blue-500 text-white p-2">Previous Month</button>
    <button id="next-month" class="bg-blue-500 text-white p-2">Next Month</button>`;
}

function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getDayHTML(day: number, date: Date): string {
  const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
  const dayString = format(dayDate, "yyyy-MM-dd");
  const dayEvents = events.filter((event) => event.date === dayString);

  let dayHTML = `<div class="border p-2 h-[12vh]"><div>${day}</div>`;

  dayEvents.forEach((event) => {
    dayHTML += `<div class="bg-green-200 p-1 mt-1">${event.title}</div>`;
  });

  dayHTML += `</div>`;
  return dayHTML;
}

function generateCalendarHTML(date: Date): string {
  const monthHeader = getMonthHeader(date);
  const navigationButtons = getNavigationButtons();
  const daysInMonth = getDaysInMonth(date);

  let calendarHTML = `<div>${monthHeader}${navigationButtons}<div class="grid grid-cols-6 gap-4 mt-4">`;

  for (let day = 1; day <= daysInMonth; day++) {
    calendarHTML += getDayHTML(day, date);
  }

  calendarHTML += `</div></div></div>`;
  return calendarHTML;
}

export function renderCalendar(date: Date): void {
  const appElement = document.getElementById("app");
  if (appElement) {
    appElement.innerHTML = generateCalendarHTML(date);
    setupEventListeners();
  } else {
    console.error('Element with ID "app" not found');
  }
}

function setupEventListeners(): void {
  const prevButton = document.getElementById("prev-month");
  const nextButton = document.getElementById("next-month");

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      currentDate = subMonths(currentDate, 1);
      renderCalendar(currentDate);
    });

    nextButton.addEventListener("click", () => {
      currentDate = addMonths(currentDate, 1);
      renderCalendar(currentDate);
    });
  } else {
    console.error("Navigation buttons not found");
  }
}
