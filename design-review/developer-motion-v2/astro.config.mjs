import { defineConfig } from 'astro/config';
const base=process.env.GITHUB_PAGES==='true'?'/real-estate-portfolio/design-review/developer-motion-v2/':'/';
export default defineConfig({output:'static',site:process.env.GITHUB_PAGES==='true'?'https://miko0085.github.io':(process.env.PUBLIC_SITE_URL||'http://localhost:4321'),base,trailingSlash:'always'});