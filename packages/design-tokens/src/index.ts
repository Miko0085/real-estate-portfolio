export const primitives = {
  spacing: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96] as const,
  radii: { sm: '4px', md: '12px', full: '999px' },
  focus: '0 0 0 3px rgba(9, 88, 93, 0.4)',
  breakpoints: [320, 375, 430, 768, 1024, 1440] as const,
} as const;
export type SiteSkin = 'offplan' | 'advisory' | 'brokerage' | 'seller' | 'developer';
export const skins: Record<SiteSkin, { ink: string; paper: string; accent: string }> = {
  offplan: { ink: '#173b3d', paper: '#f8f6f0', accent: '#1e7c79' },
  advisory: { ink: '#12213a', paper: '#f4f0e9', accent: '#a46a45' },
  brokerage: { ink: '#242423', paper: '#ede8df', accent: '#5b6d62' },
  seller: { ink: '#23443a', paper: '#f9f4e9', accent: '#9b6b44' },
  developer: { ink: '#2e2421', paper: '#eee9df', accent: '#6d3131' },
};
