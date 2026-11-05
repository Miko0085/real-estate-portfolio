import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const index = import.meta.env.PUBLIC_INDEX_SITE === 'true' && Boolean(import.meta.env.PUBLIC_SITE_URL);
  const host = site?.toString() || 'https://example.com/';
  return new Response(index ? `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml',host)}\n` : 'User-agent: *\nDisallow: /\n', {headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
