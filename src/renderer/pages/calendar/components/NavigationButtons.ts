import { renderCalendar } from "../calendar";
import { addMonths, subMonths } from "date-fns";

export function getNavigationButtons(): string {
  return `
    <div id="navigation-buttons" class="flex items-center gap-1">
      <button id="prev-month" class="p-2">
        <img src="./resources/icons/prevArrow.svg" alt="Previous Month" class="w-6 h-6"/>
      </button>
      <button id="today-button" class="p-2 bg-blue-500 text-white text-xs rounded">
        Aujourd'hui
      </button>
      <button id="next-month" class="p-2">
        <img src="./resources/icons/nextArrow.svg" alt="Next Month" class="w-6 h-6"/>
      </button>
    </div>`;
}

export function setupEventListeners(
  currentDate: Date,
  setCurrentDate: (date: Date) => void
): void {
  const prevButton = document.getElementById("prev-month");
  const nextButton = document.getElementById("next-month");
  const todayButton = document.getElementById("today-button");

  if (prevButton && nextButton && todayButton) {
    prevButton.addEventListener("click", () => {
      const newDate = subMonths(currentDate, 1);
      setCurrentDate(newDate);
      renderCalendar(newDate);
    });

    nextButton.addEventListener("click", () => {
      const newDate = addMonths(currentDate, 1);
      setCurrentDate(newDate);
      renderCalendar(newDate);
    });

    todayButton.addEventListener("click", () => {
      const today = new Date();
      setCurrentDate(today);
      renderCalendar(today);
    });
  } else {
    console.error("Navigation buttons not found");
  }
}
