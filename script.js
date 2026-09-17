const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');

function closeMenu(){
  if(!nav||!menuButton)return;
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Abrir menu');
}
if(menuButton&&nav){
  menuButton.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&nav?.classList.contains('open'))closeMenu();
});

const form=document.getElementById('budget-form');
const phone='554791084409';
const telefone=document.getElementById('telefone');
const dataInput=document.getElementById('data');

if(dataInput){
  const now=new Date();
  const yyyy=now.getFullYear(),mm=String(now.getMonth()+1).padStart(2,'0'),dd=String(now.getDate()).padStart(2,'0');
  dataInput.min=`${yyyy}-${mm}-${dd}`;
}

if(telefone){
  telefone.addEventListener('input',()=>{
    let v=telefone.value.replace(/\D/g,'').slice(0,11);
    if(v.length>10)v=v.replace(/^(\d{2})(\d{5})(\d{0,4})$/,'($1) $2-$3');
    else if(v.length>6)v=v.replace(/^(\d{2})(\d{4})(\d{0,4})$/,'($1) $2-$3');
    else if(v.length>2)v=v.replace(/^(\d{2})(\d{0,5})$/,'($1) $2');
    else if(v.length)v=v.replace(/^(\d{0,2})$/,'($1');
    telefone.value=v;
  });
}

function err(input,msg){
  input.setAttribute('aria-invalid','true');
  const el=input.closest('.field')?.querySelector('.error');
  if(el)el.textContent=msg;
}
function clearErr(input){
  input.removeAttribute('aria-invalid');
  const el=input.closest('.field')?.querySelector('.error');
  if(el)el.textContent='';
}
function formatDateBR(v){
  if(!v)return'A definir';
  const[y,m,d]=v.split('-');
  return`${d}/${m}/${y}`;
}

if(form&&telefone&&dataInput){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const n=document.getElementById('nome');
    const t=telefone;
    [n,t].forEach(clearErr);
    let ok=true;
    if(!n.value.trim()){err(n,'Informe seu nome.');ok=false;}
    if(t.value.replace(/\D/g,'').length<10){err(t,'Informe um WhatsApp válido.');ok=false;}
    if(!ok)return;

    const d=formatDateBR(dataInput.value);
    const tipo=document.getElementById('tipo')?.value||'A definir';
    const tema=document.getElementById('tema')?.value.trim()||'A definir';
    const cidade=document.getElementById('cidade')?.value.trim()||'A definir';
    const idade=document.getElementById('idade')?.value.trim()||'A definir';
    const local=document.getElementById('local')?.value.trim()||'A definir';
    const faixa=document.getElementById('faixa')?.value||'Não informado';
    const det=document.getElementById('detalhes')?.value.trim()||'Ainda não informado';

    const msg=`Olá! Meu nome é ${n.value.trim()} e gostaria de solicitar um orçamento com a Festas By Valkiria.

Meu WhatsApp: ${t.value.trim()}
Data da festa: ${d}
Tipo de evento: ${tipo}
Cidade: ${cidade}
Local da festa: ${local}
Faixa de orçamento: ${faixa}
Idade do aniversariante: ${idade}
Tema / inspiração: ${tema}
Detalhes: ${det}`;

    const success=document.getElementById('form-success');
    if(success){
      success.hidden=false;
      success.textContent='Abrindo o WhatsApp com seu pedido...';
    }
    window.location.assign(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
  });
}

const allLightboxItems=[...document.querySelectorAll('.js-lightbox')];
const lb=document.querySelector('.lightbox');
const lbImg=lb?.querySelector('img');
const lbCap=lb?.querySelector('figcaption');
const lbCta=lb?.querySelector('.lightbox-cta');
let cur=0,last=null;

function updateLightbox(){
  const item=allLightboxItems[cur];
  if(!item||!lbImg||!lbCap)return;
  lbImg.src=item.dataset.image||'';
  lbImg.alt=item.dataset.alt||'';
  lbCap.textContent=item.dataset.alt||'';
  if(lbCta){
    const ref=item.dataset.alt||'uma decoração do portfólio';
    const text=`Olá! Vi ${ref} no site da Festas By Valkiria e gostaria de uma festa parecida.`;
    lbCta.href=`https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }
}
function openLB(i){
  if(!lb)return;
  cur=i;
  last=document.activeElement;
  updateLightbox();
  lb.hidden=false;
  document.body.classList.add('no-scroll');
  lb.querySelector('.lightbox-close')?.focus();
}
function closeLB(){
  if(!lb)return;
  lb.hidden=true;
  if(lbImg)lbImg.src='';
  document.body.classList.remove('no-scroll');
  if(last instanceof HTMLElement)last.focus();
}
function moveLB(delta){
  if(!allLightboxItems.length)return;
  cur=(cur+delta+allLightboxItems.length)%allLightboxItems.length;
  updateLightbox();
}

allLightboxItems.forEach((item,i)=>item.addEventListener('click',()=>openLB(i)));
lb?.querySelector('.lightbox-close')?.addEventListener('click',closeLB);
lb?.querySelector('.lightbox-prev')?.addEventListener('click',()=>moveLB(-1));
lb?.querySelector('.lightbox-next')?.addEventListener('click',()=>moveLB(1));
lb?.addEventListener('click',e=>{if(e.target===lb)closeLB();});
document.addEventListener('keydown',e=>{
  if(!lb||lb.hidden)return;
  if(e.key==='Escape')closeLB();
  if(e.key==='ArrowLeft')moveLB(-1);
  if(e.key==='ArrowRight')moveLB(1);
});



// Portfólio V5.7 — filtros + carregamento progressivo
const portfolioCards=[...document.querySelectorAll('.portfolio-grid .work-card')];
const filterButtons=[...document.querySelectorAll('.filter-btn')];
const moreButton=document.getElementById('portfolio-more');
const PORTFOLIO_PAGE=12;
let portfolioFilter='all';
let portfolioExpanded=false;

function matchesPortfolio(card){
  if(portfolioFilter==='all') return true;
  return (card.dataset.category||'').split(/\s+/).includes(portfolioFilter);
}

function renderPortfolio(){
  const matched=portfolioCards.filter(matchesPortfolio);
  portfolioCards.forEach(card=>card.classList.add('is-hidden'));

  const visible=portfolioExpanded ? matched : matched.slice(0,PORTFOLIO_PAGE);
  visible.forEach(card=>card.classList.remove('is-hidden'));

  if(moreButton){
    moreButton.hidden=matched.length<=PORTFOLIO_PAGE;
    moreButton.textContent=portfolioExpanded?'Mostrar menos':'Ver mais trabalhos';
    moreButton.setAttribute('aria-expanded',String(portfolioExpanded));
  }
}

filterButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filterButtons.forEach(b=>{
      b.classList.remove('active');
      b.setAttribute('aria-pressed','false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed','true');
    portfolioFilter=btn.dataset.filter||'all';
    portfolioExpanded=false;
    renderPortfolio();
  });
});

moreButton?.addEventListener('click',()=>{
  portfolioExpanded=!portfolioExpanded;
  renderPortfolio();
  if(!portfolioExpanded){
    document.getElementById('portfolio')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
});

renderPortfolio();
