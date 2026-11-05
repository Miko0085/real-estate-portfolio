import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  output: 'static',
  site: process.env.GITHUB_PAGES === 'true' ? 'https://miko0085.github.io' : (process.env.PUBLIC_SITE_URL || 'https://example.com'),
  base: process.env.GITHUB_PAGES === 'true' ? '/real-estate-portfolio/seller-leads/' : '/',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
