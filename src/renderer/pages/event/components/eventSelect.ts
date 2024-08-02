export function Select({
  id,
  name,
  label,
  options,
  selectedValue,
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
  selectedValue?: string;
}): string {
  return `
      <div class="mb-4">
        <label for="${id}" class="block text-sm font-medium text-gray-700">${label}</label>
        <select id="${id}" name="${name}" class="mt-1 p-2 w-full border border-gray-300 rounded">
          ${options
            .map(
              (option) => `
            <option value="${option}" ${
                selectedValue === option ? "selected" : ""
              }>
              ${option}
            </option>
          `
            )
            .join("")}
        </select>
      </div>
    `;
}
