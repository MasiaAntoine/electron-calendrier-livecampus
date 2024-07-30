import { renderCalendar, currentDate } from "./calendar/calendar";

// Assurez-vous que le DOM est complètement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", () => {
  renderCalendar(currentDate);
});
