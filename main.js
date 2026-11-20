const PROJECTS=[
  {id:'corporate-shooting',title:'Facile Rogitare',tag:'Corporate',n:6,cover:2},
  {id:'fine-art-portrait',title:'Fine Art Portrait',tag:'Ritratti',n:17,cover:3},
  {id:'mama-pasta-corporate',title:'Mama Pasta',tag:'Corporate',n:10,cover:9},
  {id:'jacopo-ferrarini-dentista-corporate-shooting',title:'Jacopo Ferrarini',tag:'Studio dentistico',n:10,cover:1},
  {id:'iceberg-people',title:'Iceberg People',tag:'Reportage',n:9,cover:5},
  {id:'hotelbristol',title:'Hotel Bristol',tag:'Hospitality',n:8,cover:1},
  {id:'lifestyle-residence-capitol',title:'Residence Capitol',tag:'Lifestyle',n:14,cover:3}
];
const pad=n=>String(n).padStart(2,'0');
const $=s=>document.querySelector(s);

// nav
const nav=$('#nav'),menu=$('#menu'),burger=$('#burger');
const onScroll=()=>nav.classList.toggle('solid',scrollY>40);
addEventListener('scroll',onScroll,{passive:true});onScroll();
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)});
$('#y').textContent=new Date().getFullYear();

// portfolio grid
const grid=$('#projects');
PROJECTS.forEach((p,i)=>{
  const b=document.createElement('button');b.className='proj';
  b.innerHTML=`<img loading="lazy" src="media/img/${p.id}-${pad(p.cover)}-s.webp" alt="${p.title}"><div><h3>${p.title}</h3><p>${p.tag} · ${p.n} foto</p></div>`;
  b.onclick=()=>openLb(i,0);grid.append(b);
});

// lightbox
const lb=$('#lb'),lbImg=lb.querySelector('img'),lbC=lb.querySelector('.lb-c');
let cp=0,ci=0;
function show(){const p=PROJECTS[cp];lbImg.src=`media/img/${p.id}-${pad(ci+1)}.webp`;lbImg.alt=`${p.title}, foto ${ci+1}`;lbC.textContent=`${p.title} — ${ci+1} / ${p.n}`;
  const nx=new Image();nx.src=`media/img/${p.id}-${pad((ci+1)%p.n+1)}.webp`}
function openLb(p,i){cp=p;ci=i;lb.hidden=false;document.body.style.overflow='hidden';show()}
function step(d){const n=PROJECTS[cp].n;ci=(ci+d+n)%n;show()}
function closeLb(){lb.hidden=true;document.body.style.overflow=''}
lb.querySelector('.lb-x').onclick=closeLb;
lb.querySelector('.lb-p').onclick=()=>step(-1);
lb.querySelector('.lb-n').onclick=()=>step(1);
lb.onclick=e=>{if(e.target===lb)closeLb()};
let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)step(d<0?1:-1)});

// video modal
const vm=$('#vm'),vv=vm.querySelector('video');
function closeVm(){vv.pause();vv.removeAttribute('src');vv.load();vm.hidden=true;document.body.style.overflow=''}
document.querySelectorAll('.vid').forEach(v=>v.querySelector('.play').onclick=()=>{
  vv.src=v.dataset.src;vm.hidden=false;document.body.style.overflow='hidden';vv.play().catch(()=>{});
});
vm.querySelector('.lb-x').onclick=closeVm;
vm.onclick=e=>{if(e.target===vm)closeVm()};

addEventListener('keydown',e=>{
  if(!lb.hidden){if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)}
  if(!vm.hidden&&e.key==='Escape')closeVm();
});

// form
const f=$('#form'),st=$('#status');
f.addEventListener('submit',async e=>{
  e.preventDefault();st.textContent='Invio in corso…';
  try{
    const r=await fetch(f.action,{method:'POST',headers:{Accept:'application/json'},body:new FormData(f)});
    const j=await r.json();
    if(j.success){st.textContent='Grazie! Ti rispondo il prima possibile.';f.reset()}else throw 0;
  }catch{st.textContent='Errore nell’invio. Chiamami al 331 267 6109.'}
});
