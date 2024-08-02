export function CategorySelect(
  categories: Array<{ nameCat: string; color: string }>,
  selectedCategory: string,
  colorValue: string
): string {
  const categoryOptions = categories
    .map(
      (category) => `
      <option value="${category.nameCat}" data-color="${category.color}" ${
        selectedCategory === category.nameCat ? "selected" : ""
      }>${category.nameCat}</option>
    `
    )
    .join("");

  return `
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
  `;
}
