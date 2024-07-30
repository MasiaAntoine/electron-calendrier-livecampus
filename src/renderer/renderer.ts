import { format } from "date-fns";

// Date actuelle
let currentDate = new Date();

// Fonction pour rendre le calendrier
function renderCalendar(date: Date) {
  const month = format(date, "MMMM yyyy");
  //   const month = "test";

  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  let calendarHTML = `
    <div>
      <h1 class="text-2xl">${month}</h1>
      <div class="grid grid-cols-7 gap-4 mt-4">`;

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(date.getFullYear(), date.getMonth(), day);

    calendarHTML += `<div class="border p-2">${day}</div>`;
  }

  calendarHTML += `</div></div>`;

  const appElement = document.getElementById("app");
  if (appElement) {
    appElement.innerHTML = calendarHTML;
  } else {
    console.error("Element with ID 'app' not found");
  }
}

// Assurez-vous que le DOM est complètement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  renderCalendar(currentDate);
});
