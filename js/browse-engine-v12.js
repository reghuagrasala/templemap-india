(()=>{
/* Browse engine v12: live counts, strict filters, no render-loop observer. */
const DATA=[
{id:'ochira',name:'Oachira Parabrahma Temple',place:'Oachira',district:'Kollam',state:'Kerala',focus:'Parabrahmam',type:'Pilgrimage Centre',tradition:'Non-idol worship'},
{id:'kottakkal-vishwambhara',name:'Kottakkal Vishwambhara Temple',place:'Kottakkal',district:'Malappuram',state:'Kerala',focus:'Shiva',type:'Temple',tradition:'Hinduism'},
{id:'somnath',name:'Somnath Temple',place:'Prabhas Patan',district:'Gir Somnath',state:'Gujarat',focus:'Shiva',type:'Temple',tradition:'Hinduism'},
{id:'vaishno-devi',name:'Shri Mata Vaishno Devi Shrine',place:'Katra',district:'Reasi',state:'Jammu and Kashmir',focus:'Vaishno Devi',type:'Shrine',tradition:'Hinduism'},
{id:'tirumala',name:'Tirumala Venkateswara Temple',place:'Tirumala',district:'Tirupati',state:'Andhra Pradesh',focus:'Venkateswara',type:'Temple',tradition:'Vaishnavism'},
{id:'sabarimala',name:'Sabarimala Sree Dharma Sastha Temple',place:'Sabarimala',district:'Pathanamthitta',state:'Kerala',focus:'Ayyappa',type:'Temple',tradition:'Hinduism'},
{id:'guruvayur',name:'Guruvayur Sree Krishna Temple',place:'Guruvayur',district:'Thrissur',state:'Kerala',focus:'Krishna',type:'Temple',tradition:'Vaishnavism'},
{id:'kashi-vishwanath',name:'Kashi Vishwanath Temple',place:'Varanasi',district:'Varanasi',state:'Uttar Pradesh',focus:'Shiva',type:'Temple',tradition:'Hinduism'},
{id:'vadakkumnathan',name:'Vadakkumnathan Temple',place:'Thrissur',district:'Thrissur',state:'Kerala',focus:'Shiva',type:'Temple',tradition:'Hinduism'}
];
const UNSUPPORTED=new Set(['Festival / Event','Heritage','Historical Figure','Architecture','Pilgrimage / Temple Circuits']);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const selects=()=>[...document.querySelectorAll('select[data-browse]')];
const filters=()=>Object.fromEntries(selects().filter(s=>s.value).map(s=>[s.dataset.browse,s.value]));
const matches=(t,f)=>Object.entries(f).every(([k,v])=>{
 if(UNSUPPORTED.has(k)) return false;
 if(k==='State / Union Territory') return t.state===v;
 if(k==='District') return t.district===v;
 if(k==='Village / Town / City') return t.place===v;
 if(k==='Religion') return t.tradition==='Hinduism' && v==='Hinduism';
 if(k==='Sect / Tradition') return t.tradition===v;
 if(k==='Deity / Sacred Focus') return t.focus===v;
 if(k==='Site Category') return t.type===v;
 return false;
});
const matching=()=>DATA.filter(t=>matches(t,filters()));
function updateCount(){
 const n=matching().length;
 let p=document.getElementById('browseLiveCount');
 if(!p){
   p=document.createElement('div');p.id='browseLiveCount';p.className='count-pill';
   const g=document.querySelector('.browse-grid');
   if(g) g.insertAdjacentElement('beforebegin',p);
 }
 if(p) p.textContent=`${n.toLocaleString()} temples found`;
}
function resultHTML(rows){return rows.map(t=>`<a class="result-link" href="#temple/${t.id}"><div class="result-thumb"></div><div class="result-main"><strong>${esc(t.name)}</strong><span>${esc(t.place)}, ${esc(t.district)}, ${esc(t.state)}</span><small>✦ ${esc(t.focus)} · ${esc(t.type)}</small></div><b class="result-arrow">›</b></a>`).join('');}
function showResults(){
 const rows=matching();
 const app=document.getElementById('app'); if(!app)return;
 app.innerHTML=`<section class="browse-page"><div class="browse-page-wrap"><div class="page-head"><a class="back" href="#browse">← Back</a><h1>Browse Results</h1></div><span class="count-pill">${rows.length.toLocaleString()} temples found</span><div class="result-list">${rows.length?resultHTML(rows):'<div class="empty">No temples found for the selected filters.</div>'}</div></div></section>`;
}
function selectedSort(){const s=document.getElementById('sortSelect');return s?s.value:'relevance';}
function sorted(rows){const mode=selectedSort();return [...rows].sort((a,b)=>{
 if(mode==='az') return a.name.localeCompare(b.name)||a.id.localeCompare(b.id);
 if(mode==='za') return b.name.localeCompare(a.name)||a.id.localeCompare(b.id);
 if(mode==='stateaz') return a.state.localeCompare(b.state)||a.name.localeCompare(b.name)||a.id.localeCompare(b.id);
 if(mode==='stateza') return b.state.localeCompare(a.state)||a.name.localeCompare(b.name)||a.id.localeCompare(b.id);
 return 0;
});}
function showSortedResults(){
 const rows=sorted(matching()),app=document.getElementById('app');if(!app)return;
 app.innerHTML=`<section class="browse-page"><div class="browse-page-wrap"><div class="page-head"><a class="back" href="#browse">← Back</a><h1>Browse Results</h1></div><span class="count-pill">${rows.length.toLocaleString()} temples found</span><div class="result-list">${rows.length?resultHTML(rows):'<div class="empty">No temples found for the selected filters.</div>'}</div></div></section>`;
}
function bind(){
 document.addEventListener('change',e=>{if(e.target.matches('select[data-browse]')){requestAnimationFrame(updateCount);}});
 window.addEventListener('hashchange',()=>requestAnimationFrame(updateCount));
 document.addEventListener('click',e=>{
   const view=e.target.closest('#viewBrowse');
   if(view){e.preventDefault();e.stopImmediatePropagation();showResults();return;}
   const apply=e.target.closest('#applySort');
   if(apply){e.preventDefault();e.stopImmediatePropagation();showSortedResults();}
 },true);
 requestAnimationFrame(updateCount);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();