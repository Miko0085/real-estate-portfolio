"""Playwright responsive QA against actual Astro URL OR an explicitly labeled offline visual preview."""
from playwright.sync_api import sync_playwright
import os, pathlib, json, re, base64
BASE=os.getenv('BASE_URL','http://127.0.0.1:8739/')
DEST=pathlib.Path(__file__).resolve().parents[1]/'qa-results'
DEST.mkdir(exist_ok=True)
widths=[320,375,430,768,1024,1440]
reports=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for width in widths:
  page=browser.new_page(viewport={'width':width,'height':900},device_scale_factor=1)
  errors=[]
  page.on('pageerror',lambda err: errors.append(str(err)))
  if BASE == 'offline:':
   preview=pathlib.Path(__file__).resolve().parents[1]/'qa-preview/dubai-offplan'
   doc=(preview/'index.html').read_text()
   doc=doc.replace('<link rel="stylesheet" href="global.css">','<style>'+(preview/'global.css').read_text()+'</style>')
   def inline(match):
    file=preview/match.group(1)
    if not file.exists():return match.group(0)
    return 'src="data:image/svg+xml;base64,'+base64.b64encode(file.read_bytes()).decode()+'"'
   doc=re.sub(r'src="((?:assets|floorplans)/[^"]+\.svg)"',inline,doc)
   page.set_content(doc,wait_until='domcontentloaded',timeout=30000)
  else:
   page.goto(BASE,wait_until='domcontentloaded',timeout=30000)
  page.wait_for_timeout(250)
  data=page.evaluate('''() => ({
   viewport: window.innerWidth,
   scroll: document.documentElement.scrollWidth,
   body: document.body.scrollWidth,
   h1: document.querySelectorAll('h1').length,
   form: !!document.querySelector('form[data-lead-form]'),
   missingImages: [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img=>img.src),
   inputsWithoutLabels: [...document.querySelectorAll('input:not([type="hidden"]),select')].filter(el=>el.getAttribute('name')!=='website' && !document.querySelector(`label[for="${el.id}"]`)).map(x=>x.id),
   mobileSticky: getComputedStyle(document.querySelector('.mobile-sticky')).display,
   heroWidth: Math.round(document.querySelector('.hero-visual').getBoundingClientRect().width)
  })''')
  data['width']=width;data['pageErrors']=errors
  data['pass']=data['scroll']<=width+1 and data['body']<=width+1 and data['h1']==1 and data['form'] and not data['missingImages'] and not data['inputsWithoutLabels'] and not errors
  reports.append(data)
  if width in [375,1440]:
   page.screenshot(path=str(DEST/f'offplan-{width}.png'),full_page=True,animations='disabled')
   page.locator('.hero').screenshot(path=str(DEST/f'hero-{width}.png'),animations='disabled')
  print(json.dumps(data,ensure_ascii=False))
  page.close()
 browser.close()
(DEST/'responsive-report.json').write_text(json.dumps(reports,indent=2))
if not all(r['pass'] for r in reports):raise SystemExit('Responsive QA failed')
print(f'PASS {len(reports)} viewports; note: offline markup preview is not a compiled Astro/Lighthouse run')
