import { Event } from "../../interface/event";
import {
  addNewEvent,
  editEvent,
  deleteEvent as calendarDeleteEvent,
} from "../calendar/calendar";

export function getEventFormHTML(
  selectedDate: string,
  eventToEdit?: Event
): string {
  const formTitle = eventToEdit
    ? "Modifier l'événement"
    : "Ajouter un événement";
  const submitButtonText = eventToEdit ? "Modifier" : "Ajouter";
  const cancelButtonText = eventToEdit ? "Annuler" : "Fermer";
  const colorValue = eventToEdit ? eventToEdit.color : "#ff0000";

  return `
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-96 mx-auto">
        <h2 class="text-2xl font-semibold mb-4">${formTitle}</h2>
        <form id="event-form">
          <div class="mb-4">
            <label for="event-title" class="block text-sm font-medium text-gray-700">Titre</label>
            <input type="text" id="event-title" name="title" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${
              eventToEdit ? eventToEdit.title : ""
            }" required>
          </div>
          <div class="mb-4">
            <label for="event-description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="event-description" name="description" class="mt-1 p-2 w-full border border-gray-300 rounded">${
              eventToEdit ? eventToEdit.description : ""
            }</textarea>
          </div>
          <div class="mb-4">
            <label for="event-date" class="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" id="event-date" name="date" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${
              eventToEdit ? eventToEdit.date : selectedDate
            }" required>
          </div>
          <div class="mb-4 flex items-center">
            <label for="event-color" class="block text-sm font-medium text-gray-700">Couleur</label>
            <div class="flex items-center ml-2">
              <input type="color" id="event-color" name="color" class="hidden" value="${colorValue}" required>
              <div id="color-preview" class="ml-2 w-8 h-8 rounded-full border border-gray-300 cursor-pointer" style="background-color: ${colorValue};"></div>
            </div>
          </div>
          <div class="flex justify-end space-x-4">
            ${
              eventToEdit
                ? `<button type="button" id="delete-event" class="bg-red-500 text-white px-4 py-2 rounded">Supprimer</button>`
                : ""
            }
            <button type="button" id="cancel-event" class="bg-gray-500 text-white px-4 py-2 rounded">${cancelButtonText}</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">${submitButtonText}</button>
          </div>
        </form>
      </div>
    </div>`;
}

export function setupEventForm(eventToEdit?: Event): void {
  const formElement = document.getElementById("event-form");
  const cancelButton = document.getElementById("cancel-event");
  const deleteButton = document.getElementById("delete-event");
  const colorInput = document.getElementById("event-color") as HTMLInputElement;
  const colorPreview = document.getElementById("color-preview");

  if (formElement) {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = (document.getElementById("event-title") as HTMLInputElement)
        .value;
      const description = (
        document.getElementById("event-description") as HTMLTextAreaElement
      ).value;
      const date = (document.getElementById("event-date") as HTMLInputElement)
        .value;
      const color = colorInput.value;

      const newEvent: Event = {
        id: eventToEdit ? eventToEdit.id : Date.now(),
        title,
        description,
        date,
        color,
      };

      if (eventToEdit) {
        editEvent(newEvent);
      } else {
        addNewEvent(newEvent);
      }

      closeEventForm();
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      closeEventForm();
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      if (eventToEdit) {
        calendarDeleteEvent(eventToEdit);
        closeEventForm();
      }
    });
  }

  if (colorInput && colorPreview) {
    colorInput.addEventListener("input", () => {
      colorPreview.style.backgroundColor = colorInput.value;
    });

    colorPreview.addEventListener("click", () => {
      colorInput.click();
    });
  }
}

export function closeEventForm(): void {
  const formElement = document.querySelector(".fixed.inset-0");
  if (formElement) {
    formElement.remove();
  }
}
