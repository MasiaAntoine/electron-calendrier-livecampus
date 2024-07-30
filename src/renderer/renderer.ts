import { format } from "date-fns";

let currentDate = new Date();

function renderCalendar(date: Date) {
  const month = format(date, "MMMM yyyy");
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
    calendarHTML += `<div class="border p-2">${day}</div>`;
  }

  calendarHTML += `</div></div>`;

  const appElement = document.getElementById("app");
  if (appElement) {
    appElement.innerHTML = calendarHTML;
  } else {
    console.error('Element with ID "app" not found');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar(currentDate);
});
