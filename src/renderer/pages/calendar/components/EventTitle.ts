export function getEventTitle(
  event: string,
  color: string,
  width: number
): string {
  const textColor = getContrastColor(color);

  return `
    <div 
      class="absolute top-9 left-0 py-1 px-2 mt-1 text-xs overflow-hidden text-left"
      style="color: ${textColor}; background-color: ${color}; width: ${width}vw; z-index: 10; border-radius: 4px;">
      ${event}
    </div>
  `;
}

function getContrastColor(hexColor: string): string {
  hexColor = hexColor.replace("#", "");

  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#171717" : "#ededed";
}
