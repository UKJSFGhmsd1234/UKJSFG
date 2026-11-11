(()=>{
'use strict';
const data=window.UKJSFG_MEDIA;
if(!data)return;
const $=id=>document.getElementById(id);
const gallery=$('home-gallery'),grid=$('operations-grid');
const dialog=$('lightbox'),viewer=$('lightbox-image'),caption=$('lightbox-caption');
let visibleImages=[],currentImage=0;
function node(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function openImages(images,index){if(!images.length)return;visibleImages=images;currentImage=index;showImage();dialog.showModal();}
function showImage(){const item=visibleImages[currentImage];viewer.src=item.src;viewer.alt=item.title||'UKJSFG media';caption.textContent=`${item.title||'UKJSFG Media'} · ${currentImage+1} / ${visibleImages.length}`;}
function step(n){currentImage=(currentImage+n+visibleImages.length)%visibleImages.length;showImage();}
$('close-lightbox').addEventListener('click',()=>dialog.close());$('previous-image').addEventListener('click',()=>step(-1));$('next-image').addEventListener('click',()=>step(1));
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
document.addEventListener('keydown',event=>{if(!dialog.open)return;if(event.key==='ArrowLeft')step(-1);if(event.key==='ArrowRight')step(1);});
function renderHome(category='all'){
 const images=data.homeBase.filter(x=>category==='all'||x.category===category);
 gallery.replaceChildren();
 images.forEach((item,i)=>{const button=node('button','media-tile');button.type='button';button.setAttribute('aria-label',`View ${item.title}`);const image=node('img');image.src=item.src;image.alt=item.title;image.loading=i<4?'eager':'lazy';button.append(image);const overlay=node('span','tile-caption',item.title);button.append(overlay);button.addEventListener('click',()=>openImages(images,i));gallery.append(button);});
 if(!images.length)gallery.append(node('p','empty','No media in this category yet.'));
}
document.querySelectorAll('[data-home-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-home-filter]').forEach(b=>b.classList.toggle('active',b===btn));renderHome(btn.dataset.homeFilter);}));
const tabs=[...document.querySelectorAll('[data-tab]')];
function selectTab(which){tabs.forEach(btn=>{const active=btn.dataset.tab===which;btn.classList.toggle('active',active);btn.setAttribute('aria-selected',String(active));});$('panel-home').hidden=which!=='home';$('panel-ops').hidden=which!=='ops';if(location.hash!=='#'+which)history.replaceState(null,'','#'+which);}
tabs.forEach(btn=>btn.addEventListener('click',()=>selectTab(btn.dataset.tab)));
const locSelect=$('op-location');
[...new Set(data.operations.map(op=>op.location))].sort().forEach(loc=>{const option=node('option','',loc);option.value=loc;locSelect.append(option);});
function operationCard(op){
 const article=node('article','op-card');
 const art=node('div','op-art');
 if(op.cover){const img=node('img');img.src=op.cover;img.alt=`${op.name} cover`;img.loading='lazy';art.append(img);} else {art.append(node('span','cover-placeholder','ARCHIVE IMAGE AWAITING UPLOAD'));}
 art.append(node('span','op-location',op.location.toUpperCase()));
 const info=node('div','op-info');info.append(node('span','op-kicker','DEPLOYMENT DOSSIER'));info.append(node('h3','',op.name));
 const details=node('div','op-details');
 details.append(node('span','',op.date?`DATE: ${op.date}`:'DATE: NOT RECORDED'));
 if(op.units?.length)details.append(node('span','',`UNITS: ${op.units.join(', ')}`));
 info.append(details);
 const expand=node('button','dossier-button','VIEW DOSSIER +');expand.type='button';expand.setAttribute('aria-expanded','false');
 const dossier=node('div','dossier');dossier.hidden=true;
 const summary=node('p','',op.summary||'Mission summary awaiting UKJSFG records.');dossier.append(summary);
 if(op.images?.length){const pics=node('div','dossier-images');op.images.forEach((image,i)=>{const b=node('button','dossier-thumb');b.type='button';const img=node('img');img.src=image.src;img.alt=image.title||op.name;img.loading='lazy';b.append(img);b.addEventListener('click',()=>openImages(op.images,i));pics.append(b);});dossier.append(pics);}else dossier.append(node('p','awaiting','Photographs awaiting upload.'));
 expand.addEventListener('click',()=>{dossier.hidden=!dossier.hidden;expand.setAttribute('aria-expanded',String(!dossier.hidden));expand.textContent=dossier.hidden?'VIEW DOSSIER +':'CLOSE DOSSIER −';});
 info.append(expand);article.append(art,info,dossier);return article;
}
function renderOperations(){const q=$('op-search').value.trim().toLowerCase(),loc=locSelect.value;const ops=data.operations.filter(op=>(loc==='all'||op.location===loc)&&`${op.name} ${op.location}`.toLowerCase().includes(q));grid.replaceChildren(...ops.map(operationCard));$('ops-count').textContent=`${ops.length} OF ${data.operations.length} DEPLOYMENTS`;if(!ops.length)grid.append(node('p','empty','No matching deployments.'));}
$('op-search').addEventListener('input',renderOperations);locSelect.addEventListener('change',renderOperations);
$('reset-filters').addEventListener('click',()=>{$('op-search').value='';locSelect.value='all';renderOperations();});
const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
renderHome();renderOperations();selectTab(location.hash==='#ops'?'ops':'home');
})();
