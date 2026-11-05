import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL || 'https://example.com',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
