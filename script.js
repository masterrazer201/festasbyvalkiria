const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu')}
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open'))closeMenu()});

const form=document.getElementById('budget-form'),phone='554791084409',telefone=document.getElementById('telefone'),dataInput=document.getElementById('data');
const now=new Date(),yyyy=now.getFullYear(),mm=String(now.getMonth()+1).padStart(2,'0'),dd=String(now.getDate()).padStart(2,'0');
dataInput.min=`${yyyy}-${mm}-${dd}`;

telefone.addEventListener('input',()=>{let v=telefone.value.replace(/\D/g,'').slice(0,11);if(v.length>10)v=v.replace(/^(\d{2})(\d{5})(\d{0,4})$/,'($1) $2-$3');else if(v.length>6)v=v.replace(/^(\d{2})(\d{4})(\d{0,4})$/,'($1) $2-$3');else if(v.length>2)v=v.replace(/^(\d{2})(\d{0,5})$/,'($1) $2');else if(v.length)v=v.replace(/^(\d{0,2})$/,'($1');telefone.value=v});
function err(input,msg){input.setAttribute('aria-invalid','true');const e=input.closest('.field')?.querySelector('.error');if(e)e.textContent=msg}
function clear(input){input.removeAttribute('aria-invalid');const e=input.closest('.field')?.querySelector('.error');if(e)e.textContent=''}
function formatDateBR(v){if(!v)return'A definir';const[y,m,d]=v.split('-');return`${d}/${m}/${y}`}

form.addEventListener('submit',e=>{e.preventDefault();const n=document.getElementById('nome'),t=telefone;[n,t].forEach(clear);let ok=true;if(!n.value.trim()){err(n,'Informe seu nome.');ok=false}if(t.value.replace(/\D/g,'').length<10){err(t,'Informe um WhatsApp válido.');ok=false}if(!ok)return;
const d=formatDateBR(dataInput.value),tema=document.getElementById('tema').value.trim()||'A definir',cidade=document.getElementById('cidade').value.trim()||'A definir',idade=document.getElementById('idade').value.trim()||'A definir',local=document.getElementById('local').value.trim()||'A definir',convidados=document.getElementById('convidados').value.trim()||'A definir',det=document.getElementById('detalhes').value.trim()||'Ainda não informado';
const msg=`Olá! Meu nome é ${n.value.trim()} e gostaria de solicitar um orçamento com a Festas By Valkiria.

Meu WhatsApp: ${t.value.trim()}
Data da festa: ${d}
Cidade: ${cidade}
Local da festa: ${local}
Convidados (aprox.): ${convidados}
Idade do aniversariante: ${idade}
Tema / inspiração: ${tema}
Detalhes: ${det}`;
const w=window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,'_blank','noopener,noreferrer');if(w)w.opener=null});

const tr=[...document.querySelectorAll('.js-lightbox')],lb=document.querySelector('.lightbox'),img=lb.querySelector('img'),cap=lb.querySelector('figcaption');let cur=0,last=null;
function openLB(i){cur=i;last=document.activeElement;const e=tr[cur];img.src=e.dataset.image;img.alt=e.dataset.alt||'';cap.textContent=e.dataset.alt||'';lb.hidden=false;document.body.classList.add('no-scroll');lb.querySelector('.lightbox-close').focus()}
function closeLB(){lb.hidden=true;img.src='';document.body.classList.remove('no-scroll');if(last)last.focus()}
function move(d){cur=(cur+d+tr.length)%tr.length;const e=tr[cur];img.src=e.dataset.image;img.alt=e.dataset.alt||'';cap.textContent=e.dataset.alt||''}
tr.forEach((e,i)=>e.addEventListener('click',()=>openLB(i)));lb.querySelector('.lightbox-close').onclick=closeLB;lb.querySelector('.lightbox-prev').onclick=()=>move(-1);lb.querySelector('.lightbox-next').onclick=()=>move(1);lb.addEventListener('click',e=>{if(e.target===lb)closeLB()});
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)});
