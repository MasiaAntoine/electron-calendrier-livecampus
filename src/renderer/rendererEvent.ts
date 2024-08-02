import { Event } from "./interface/event";
import { categories } from "./resources/data/categoryList";

const appElement = document.getElementById("event-container");

function renderEventForm(
  actionType: "add" | "edit",
  date?: string,
  eventData?: Event
) {
  if (appElement) {
    const selectedDate =
      actionType === "edit" && eventData
        ? formatDate(new Date(eventData.date_deb))
        : date || formatDate(new Date());

    // Détermine la couleur par défaut en fonction de l'événement ou une couleur par défaut
    const colorValue = eventData ? eventData.color : "#ffffff";

    // Générer les options du menu déroulant à partir du JSON
    const categoryOptions = categories
      .map((category) => {
        return `<option value="${category.nameCat}" data-color="${
          category.color
        }" ${
          eventData && eventData.categorie === category.nameCat
            ? "selected"
            : ""
        }>${category.nameCat}</option>`;
      })
      .join("");

    appElement.innerHTML = `
        <div class="bg-white p-6 rounded shadow-lg overflow-y-auto">
          <h2 class="text-2xl font-semibold mb-4">
            ${
              actionType === "add"
                ? "Ajouter un nouvel événement"
                : "Modifier l'événement"
            }
          </h2>
          <form id="event-form">
            <div class="mb-4">
              <label for="event-title" class="block text-sm font-medium text-gray-700">Titre</label>
              <input type="text" id="event-title" name="titre" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${
                eventData ? eventData.titre : ""
              }" required>
            </div>
            <div class="mb-4">
              <label for="event-description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="event-description" name="description" class="mt-1 p-2 w-full border border-gray-300 rounded">${
                eventData ? eventData.description : ""
              }</textarea>
            </div>
            <div class="mb-4">
              <label for="event-date-deb" class="block text-sm font-medium text-gray-700">Date de début</label>
              <input type="date" id="event-date-deb" name="date_deb" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${
                eventData
                  ? formatDate(new Date(eventData.date_deb))
                  : selectedDate
              }" required>
            </div>
            <div class="mb-4">
              <label for="event-date-fin" class="block text-sm font-medium text-gray-700">Date de fin</label>
              <input type="date" id="event-date-fin" name="date_fin" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${
                eventData
                  ? formatDate(new Date(eventData.date_fin))
                  : selectedDate
              }" required>
            </div>
            <div class="mb-4">
              <label for="event-location" class="block text-sm font-medium text-gray-700">Lieu</label>
              <input type="text" id="event-location" name="location" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${
                eventData ? eventData.location : ""
              }">
            </div>
            <div class="mb-4">
              <label for="event-categorie" class="block text-sm font-medium text-gray-700">Catégorie</label>
              <div class="flex items-center ml-2">
                <div id="color-preview" class="h-8 w-9 rounded-full border border-gray-300" style="background-color: ${colorValue};"></div>
                <select id="event-categorie" name="categorie" class="mt-1 p-2 w-full border border-gray-300 rounded ml-4" required>
                  <option value="">Sélectionnez une catégorie</option>
                  ${categoryOptions}
                </select>
              </div>
            </div>
            <div class="mb-4">
              <label for="event-statut" class="block text-sm font-medium text-gray-700">Statut</label>
              <input type="text" id="event-statut" name="statut" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${
                eventData ? eventData.statut : ""
              }">
            </div>
            <div class="mb-4">
              <label for="event-transparence" class="block text-sm font-medium text-gray-700">Transparence</label>
              <input type="text" id="event-transparence" name="transparence" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${
                eventData ? eventData.transparence : ""
              }">
            </div>
            <div class="mb-4">
              <label for="event-nbMaj" class="block text-sm font-medium text-gray-700">Nombre de modifications</label>
              <input type="number" id="event-nbMaj" name="nbMaj" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${
                eventData ? eventData.nbMaj : 0
              }">
            </div>
            <div class="flex justify-end space-x-4">
              ${
                actionType === "edit"
                  ? '<button type="button" id="delete-event" class="bg-red-500 text-white px-4 py-2 rounded">Supprimer</button>'
                  : ""
              }
              <button type="button" id="cancel-event" class="bg-gray-500 text-white px-4 py-2 rounded">${
                actionType === "edit" ? "Annuler" : "Fermer"
              }</button>
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">${
                actionType === "edit" ? "Modifier" : "Ajouter"
              }</button>
            </div>
          </form>
        </div>
    `;

    // Initialiser les événements pour le formulaire
    const formElement = document.getElementById("event-form");
    const cancelButton = document.getElementById("cancel-event");
    const deleteButton = document.getElementById("delete-event");
    const colorPreview = document.getElementById("color-preview");
    const categorySelect = document.getElementById(
      "event-categorie"
    ) as HTMLSelectElement;

    if (formElement) {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = (
          document.getElementById("event-title") as HTMLInputElement
        ).value;
        const description = (
          document.getElementById("event-description") as HTMLTextAreaElement
        ).value;
        const dateDeb = new Date(
          (document.getElementById("event-date-deb") as HTMLInputElement).value
        );
        const dateFin = new Date(
          (document.getElementById("event-date-fin") as HTMLInputElement).value
        );
        const location = (
          document.getElementById("event-location") as HTMLInputElement
        ).value;
        const categorie = (
          document.getElementById("event-categorie") as HTMLSelectElement
        ).value;
        const statut = (
          document.getElementById("event-statut") as HTMLInputElement
        ).value;
        const transparence = (
          document.getElementById("event-transparence") as HTMLInputElement
        ).value;
        const nbMaj = parseInt(
          (document.getElementById("event-nbMaj") as HTMLInputElement).value,
          10
        );

        const newEvent: Event = {
          id: eventData ? eventData.id : Date.now(),
          titre: title,
          description,
          date_deb: dateDeb,
          date_fin: dateFin,
          location,
          categorie,
          statut,
          transparence,
          nbMaj,
          color: colorPreview ? colorPreview.style.backgroundColor : "#ffffff",
        };

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
        if (eventData) {
          closeEventForm();
        }
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener("change", () => {
        const selectedOption =
          categorySelect.options[categorySelect.selectedIndex];
        const color = selectedOption.getAttribute("data-color");
        if (color) {
          if (colorPreview) {
            colorPreview.style.backgroundColor = color;
          }
        }
      });

      // Initialiser la couleur de l'événement lors du chargement du formulaire
      const initialCategory = categorySelect.value;
      const initialColor = categorySelect
        .querySelector(`option[value="${initialCategory}"]`)
        ?.getAttribute("data-color");
      if (initialColor && colorPreview) {
        colorPreview.style.backgroundColor = initialColor;
      }
    }
  }
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Réception de l'événement d'ouverture de la fenêtre
window.electron.receive(
  "open-event-window",
  (data: { date?: string; event?: Event }) => {
    if (data.event) {
      console.log("edit", data.event);
      renderEventForm("edit", undefined, data.event);
    } else if (data.date) {
      renderEventForm("add", data.date);
      console.log("add");
    }
  }
);

function closeEventForm(): void {
  window.electron.send("close-event-window", "");
}
