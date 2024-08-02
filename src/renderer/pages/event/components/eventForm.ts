export function EventFormField(
  id: string,
  label: string,
  value: string | number,
  type: string = "text"
): string {
  const valueString = typeof value === "number" ? value.toString() : value;
  return `
      <div class="mb-4">
        <label for="${id}" class="block text-sm font-medium text-gray-700">${label}</label>
        <input type="${type}" id="${id}" name="${id}" class="mt-1 p-2 w-full border border-gray-300 rounded" value="${valueString}">
      </div>
    `;
}
