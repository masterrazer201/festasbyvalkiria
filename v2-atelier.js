"use strict";
const PORTFOLIO_DATA=[{"file":"safari.webp","title":"Safari","categories":["natureza","aventura"]},{"file":"cores-pastel.webp","title":"Cores pastel","categories":["delicados"]},{"file":"astronauta.webp","title":"Astronauta","categories":["aventura"]},{"file":"harry-potter.webp","title":"Harry Potter","categories":["personagens","aventura"]},{"file":"jardim-encantado.webp","title":"Jardim encantado","categories":["delicados","natureza"]},{"file":"fazendinha.webp","title":"Fazendinha","categories":["natureza"]},{"file":"basquete.webp","title":"Basquete","categories":["aventura"]},{"file":"moana.webp","title":"Moana","categories":["personagens","aventura","natureza"]},{"file":"dinossauros.webp","title":"Dinossauros","categories":["aventura","natureza"]},{"file":"mickey.webp","title":"Mickey","categories":["personagens","classicos"]},{"file":"confeitaria.webp","title":"Confeitaria","categories":["delicados"]},{"file":"baby-yoda.webp","title":"Baby Yoda","categories":["personagens","aventura"]},{"file":"fundo-do-mar.webp","title":"Fundo do mar","categories":["aventura","natureza"]},{"file":"toy-story.webp","title":"Toy Story","categories":["personagens","classicos"]},{"file":"a-bela-e-a-fera.webp","title":"A Bela e a Fera","categories":["personagens","delicados","classicos"]},{"file":"vaquinha.webp","title":"Vaquinha","categories":["natureza","delicados"]},{"file":"bumblebee.webp","title":"Bumblebee","categories":["personagens","aventura"]},{"file":"branca-de-neve.webp","title":"Branca de Neve","categories":["personagens","delicados","classicos"]},{"file":"arca-de-noe.webp","title":"Arca de Noé","categories":["natureza","classicos"]},{"file":"surf.webp","title":"Surf","categories":["aventura"]},{"file":"doces-candy-colors.webp","title":"Doces & candy colors","categories":["delicados"]},{"file":"super-herois.webp","title":"Super-heróis","categories":["personagens","aventura"]},{"file":"carros.webp","title":"Carros","categories":["aventura","classicos"]},{"file":"floresta-encantada.webp","title":"Floresta encantada","categories":["natureza","aventura"]},{"file":"minnie.webp","title":"Minnie","categories":["personagens","delicados","classicos"]},{"file":"pool-party.webp","title":"Pool Party","categories":["aventura"]},{"file":"naruto.webp","title":"Naruto","categories":["personagens","aventura"]},{"file":"capivara.webp","title":"Capivara","categories":["natureza","delicados"]},{"file":"fazendinha-rosa.webp","title":"Fazendinha rosa","categories":["natureza","delicados"]},{"file":"hello-kitty.webp","title":"Hello Kitty","categories":["personagens","delicados"]},{"file":"marinheiro.webp","title":"Marinheiro","categories":["aventura"]},{"file":"peter-pan.webp","title":"Peter Pan","categories":["personagens","aventura","classicos"]},{"file":"stumble-guys.webp","title":"Stumble Guys","categories":["personagens","aventura"]},{"file":"one-piece.webp","title":"One Piece","categories":["personagens","aventura"]},{"file":"chapeuzinho-vermelho.webp","title":"Chapeuzinho Vermelho","categories":["classicos","natureza"]},{"file":"disney.webp","title":"Disney","categories":["personagens","classicos"]},{"file":"miles-morales.webp","title":"Miles Morales","categories":["personagens","aventura"]},{"file":"ursinhos.webp","title":"Ursinhos","categories":["delicados","natureza"]},{"file":"brinquedos-cores.webp","title":"Brinquedos & cores","categories":["classicos","delicados"]},{"file":"primeiro-ano.webp","title":"Primeiro ano","categories":["delicados"]},{"file":"cinema.webp","title":"Cinema","categories":["aventura"]},{"file":"fazendinha-2.webp","title":"Fazendinha","categories":["natureza"]},{"file":"moana-2.webp","title":"Moana","categories":["personagens","aventura","natureza"]},{"file":"a-bela-e-a-fera-2.webp","title":"A Bela e a Fera","categories":["personagens","delicados","classicos"]},{"file":"dinossauros-2.webp","title":"Dinossauros","categories":["aventura","natureza"]},{"file":"hello-kitty-2.webp","title":"Hello Kitty","categories":["personagens","delicados"]},{"file":"minnie-confeiteira.webp","title":"Minnie confeiteira","categories":["personagens","delicados","classicos"]},{"file":"disney-2.webp","title":"Disney","categories":["personagens","classicos"]},{"file":"naruto-2.webp","title":"Naruto","categories":["personagens","aventura"]},{"file":"cinema-2.webp","title":"Cinema","categories":["aventura"]},{"file":"fazendinha-3.webp","title":"Fazendinha","categories":["natureza"]},{"file":"roblox.webp","title":"Roblox","categories":["personagens","aventura"]},{"file":"jardim-de-borboletas.webp","title":"Jardim de borboletas","categories":["delicados","natureza"]},{"file":"patrulha-canina.webp","title":"Patrulha Canina","categories":["personagens","aventura"]}];
const PHONE='554791084409';
const navButton=document.querySelector('.menu-button');const nav=document.getElementById('nav-items');
navButton?.addEventListener('click',()=>{const opened=nav.classList.toggle('open');navButton.setAttribute('aria-expanded',String(opened));navButton.setAttribute('aria-label',opened?'Fechar menu':'Abrir menu')});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');navButton?.setAttribute('aria-expanded','false')}));
const allCards=PORTFOLIO_DATA.filter(e=>e&&e.file&&e.title);
let selection='all',expanded=false;let showing=[];let current=0,restoreFocus=null;
const grid=document.getElementById('gallery-grid');const status=document.getElementById('gallery-status');const more=document.getElementById('gallery-more');const filterButtons=[...document.querySelectorAll('.filter')];
const titleCase=(s)=>s.charAt(0).toUpperCase()+s.slice(1);
const portfolioQuery=document.getElementById('portfolio-query');
const portfolioQueryClear=document.getElementById('portfolio-search-clear');
const normalizeQuery=(s)=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
let queryText='';
function drawGallery(){
  const matched=allCards.filter(e=>(selection==='all'||e.categories.includes(selection))&&normalizeQuery(e.title).includes(queryText));
  // Fotos usadas no hero/vitrine/essência/interlúdio continuam nas 54 obras,
  // mas aparecem depois das demais quando o visitante abre o portfólio geral.
  // Busca por tema e filtros mantêm o catálogo completo e sua ordem original.
  if(selection==='all'&&!queryText){
    const featured=new Set([
      'cores-pastel.webp','astronauta.webp','carros.webp',
      'jardim-de-borboletas.webp','ursinhos.webp',
      'safari.webp','fundo-do-mar.webp','minnie.webp','dinossauros.webp'
    ]);
    matched.sort((a,b)=>Number(featured.has(a.file))-Number(featured.has(b.file)));
  }
  showing=expanded?matched:matched.slice(0,9);
  grid.replaceChildren();
  showing.forEach((entry,i)=>{
    const btn=document.createElement('button');btn.type='button';btn.className='gallery-card';btn.setAttribute('aria-label',`Ver foto da decoração ${entry.title}`);
    const im=document.createElement('img');im.src=`assets/portfolio/${encodeURIComponent(entry.file)}`;im.alt=`Decoração de festa tema ${entry.title} por Festas By Valkiria`;im.loading=i<3?'eager':'lazy';im.decoding='async';
    const caption=document.createElement('span');caption.className='gallery-caption';
    const txt=document.createElement('span');const small=document.createElement('small');small.textContent='PROJETO REAL';const strong=document.createElement('strong');strong.textContent=entry.title;txt.append(small,strong);
    const arrow=document.createElement('span');arrow.textContent='↗';arrow.className='gallery-arrow';
    caption.append(txt,arrow);btn.append(im,caption);btn.addEventListener('click',()=>openLightbox(i));grid.append(btn);
  });
  if(!matched.length){
    const empty=document.createElement('div');empty.className='gallery-empty';
    const heading=document.createElement('strong');heading.textContent='Ainda não encontramos esse tema.';
    const description=document.createElement('p');description.textContent='Experimente outro nome ou escolha “Todos” para conhecer as nossas celebrações.';
    empty.append(heading,description);grid.append(empty);
  }
  status.textContent=matched.length?`${showing.length} de ${matched.length} trabalhos`:'Nenhum trabalho encontrado para essa busca';more.hidden=matched.length<=9;more.firstChild.textContent=expanded?'Ver menos celebrações ':'Ver mais celebrações ';
  more.setAttribute('aria-expanded',String(expanded));
}
filterButtons.forEach(b=>b.addEventListener('click',()=>{selection=b.dataset.filter;expanded=false;filterButtons.forEach(c=>{c.classList.toggle('active',c===b);c.setAttribute('aria-pressed',String(c===b))});drawGallery()}));
more.addEventListener('click',()=>{expanded=!expanded;drawGallery();if(!expanded)document.getElementById('portfolio').scrollIntoView({block:'start',behavior:'smooth'})});
portfolioQuery?.addEventListener('input',()=>{queryText=normalizeQuery(portfolioQuery.value);expanded=false;portfolioQueryClear.hidden=!portfolioQuery.value;drawGallery()});
portfolioQueryClear?.addEventListener('click',()=>{portfolioQuery.value='';queryText='';portfolioQueryClear.hidden=true;expanded=false;drawGallery();portfolioQuery.focus()});
drawGallery();
const box=document.getElementById('lightbox'),boxImg=box.querySelector('img'),boxCap=box.querySelector('figcaption'),boxLink=box.querySelector('.lightbox-cta');
function refreshLightbox(){const v=showing[current];if(!v)return;boxImg.src=`assets/portfolio/${encodeURIComponent(v.file)}`;boxImg.alt=`Decoração tema ${v.title}`;boxCap.textContent=v.title;const count=box.querySelector('.lightbox-count');if(count)count.textContent=`${current+1} de ${showing.length} · Portfólio real`;boxLink.href=`https://wa.me/${PHONE}?text=${encodeURIComponent('Olá! Vi a decoração tema '+v.title+' no site da Festas By Valkiria e gostaria de uma festa parecida.')}`}
function openLightbox(index){restoreFocus=document.activeElement;current=index;refreshLightbox();box.hidden=false;document.body.classList.add('modal-open');box.querySelector('.lightbox-close').focus()}
function closeLightbox(){box.hidden=true;boxImg.removeAttribute('src');document.body.classList.remove('modal-open');restoreFocus?.focus()}
function moveLightbox(d){if(showing.length===0)return;current=(current+d+showing.length)%showing.length;refreshLightbox()}
box.querySelector('.lightbox-close').addEventListener('click',closeLightbox);box.querySelector('.lightbox-prev').addEventListener('click',()=>moveLightbox(-1));box.querySelector('.lightbox-next').addEventListener('click',()=>moveLightbox(1));box.addEventListener('click',e=>{if(e.target===box)closeLightbox()});
document.addEventListener('keydown',e=>{if(box.hidden)return;if(e.key==='Escape')closeLightbox();else if(e.key==='ArrowRight')moveLightbox(1);else if(e.key==='ArrowLeft')moveLightbox(-1);else if(e.key==='Tab'){const l=[...box.querySelectorAll('button,a[href]')];const first=l[0],last=l[l.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
const form=document.getElementById('quote-form');const phoneInput=document.getElementById('whatsapp');const dateInput=document.getElementById('data');
if(dateInput){const d=new Date();dateInput.min=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
phoneInput?.addEventListener('input',()=>{let n=phoneInput.value.replace(/\D/g,'').slice(0,11);if(n.length>6)phoneInput.value=`(${n.slice(0,2)}) ${n.slice(2,n.length===11?7:6)}-${n.slice(n.length===11?7:6)}`;else if(n.length>2)phoneInput.value=`(${n.slice(0,2)}) ${n.slice(2)}`;else phoneInput.value=n});
form?.addEventListener('submit',e=>{e.preventDefault();const g=id=>document.getElementById(id)?.value.trim()||'';const n=g('nome'),tel=g('whatsapp');const err=document.getElementById('form-error');err.hidden=true;if(!n||tel.replace(/\D/g,'').length<10){err.textContent='Preencha seu nome e um WhatsApp válido para continuar.';err.hidden=false;return}
const d=g('data');let date=d?d.split('-').reverse().join('/'):'A definir';const message=`Olá! Meu nome é ${n} e gostaria de solicitar um orçamento com a Festas By Valkiria.

WhatsApp: ${tel}
Data da festa: ${date}
Cidade: ${g('cidade')||'A definir'}
Tipo de comemoração: ${g('tipo')||'A definir'}
Tema: ${g('tema')||'A definir'}
Idade: ${g('idade')||'A definir'}
Faixa de orçamento: ${g('faixa')||'A conversar'}
Local da festa: ${g('local')||'A definir'}
Detalhes: ${g('detalhes')||'A conversar'}`;
const url=`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;const popup=window.open(url,'_blank','noopener,noreferrer');if(!popup)window.location.assign(url)});
// Apenas elevações leves nos elementos do próprio site. Não usa bibliotecas nem canvas 3D.
const mq=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window&&!mq.matches){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target)}})},{threshold:.10});document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el))}else document.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('revealed'));
// V2.4 — movimento 3D por perspectiva, limitado e agendado apenas quando há ponteiro.
if(window.matchMedia('(min-width:901px) and (hover:hover) and (pointer:fine)').matches&&!mq.matches){
  const sculpture=document.querySelector('.hero-sculpture');
  const wrap=document.querySelector('.hero-photo-wrap');
  if(sculpture&&wrap){
    let frame=0, values={x:0,y:0};
    const apply=()=>{
      sculpture.style.setProperty('--tilt-y',`${values.x*8}deg`);
      sculpture.style.setProperty('--tilt-x',`${-values.y*7}deg`);
      sculpture.style.setProperty('--move-x',`${values.x*3}px`);
      sculpture.style.setProperty('--move-y',`${values.y*3}px`);
      frame=0;
    };
    wrap.addEventListener('pointermove',event=>{
      const rect=wrap.getBoundingClientRect();
      values={x:Math.max(-1,Math.min(1,(event.clientX-rect.left)/rect.width*2-1)),
              y:Math.max(-1,Math.min(1,(event.clientY-rect.top)/rect.height*2-1))};
      if(!frame)frame=requestAnimationFrame(apply);
    },{passive:true});
    wrap.addEventListener('pointerleave',()=>{
      if(frame){cancelAnimationFrame(frame);frame=0;}
      values={x:0,y:0};apply();
    });
  }
}



// V2.2 · Galeria principal editável e coleções em destaque
const heroChoices=[...document.querySelectorAll('.hero-choice')];
const heroImage=document.querySelector('.hero-photo');
const heroCaption=document.getElementById('hero-photo-caption');
let heroChangeId=0;
heroChoices.forEach(choice=>choice.addEventListener('click',()=>{
  if(choice.classList.contains('is-active')||!heroImage)return;
  const id=++heroChangeId;
  heroImage.classList.add('is-switching');
  const next=new Image();
  const src='assets/portfolio/'+choice.dataset.photo;
  next.onload=async()=>{
    if(id!==heroChangeId)return;
    if(!mq.matches)await new Promise(resolve=>setTimeout(resolve,215));
    if(id!==heroChangeId)return;
    heroImage.src=src;
    heroImage.alt=choice.dataset.alt;
    if(heroCaption)heroCaption.textContent=choice.dataset.caption;
    heroChoices.forEach(btn=>{
      const active=btn===choice;
      btn.classList.toggle('is-active',active);
      btn.setAttribute('aria-pressed',String(active));
    });
    requestAnimationFrame(()=>{
      heroImage.classList.remove('is-switching');
      if(!mq.matches){
        heroImage.classList.add('v25-flip-enter');
        const expected=id;
        setTimeout(()=>{if(expected===heroChangeId)heroImage.classList.remove('v25-flip-enter')},640);
      }
    });
  };
  next.onerror=()=>{if(id===heroChangeId)heroImage.classList.remove('is-switching')};
  next.src=src;
}));

const showcase=[
  {file:'safari.webp',alt:'Decoração tema Safari da Festas By Valkiria',heading:'Safari',emphasis:'encantado.',description:'Verdes, tons naturais e elementos que transformam a festa em uma pequena aventura.',theme:'Safari'},
  {file:'fundo-do-mar.webp',alt:'Decoração tema Fundo do mar da Festas By Valkiria',heading:'Fundo',emphasis:'do mar.',description:'Azuis, formas lúdicas e um universo de descobertas para uma comemoração especial.',theme:'Fundo do mar'},
  {file:'minnie.webp',alt:'Decoração tema Minnie da Festas By Valkiria',heading:'Minnie',emphasis:'delicada.',description:'Laços, tons rosados e uma composição doce, cheia de personalidade.',theme:'Minnie'}
];
const curatedButtons=[...document.querySelectorAll('.curated-choice')];
const curatedImage=document.getElementById('curated-image');
const curatedTitle=document.getElementById('curated-title');
const curatedDescription=document.getElementById('curated-description');
const curatedCounter=document.getElementById('curated-counter');
const curatedCTA=document.getElementById('curated-cta');
let showcaseCurrent=0,showcaseChangeId=0;
curatedButtons.forEach(btn=>btn.addEventListener('click',()=>{
  const n=Number(btn.dataset.index);
  if(!Number.isInteger(n)||n<0||n>=showcase.length||n===showcaseCurrent||!curatedImage)return;
  const id=++showcaseChangeId;
  const next=showcase[n];
  curatedImage.classList.add('is-switching');
  const temp=new Image();
  temp.onload=async()=>{
    if(id!==showcaseChangeId)return;
    if(!mq.matches)await new Promise(resolve=>setTimeout(resolve,215));
    if(id!==showcaseChangeId)return;
    curatedImage.src=temp.src;
    curatedImage.alt=next.alt;
    // Texto de conteúdo fixo e controlado: sem HTML dinâmico
    curatedTitle.replaceChildren(document.createTextNode(next.heading+' '),Object.assign(document.createElement('em'),{textContent:next.emphasis}));
    curatedDescription.textContent=next.description;
    curatedCounter.textContent=String(n+1).padStart(2,'0')+' / 03';
    curatedButtons.forEach(b=>{const active=b===btn;b.classList.toggle('is-selected',active);b.setAttribute('aria-pressed',String(active))});
    showcaseCurrent=n;
    requestAnimationFrame(()=>{
      curatedImage.classList.remove('is-switching');
      if(!mq.matches){
        curatedImage.classList.add('v25-flip-enter');
        const expected=id;
        setTimeout(()=>{if(expected===showcaseChangeId)curatedImage.classList.remove('v25-flip-enter')},640);
      }
    });
  };
  temp.onerror=()=>{if(id===showcaseChangeId)curatedImage.classList.remove('is-switching')};
  temp.src='assets/portfolio/'+next.file;
}));
curatedCTA?.addEventListener('click',()=>{
  const theme=document.getElementById('tema');
  if(theme)theme.value=showcase[showcaseCurrent].theme;
});


// V2.7 · Carrosséis automáticos: topo (6,5s) e inspirações (7s).
// Pausa quando a seção sai da tela, a aba fica oculta, durante interação,
// por escolha da pessoa e para quem prefere movimento reduzido.
function createAutoHighlight({area,controls,buttons,currentIndex,delay,label}){
  if(!area||!controls||!buttons||buttons.length<2)return;
  const toggle=controls.querySelector('.autoplay-toggle');
  const indicator=controls.querySelector('.autoplay-track-fill');
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverCapable=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  let visible=false, hovering=false, keyboardFocused=false, paused=false, timer=0;
  let manualFocus=false;

  const canRun=()=>visible&&!paused&&!hovering&&!keyboardFocused&&!document.hidden&&!preference.matches;
  function clearTimer(){
    if(timer){window.clearTimeout(timer);timer=0;}
    if(indicator)indicator.style.animation='none';
  }
  function updateButton(){
    if(!toggle)return;
    toggle.setAttribute('aria-pressed',String(paused));
    toggle.setAttribute('aria-label',`${paused?'Continuar':'Pausar'} troca automática das fotos ${label}`);
    toggle.setAttribute('title',paused?'Continuar fotos automáticas':'Pausar fotos automáticas');
    const icon=toggle.querySelector('span[aria-hidden="true"]');
    if(icon)icon.textContent=paused?'▶':'Ⅱ';
    const text=toggle.querySelector('.autoplay-toggle-label');
    if(text)text.textContent=paused?'Continuar':'Pausar';
  }
  function schedule(){
    clearTimer();updateButton();
    if(!canRun())return;
    if(indicator){
      void indicator.offsetWidth; // reinicia barra visual após troca manual
      indicator.style.animation=`fbvAutoplayAdvance ${delay}ms linear forwards`;
    }
    timer=window.setTimeout(()=>{
      timer=0;
      if(!canRun()){schedule();return;}
      const current=currentIndex();
      const next=buttons[(current+1)%buttons.length];
      // Reutiliza o controle original: preserva a pré-carga e o efeito 3D.
      next?.click();
      schedule();
    },delay);
  }
  // Qualquer escolha manual reinicia a contagem completa.
  buttons.forEach(button=>button.addEventListener('click',schedule));
  toggle?.addEventListener('click',()=>{paused=!paused;schedule();});
  if(hoverCapable){
    controls.addEventListener('pointerenter',()=>{hovering=true;schedule();});
    controls.addEventListener('pointerleave',()=>{hovering=false;schedule();});
  }
  document.addEventListener('keydown',e=>{if(e.key==='Tab')manualFocus=true;});
  document.addEventListener('pointerdown',()=>{manualFocus=false;});
  controls.addEventListener('focusin',()=>{if(manualFocus){keyboardFocused=true;schedule();}});
  controls.addEventListener('focusout',event=>{
    if(!event.relatedTarget||!controls.contains(event.relatedTarget)){
      keyboardFocused=false;schedule();
    }
  });
  document.addEventListener('visibilitychange',schedule);
  const onMotionChange=()=>schedule();
  if(preference.addEventListener)preference.addEventListener('change',onMotionChange);
  else if(preference.addListener)preference.addListener(onMotionChange);
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(([entry])=>{
      const now=entry.isIntersecting&&entry.intersectionRatio>=.14;
      if(visible!==now){visible=now;schedule();}
    },{threshold:[0,.14,.35]});
    observer.observe(area);
  }else{
    // Compatibilidade: navegador antigo pode mostrar as imagens sem observer.
    visible=true;
    schedule();
  }
  updateButton();
}
createAutoHighlight({
  area:document.querySelector('.hero-photo-wrap'),
  controls:document.querySelector('.hero-switcher'),
  buttons:heroChoices,
  currentIndex:()=>heroChoices.findIndex(btn=>btn.classList.contains('is-active')),
  delay:6500,
  label:'de destaque'
});
createAutoHighlight({
  area:document.querySelector('.curated-stage'),
  controls:document.querySelector('.curated-panel'),
  buttons:curatedButtons,
  currentIndex:()=>showcaseCurrent,
  delay:7000,
  label:'de inspiração'
});

const progress=document.getElementById('reading-progress');
const header=document.getElementById('header');
let progressPending=false;
function updateScrollState(){
  const range=document.documentElement.scrollHeight-window.innerHeight;
  const ratio=range>0?Math.min(1,Math.max(0,window.scrollY/range)):0;
  if(progress)progress.style.width=(ratio*100).toFixed(2)+'%';
  header?.classList.toggle('is-scrolled',window.scrollY>40);
  progressPending=false;
}
window.addEventListener('scroll',()=>{
  if(progressPending)return;
  progressPending=true;
  requestAnimationFrame(updateScrollState);
},{passive:true});
window.addEventListener('resize',updateScrollState,{passive:true});
updateScrollState();


// V2.3 — Navegação, gestos e atalhos móveis. Tudo progressivo e sem bibliotecas.
const mobileActionbar=document.querySelector('.mobile-actionbar');
const homeHero=document.getElementById('inicio');
if(mobileActionbar&&homeHero&&'IntersectionObserver' in window){
  const actionsObserver=new IntersectionObserver(([entry])=>{
    mobileActionbar.classList.toggle('is-visible',!entry.isIntersecting);
    document.body.classList.toggle('mobile-actions-active',!entry.isIntersecting);
  },{threshold:0});
  actionsObserver.observe(homeHero);
}
function closeMobileNavigation(){
  nav?.classList.remove('open');
  navButton?.setAttribute('aria-expanded','false');
  navButton?.setAttribute('aria-label','Abrir menu');
}
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&nav?.classList.contains('open'))closeMobileNavigation();
});
document.addEventListener('pointerdown',event=>{
  if(nav?.classList.contains('open')&&!nav.contains(event.target)&&!navButton?.contains(event.target))closeMobileNavigation();
});
nav?.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',closeMobileNavigation));
mobileActionbar?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobileNavigation));

// Swipe de fotos no celular (sem interferir com rolagem vertical).
function enableSwipe(element,onSwipe){
  if(!element)return;
  let startX=0,startY=0;
  element.addEventListener('touchstart',event=>{
    if(event.touches.length!==1)return;
    startX=event.touches[0].clientX;startY=event.touches[0].clientY;
  },{passive:true});
  element.addEventListener('touchend',event=>{
    if(!startX||!event.changedTouches.length)return;
    const dx=event.changedTouches[0].clientX-startX;
    const dy=event.changedTouches[0].clientY-startY;
    startX=0;startY=0;
    if(Math.abs(dx)>=55&&Math.abs(dx)>Math.abs(dy)*1.4)onSwipe(dx<0?1:-1);
  },{passive:true});
}
function stepHero(direction){
  const active=heroChoices.findIndex(c=>c.classList.contains('is-active'));
  const next=heroChoices[(active+direction+heroChoices.length)%heroChoices.length];
  next?.click();
}
function stepCurated(direction){
  const next=(showcaseCurrent+direction+showcase.length)%showcase.length;
  curatedButtons[next]?.click();
}
enableSwipe(document.querySelector('.hero-photo-wrap'),stepHero);
enableSwipe(document.querySelector('.curated-visual'),stepCurated);
enableSwipe(box,delta=>{if(!box.hidden)moveLightbox(delta)});

// Destaque contextual da navegação enquanto se percorre a página.
if('IntersectionObserver' in window && nav){
  const sectionLinks=[...nav.querySelectorAll('a[href^="#"]')].filter(link=>link.hash.length>1);
  const targets=sectionLinks.map(link=>document.getElementById(link.hash.slice(1))).filter(Boolean);
  if(targets.length){
    const navigationObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        sectionLinks.forEach(link=>{
          if(link.hash.slice(1)===entry.target.id) link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      });
    },{rootMargin:'-25% 0px -60% 0px',threshold:0});
    targets.forEach(section=>navigationObserver.observe(section));
  }
}


// V2.5 — cenas 3D progressivas e cartões com inclinação sutil no desktop.
(function(){
  const finePointer=window.matchMedia('(min-width:901px) and (hover:hover) and (pointer:fine)');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion:reduce)');
  const scenes=[...document.querySelectorAll('[data-scene-3d]')];
  if(finePointer.matches&&!reducedMotion.matches&&'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('v25-scene-visible');observer.unobserve(entry.target)}
      });
    },{threshold:.08,rootMargin:'0px 0px -35px 0px'});
    scenes.forEach(scene=>observer.observe(scene));
    document.body.classList.add('v25-motion-ready');
  }else scenes.forEach(scene=>scene.classList.add('v25-scene-visible'));

  if(!finePointer.matches||reducedMotion.matches)return;
  document.querySelectorAll('.instagram-card').forEach(card=>{
    let frame=0;
    let rx=0,ry=0;
    const update=()=>{
      card.style.setProperty('--ig-rx',rx.toFixed(2)+'deg');
      card.style.setProperty('--ig-ry',ry.toFixed(2)+'deg');
      frame=0;
    };
    card.addEventListener('pointermove',event=>{
      const rect=card.getBoundingClientRect();
      if(!rect.width||!rect.height)return;
      rx=((.5-(event.clientY-rect.top)/rect.height)*6);
      ry=(((event.clientX-rect.left)/rect.width-.5)*7);
      if(!frame)frame=requestAnimationFrame(update);
    },{passive:true});
    card.addEventListener('pointerleave',()=>{
      if(frame){cancelAnimationFrame(frame);frame=0}
      rx=0;ry=0;update();
    });
  });
})();


// V2.6 — cenas 3D vinculadas à rolagem: perspectiva em tempo real, não só entrada.
// Movimento limitado a desktop e a quem não optou por reduzir animações.
(function(){
  const desktop=window.matchMedia('(min-width:1024px) and (prefers-reduced-motion:no-preference)');
  const scenes=[...document.querySelectorAll('[data-v26-scene]')];
  const gallery=document.getElementById('gallery-grid');
  if(!scenes.length)return;
  let frame=0;
  const clamp=(number,min,max)=>Math.min(max,Math.max(min,number));
  // Cada cena alterna o eixo para a página não parecer uma sequência de cartões idênticos.
  scenes.forEach((el,i)=>el.dataset.v26Side=String(i%2===0?1:-1));

  function updateScenes(){
    frame=0;
    if(!desktop.matches)return;
    const vh=window.innerHeight;
    for(const el of scenes){
      const anchor=el.closest('section')||el;
      const rect=anchor.getBoundingClientRect();
      if(rect.bottom < -260||rect.top > vh+260)continue;
      const t=clamp((rect.top-vh*.52)/(vh*.76),-1,1);
      const a=Math.abs(t);
      const side=Number(el.dataset.v26Side||1);
      const factor=el.dataset.v26Scene==='text'?.46:el.dataset.v26Scene==='form'?.68:1;
      el.style.setProperty('--v26-rx',`${(t*10*factor).toFixed(2)}deg`);
      el.style.setProperty('--v26-ry',`${(t*5*side*factor).toFixed(2)}deg`);
      el.style.setProperty('--v26-z',`${(-a*112*factor).toFixed(1)}px`);
      el.style.setProperty('--v26-y',`${(t*23*factor).toFixed(1)}px`);
      el.style.setProperty('--v26-scale',(1-a*.045*factor).toFixed(4));
      // Camadas internas percorrem distâncias diferentes: parallax real, mas limitado.
      if(el.classList.contains('essencia-photos')){
        el.style.setProperty('--v26-parallax',`${(-t*17).toFixed(1)}px`);
        el.style.setProperty('--v26-parallax-small',`${(t*26).toFixed(1)}px`);
      }
      if(el.classList.contains('feature-photo')){
        el.style.setProperty('--v26-photo-y',`${(-t*16).toFixed(1)}px`);
      }
    }
  }
  function requestScenes(){
    if(frame||!desktop.matches)return;
    frame=requestAnimationFrame(updateScenes);
  }
  // Os cartões do portfólio são recriados quando se usa a busca e os filtros.
  // Observar também novas entradas impede que desapareçam ao filtrar.
  let cardObserver=null;
  function observeGallery(){
    if(!gallery||!desktop.matches)return;
    if(!('IntersectionObserver' in window))return;
    const cards=[...gallery.querySelectorAll('.gallery-card:not(.v26-card-pending)')];
    for(const card of cards){
      card.classList.add('v26-card-pending');
      cardObserver.observe(card);
    }
  }
  function enable(){
    if(!desktop.matches){
      document.body.classList.remove('v26-motion-active');
      gallery?.querySelectorAll('.gallery-card.v26-card-pending').forEach(c=>{
        c.classList.remove('v26-card-pending');c.classList.remove('v26-card-in');
      });
      return;
    }
    document.body.classList.add('v26-motion-active');
    if(!cardObserver&&'IntersectionObserver' in window){
      cardObserver=new IntersectionObserver(entries=>{
        for(const entry of entries){
          if(entry.isIntersecting){entry.target.classList.add('v26-card-in');cardObserver.unobserve(entry.target);}
        }
      },{threshold:.05,rootMargin:'0px 0px 120px 0px'});
    }
    observeGallery();
    requestScenes();
  }
  if(gallery&&'MutationObserver' in window){
    const galleryChanges=new MutationObserver(()=>{if(desktop.matches)observeGallery()});
    galleryChanges.observe(gallery,{childList:true});
  }
  window.addEventListener('scroll',requestScenes,{passive:true});
  window.addEventListener('resize',requestScenes,{passive:true});
  if(typeof desktop.addEventListener==='function')desktop.addEventListener('change',enable);
  enable();
})();
