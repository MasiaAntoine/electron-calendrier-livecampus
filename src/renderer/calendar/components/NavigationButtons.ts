// calendar/components/NavigationButtons.ts

export function getNavigationButtons(): string {
  return `
      <div id="navigation-buttons" class="flex">
        <button id="prev-month" class="p-2">
          <img src="./icons/prev-arrow.svg" alt="Previous Month" class="w-6 h-6"/>
        </button>
        <button id="next-month" class="p-2">
          <img src="./icons/next-arrow.svg" alt="Next Month" class="w-6 h-6"/>
        </button>
      </div>`;
}
