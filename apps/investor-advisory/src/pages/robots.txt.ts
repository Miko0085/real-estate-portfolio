import type {APIRoute} from 'astro';
export const GET:APIRoute = ({site})=>{
 const index=import.meta.env.PUBLIC_INDEX_SITE==='true' && Boolean(import.meta.env.PUBLIC_SITE_URL) && import.meta.env.GITHUB_PAGES!=='true';
 const origin=site||new URL('https://example.com');
 const sitemap=new URL(import.meta.env.BASE_URL+'sitemap.xml',origin);
 return new Response(index?`User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`:'User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
