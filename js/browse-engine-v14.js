(()=>{
/* Browse engine v14: uses the app's canonical temple dataset, resets stale dependent filters, and keeps filtering strict. */
const UNSUPPORTED=new Set(['Festival / Event','Heritage','Historical Figure','Architecture','Pilgrimage / Temple Circuits']);
const ADMIN={};
const FALLBACK=[
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
const DATA=()=>Array.isArray(window.templeMapTemples)&&window.templeMapTemples.length?window.templeMapTemples:FALLBACK;
const STORAGE_KEY='templemap-browse-filters-v14';
const selects=()=>[...document.querySelectorAll('select[data-browse]')];
const load=()=>{try{return JSON.parse(sessionStorage.getItem(STORAGE_KEY)||'{}')}catch{return{}}};
let filters=load();
const save=()=>sessionStorage.setItem(STORAGE_KEY,JSON.stringify(filters));
const esc=s=>String(s??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
const value=(t,k)=>k==='State / Union Territory'?t.state:k==='District'?t.district:k==='Village / Town / City'?t.place:k==='Sacred Focus'?t.sacredFocus:k==='Site Category'?t.type:k==='Sect / Tradition'?t.tradition:k==='Religion'?t.religion:null;
function matches(t){return Object.entries(filters).every(([k,v])=>{if(!v)return true;if(UNSUPPORTED.has(k))return false;const x=value(t,k);return x!==null&&x===v})}
function rows(){return DATA().filter(matches)}
function sync(){selects().forEach(s=>{s.value=filters[s.dataset.browse]||''});updateDependentOptions();}
function updateDependentOptions(){const state=filters['State / Union Territory']||'';const district=filters['District']||'';const ds=selects().find(x=>x.dataset.browse==='District');const ps=selects().find(x=>x.dataset.browse==='Village / Town / City');if(ds){const vals=[...new Set(DATA().filter(t=>!state||t.state===state).map(t=>t.district).filter(Boolean))].sort();ds.innerHTML='<option value="">Select</option>'+vals.map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join('');ds.value=district&&vals.includes(district)?district:''}if(ps){const vals=[...new Set(DATA().filter(t=>(!state||t.state===state)&&(!district||t.district===district)).map(t=>t.place).filter(Boolean))].sort();ps.innerHTML='<option value="">Select</option>'+vals.map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join('');ps.value=filters['Village / Town / City']&&vals.includes(filters['Village / Town / City'])?filters['Village / Town / City']:''}}
function updateCount(){let p=document.getElementById('browseLiveCount');if(!p){p=document.createElement('div');p.id='browseLiveCount';p.className='count-pill';document.querySelector('.browse-grid')?.insertAdjacentElement('beforebegin',p)}if(p)p.textContent=`${rows().length.toLocaleString()} temples found`}
function resultHTML(a){return a.map(t=>`<a class="result-link" href="#temple/${t.id}"><div class="result-thumb"></div><div class="result-main"><strong>${esc(t.name)}</strong><span>${esc(t.place)}, ${esc(t.district)}, ${esc(t.state)}</span><small>✦ ${esc(t.focus)} · ${esc(t.type)}</small></div><b class="result-arrow">›</b></a>`).join('')}
function showResults(){const r=rows(),app=document.getElementById('app');if(!app)return;app.innerHTML=`<section class="browse-page"><div class="browse-page-wrap"><div class="page-head"><a class="back" href="#browse">← Back</a><h1>Browse Results</h1></div><span class="count-pill">${r.length.toLocaleString()} temples found</span><div class="result-list">${r.length?resultHTML(r):'<div class="empty">No temples found for the selected filters.</div>'}</div></div></section>`}
function onChange(e){const s=e.target;if(!s.matches('select[data-browse]'))return;const n=s.dataset.browse,v=s.value;if(n==='State / Union Territory'&&v){filters={'State / Union Territory':v};selects().forEach(x=>{if(x!==s)x.value=''})}else if(n==='State / Union Territory'){delete filters[n]}else if(n==='District'){if(v)filters[n]=v;else delete filters[n];delete filters['Village / Town / City'];const p=selects().find(x=>x.dataset.browse==='Village / Town / City');if(p)p.value=''}else{if(v)filters[n]=v;else delete filters[n]}if(window.templeMapState)window.templeMapState.filters={...filters};save();sync();updateCount()}
function bind(){document.addEventListener('change',onChange,true);document.addEventListener('click',e=>{const b=e.target.closest('#viewBrowse');if(b){e.preventDefault();e.stopImmediatePropagation();showResults()}},true);window.addEventListener('hashchange',()=>setTimeout(()=>{if(location.hash==='#browse'){sync();updateCount()}},0));setTimeout(()=>{if(location.hash==='#browse'){sync();updateCount()}},0)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();