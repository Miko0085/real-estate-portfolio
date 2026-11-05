export const typeFamilies = {
  editorial: 'Georgia, Cambria, Times New Roman, serif',
  interface: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Arial, sans-serif',
  data: 'ui-monospace, SFMono-Regular, Menlo, monospace',
} as const;
export function clampType(minRem: number, preferredVw: number, maxRem: number): string {
  return `clamp(${minRem}rem, ${preferredVw}vw, ${maxRem}rem)`;
}
