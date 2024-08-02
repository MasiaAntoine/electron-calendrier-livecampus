export function EventFormField(
  id: string,
  label: string,
  value: string | number = "",
  type: string = "text"
): string {
  return `
      <div class="mb-4">
        <label for="${id}" class="block text-sm font-medium text-gray-700">${label}</label>
        ${
          type === "textarea"
            ? `<textarea id="${id}" name="${id}" class="mt-1 p-2 w-full border border-gray-300 rounded">${value}</textarea>`
            : `<input type="${type}" id="${id}" name="${id}" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${value}" ${
                type === "date" ? "required" : ""
              }>`
        }
      </div>
    `;
}
