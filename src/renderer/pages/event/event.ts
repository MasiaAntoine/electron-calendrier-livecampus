import { Event } from "../../interface/event";
import {
  getCategoryColor,
  categories,
} from "../../resources/data/categoryList";
import { EventFormField } from "./components/eventFormField";
import { CategorySelect } from "./components/categorySelect";
import { ButtonGroup } from "./components/buttonGroup";

const appElement = document.getElementById("event-container");

export function renderEventForm(
  actionType: "add" | "edit",
  date?: string,
  eventData?: Event
) {
  if (appElement) {
    const selectedDate =
      actionType === "edit" && eventData
        ? new Date(eventData.date_deb).toISOString().split("T")[0]
        : date || new Date().toISOString().split("T")[0];

    const defaultCategory = eventData ? eventData.categorie : "";
    const colorValue = getCategoryColor(defaultCategory);

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
          ${EventFormField("title", "Titre", eventData ? eventData.titre : "")}
          ${EventFormField(
            "description",
            "Description",
            eventData ? eventData.description : "",
            "textarea"
          )}
          ${EventFormField(
            "date_deb",
            "Date de début",
            eventData
              ? new Date(eventData.date_deb).toISOString().split("T")[0]
              : selectedDate,
            "date"
          )}
          ${EventFormField(
            "date_fin",
            "Date de fin",
            eventData
              ? new Date(eventData.date_fin).toISOString().split("T")[0]
              : selectedDate,
            "date"
          )}
          ${EventFormField(
            "location",
            "Lieu",
            eventData ? eventData.location : ""
          )}
          ${CategorySelect(
            categories,
            eventData ? eventData.categorie : "",
            colorValue
          )}
          ${EventFormField(
            "statut",
            "Statut",
            eventData ? eventData.statut : ""
          )}
          ${EventFormField(
            "transparence",
            "Transparence",
            eventData ? eventData.transparence : ""
          )}
          ${EventFormField(
            "nbMaj",
            "Nombre de modifications",
            eventData ? eventData.nbMaj : 0,
            "number"
          )}
          ${ButtonGroup(actionType)}
        </form>
      </div>
    `;

    initializeFormEvents(actionType, eventData);
  }
}

function initializeFormEvents(actionType: "add" | "edit", eventData?: Event) {
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

      const title = (document.getElementById("event-title") as HTMLInputElement)
        .value;
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
      };

      // Envoyer l'événement modifié ou ajouté
      window.electron.send("event-form-submit", newEvent);
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
        window.electron.send("event-delete", eventData.id);
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

function closeEventForm(): void {
  window.electron.send("close-event-window", "");
}
