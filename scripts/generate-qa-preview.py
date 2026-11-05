"""Offline visual preview of Astro markup (not an Astro build). QA ONLY."""
from pathlib import Path
import re, shutil, html
root=Path(__file__).resolve().parents[1]
app=root/'apps/dubai-offplan'
source=(app/'src/pages/index.astro').read_text()
source=re.sub(r'^---.*?---\s*','',source,flags=re.S)
units=[('One-bedroom','72–88 m²','From AED 1.85M','one-bedroom.svg'),('Two-bedroom','112–145 m²','From AED 2.75M','two-bedroom.svg'),('Three-bedroom','175–210 m²','From AED 4.3M','three-bedroom.svg')]
residence=''.join(f'''<article class="residence-card"><div class="residence-art"><div class="residence-art__number">0{i}</div><img src="/floorplans/{plan}" loading="lazy" alt="Illustrative {label} concept floor plan" width="500" height="360" /></div><div class="residence-details"><div><span class="eyebrow-label">TYPE 0{i}</span><h3>{label}</h3></div><p>{area} <span>·</span> {price}</p><a href="#floorplans">View concept plan <span aria-hidden="true">↗</span></a></div></article>''' for i,(label,area,price,plan) in enumerate(units,1))
plans=''.join(f'''<article class="floorplan-item"><div class="floorplan-item__heading"><span>0{i} / {label}</span><span>{area} · CONCEPT</span></div><img src="/floorplans/{plan}" alt="{label} original illustrative floor plan" loading="lazy" width="550" height="395"/><a href="/floorplans/{plan}" target="_blank" rel="noopener">Open plan ↗</a></article>''' for i,(label,area,price,plan) in enumerate(units,1))
photos=''.join(f'''<figure class="gallery-figure {first}"><img src="/assets/{name}" width="1800" height="1200" loading="lazy" alt="{label}"/><figcaption>{label}</figcaption></figure>''' for first,name,label in [('gallery__large','coastal-residence.svg','Architectural concept / illustrative'),('','interior-concept.svg','Interior concept / illustrative'),('','pool-concept.svg','Landscape concept / illustrative')])
pat1=r'\{development\.propertyTypes\.map\(\(unit, i\) => .*?</article>\)\}'
pat2=r'\{development\.propertyTypes\.map\(\(unit,i\)=>.*?</article>\)\}'
pat3=r'\{photos\.map\(photo=>.*?</figure>\)\}'
for pattern,replacement in [(pat1,residence),(pat2,plans),(pat3,photos)]:
 source,n=re.subn(pattern,lambda m:replacement,source,flags=re.S)
 print('expand',n)
 assert n==1,pattern
source=re.sub(r'<Base\s+title=".*?">','',source,flags=re.S,count=1)
source=source.replace('</Base>','')
source=re.sub(r'<Container\s+className="([^"]+)"\s*>',r'<div class="site-container \1">',source)
source=re.sub(r'<Container\s*>','<div class="site-container">',source)
source=source.replace('</Container>','</div>')
source=re.sub(r'<Button href="([^"]+)">','<a class="button" href="\\1">',source)
source=source.replace('</Button>','</a>')
source=source.replace("data-endpoint={import.meta.env.PUBLIC_LEAD_ENDPOINT || ''}",'data-endpoint=""')
source=source.replace('href={waHref} target={waNumber ? "_blank" : undefined} rel={waNumber ? "noopener noreferrer" : undefined} data-track={waNumber ? "click_whatsapp" : "start_form"} data-prefer-whatsapp={!waNumber ? "true" : undefined}', 'href="#form-contact-preference" data-track="start_form" data-prefer-whatsapp="true"')
source=source.replace('{new Date().getFullYear()}','2026')
remaining=re.findall(r'\{[A-Za-z][^}]{0,120}\}',source)
print('residual astro expressions',remaining[:20]);assert not remaining,remaining
preview=root/'qa-preview/dubai-offplan';preview.mkdir(parents=True,exist_ok=True)
body='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>MARIS Residences — Visual QA preview (not an Astro build)</title><link rel="stylesheet" href="global.css"></head><body>'''+source+'''</body></html>'''
body=body.replace('src="/assets/', 'src="assets/').replace('src="/floorplans/', 'src="floorplans/').replace('href="/floorplans/', 'href="floorplans/').replace('href="/brochure/', 'href="brochure/')
(preview/'index.html').write_text(body)
(preview/'global.css').write_text((app/'src/styles/global.css').read_text().replace('@import "tailwindcss";',''))
for folder in ['assets','floorplans','brochure']:
 shutil.copytree(app/'public'/folder,preview/folder,dirs_exist_ok=True)
print('preview',preview)
