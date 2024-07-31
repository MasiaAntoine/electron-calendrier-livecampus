export function getEventTitle(event: string, color: string): string {
  const textColor = getContrastColor(color);
  return `<div class="p-1 mt-1 text-xs" style="color: ${textColor}; background-color:${color};">${event}</div>`;
}

function getContrastColor(hexColor: string): string {
  hexColor = hexColor.replace("#", "");

  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}
