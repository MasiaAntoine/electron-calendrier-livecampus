import { Event } from "./interface/event";

const appElement = document.getElementById("event-container");

function renderEventForm(actionType: "add" | "edit", eventData?: Event) {
  if (appElement) {
    appElement.innerHTML = `
      <div>
        <h2>${
          actionType === "add"
            ? "Ajouter un nouvel événement"
            : "Modifier l'événement"
        }</h2>
        ${
          actionType === "edit" && eventData
            ? `
          <p>Événement: ${eventData.titre}</p>
          <p>Description: ${eventData.description}</p>
          <p>Date de début: ${new Date(
            eventData.date_deb
          ).toLocaleDateString()}</p>
          <p>Date de fin: ${new Date(
            eventData.date_fin
          ).toLocaleDateString()}</p>
          <p>Lieu: ${eventData.location}</p>
          <p>Catégorie: ${eventData.categorie}</p>
          <p>Statut: ${eventData.statut}</p>
          <p>Transparence: ${eventData.transparence}</p>
          <p>Nombre de Mises à jour: ${eventData.nbMaj}</p>
        `
            : ""
        }
        <!-- Ajouter ici le formulaire de saisie ou de modification -->
        <button id="close-button">Fermer</button>
      </div>
    `;

    const closeButton = document.getElementById("close-button");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        window.electron.send("close-event-window", "2024-01-01");
      });
    }
  }
}

// Réception de l'événement d'ouverture de la fenêtre
window.electron.receive(
  "open-event-window",
  (data: { date?: string; event?: Event }) => {
    if (data.event) {
      console.log("edit", data.event);
      renderEventForm("edit", data.event);
    } else if (data.date) {
      renderEventForm("add");
      console.log("add");
    }
  }
);
