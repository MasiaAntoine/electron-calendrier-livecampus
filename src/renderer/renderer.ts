import { renderCalendar, currentDate } from "./pages/calendar/calendar";

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar(currentDate);
});
