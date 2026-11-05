import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const base = site?.toString() || 'https://example.com/';
  const urls = ['/', '/privacy/'];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(path=>`<url><loc>${new URL(path.replace(/^\/+/, ''),base)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
