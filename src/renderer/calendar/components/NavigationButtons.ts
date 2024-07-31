import { renderCalendar } from "../calendar";
import { addMonths, subMonths } from "date-fns";

export function getNavigationButtons(): string {
  return `
    <div id="navigation-buttons" class="flex">
      <button id="prev-month" class="p-2">
        <img src="./icons/prev-arrow.svg" alt="Previous Month" class="w-6 h-6"/>
      </button>
      <button id="next-month" class="p-2">
        <img src="./icons/next-arrow.svg" alt="Next Month" class="w-6 h-6"/>
      </button>
    </div>`;
}

export function setupEventListeners(
  currentDate: Date,
  setCurrentDate: (date: Date) => void
): void {
  const prevButton = document.getElementById("prev-month");
  const nextButton = document.getElementById("next-month");

  if (prevButton && nextButton) {
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
  } else {
    console.error("Navigation buttons not found");
  }
}
