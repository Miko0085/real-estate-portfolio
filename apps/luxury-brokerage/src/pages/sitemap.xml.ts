import type { APIRoute } from 'astro';
export const GET: APIRoute = ({site}) => {
  const origin=site || new URL('https://example.com');
  const prefix=import.meta.env.BASE_URL;
  const paths=["", "properties/", "developments/", "areas/", "buy/", "sell/", "about/", "insights/", "contact/", "privacy/", "properties/shoreline-penthouse/", "properties/courtyard-villa/", "properties/marina-residence/", "properties/horizon-duplex/", "properties/garden-townhouse/", "properties/quayside-loft/", "developments/atelier-waterfront/", "developments/the-courtyard/", "areas/palm-jumeirah/", "areas/dubai-hills/", "areas/dubai-marina/"];
  const urls=paths.map(path=>'<url><loc>'+new URL(prefix+path,origin).toString()+'</loc></url>').join('');
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls+'</urlset>',{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
