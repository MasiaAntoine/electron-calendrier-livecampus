import { renderCalendar, currentDate } from "./calendar/calendar";

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar(currentDate);
});
