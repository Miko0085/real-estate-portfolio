import {cpSync, mkdirSync, writeFileSync, readFileSync} from 'node:fs';
const names=['dubai-offplan','investor-advisory','luxury-brokerage','seller-leads','developer-project'];
mkdirSync('pages-dist',{recursive:true});
for(const n of names) cpSync('apps/'+n+'/dist','pages-dist/'+n,{recursive:true});
const links=names.map(n=>'<li><a href="./'+n+'/">'+n+'</a></li>').join('');
writeFileSync('pages-dist/index.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Real Estate Portfolio</title><h1>Five real estate website demos</h1><p>All brands and properties are fictional.</p><ul>'+links+'</ul>');
writeFileSync('pages-dist/.nojekyll','');
