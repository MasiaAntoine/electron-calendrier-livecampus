import { Event } from "../../interface/event";

export function getAddEventFormHTML(selectedDate: string): string {
  return `
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-96 mx-auto">
        <h2 class="text-2xl font-semibold mb-4">Ajouter un événement</h2>
        <form id="add-event-form">
          <div class="mb-4">
            <label for="event-title" class="block text-sm font-medium text-gray-700">Titre</label>
            <input type="text" id="event-title" name="title" class="mt-1 p-2 w-full border border-gray-300 rounded" required>
          </div>
          <div class="mb-4">
            <label for="event-description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="event-description" name="description" class="mt-1 p-2 w-full border border-gray-300 rounded"></textarea>
          </div>
          <div class="mb-4">
            <label for="event-date" class="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" id="event-date" name="date" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${selectedDate}" required>
          </div>
          <div class="mb-4 flex items-center">
            <label for="event-color" class="block text-sm font-medium text-gray-700">Couleur</label>
            <div class="flex items-center ml-2">
              <input type="color" id="event-color" name="color" class="hidden" value="#ff0000" required>
              <div id="color-preview" class="ml-2 w-8 h-8 rounded-full border border-gray-300 cursor-pointer" style="background-color: #ff0000;"></div>
            </div>
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button" id="cancel-event" class="bg-gray-500 text-white px-4 py-2 rounded">Annuler</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
          </div>
        </form>
      </div>
    </div>`;
}

export function setupAddEventForm(
  addEventCallback: (event: Event) => void
): void {
  const formElement = document.getElementById("add-event-form");
  const cancelButton = document.getElementById("cancel-event");
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
        id: Date.now(),
        title,
        description,
        date,
        color,
      };

      addEventCallback(newEvent);
      closeAddEventForm();
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      closeAddEventForm();
    });
  }

  // Mise à jour de l'aperçu de la couleur lorsqu'on change la couleur sélectionnée
  if (colorInput && colorPreview) {
    colorInput.addEventListener("input", () => {
      colorPreview.style.backgroundColor = colorInput.value;
    });

    // Ouvrir le sélecteur de couleur lorsque l'aperçu est cliqué
    colorPreview.addEventListener("click", () => {
      colorInput.click();
    });
  }
}

export function closeAddEventForm(): void {
  const formElement = document.querySelector(".fixed.inset-0");
  if (formElement) {
    formElement.remove();
  }
}
