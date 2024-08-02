export function ButtonGroup(actionType: "add" | "edit"): string {
  return `
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
    `;
}
