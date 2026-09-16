(()=>{
/* Browse engine v13: canonical filter state, dependent-filter reset, strict matching, no MutationObserver. */
const DATA=[
{id:'ochira',name:'Oachira Parabrahma Temple',place:'Oachira',district:'Kollam',state:'Kerala',focus:'Parabrahmam',type:'Pilgrimage Centre',tradition:'Non-idol worship'},
{id:'kottakkal-vishwambhara',name:'Kottakkal Vishwambhara Temple',place:'Kottakkal',district:'Malappuram',state:'Kerala',focus:'Shiva',type:'Temple',tradition:'Hinduism'},
{id:'somnath',name:'Somnath Temple',place:'Prabhas Patan',district:'Gir Somnath',state:'Gujarat',focus:'Shiva',type:'Temple',tradition:'Hinduism'},
{id:'vaishno-devi',name:'Shri Mata Vaishno Devi Shrine',place:'Katra',district:'Reasi',state:'Jammu and Kashmir',focus:'Vaishno Devi',tradition:'Hinduism'},
{id:'tirumala',name:'Tirumala Venkateswara Temple',place:'Tirumala',district:'Tirupati',state:'Andhra Pradesh',focus:'Venkateswara',type:'Temple',tradition:'Vaishnavism'},
{id:'sabarimala',name:'Sabarimala Sree Dharma Sastha Temple',place:'Sabarimala',district:'Pathanamthitta',state:'Kerala',focus:'Ayyappa',type:'Temple',tradition:'Hinduism'},
{id:'guruvayur',name:'Guruvayur Sree Krishna Temple',place:'Guruvayur',district:'Thrissur',state:'Kerala',focus:'Krishna',type:'Temple',tradition:'Vaishnavism'},
{id:'kashi-vishwanath',name:'Kashi Vishwanath Temple',place:'Varanasi',district:'Varanasi',state:'Uttar Pradesh',focus:'Shiva',type:'Temple',tradition:'Hinduism'},
{id:'vadakkumnathan',name:'Vadakkumnathan Temple',place:'Thrissur',district:'Thrissur',state:'Kerala',focus:'Shiva',type:'Temple',tradition:'Hinduism'}
];
const UNSUPPORTED=new Set(['Festival / Event','Heritage','Historical Figure','Architecture','Pilgrimage / Temple Circuits']);
const esc=s=>String(s??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
const STORAGE_KEY='templemap-browse-filters-v13';
const selects=()=>[...document.querySelectorAll('select[data-browse]')];
const load=()=>{try{return JSON.parse(sessionStorage.getItem(STORAGE_KEY)||'{}')}catch{return{}}};
let filters=load();
const save=()=>sessionStorage.setItem(STORAGE_KEY,JSON.stringify(filters));
function syncDom(){selects().forEach(s=>{s.value=filters[s.dataset.browse]||''})}
function captureInitial(){if(Object.keys(filters).length){syncDom();return}filters=Object.fromEntries(selects().filter(s=>s.value).map(s=>[s.dataset.browse,s.value]));save()}
function matches(t,f){return Object.entries(f).every(([k,v])=>{if(!v)return true;if(UNSUPPORTED.has(k))return false;if(k==='State / Union Territory')return t.state===v;if(k==='District')return t.district===v;if(k==='Village / Town / City')return t.place===v;if(k==='Religion')return v==='Hinduism';if(k==='Sect / Tradition')return t.tradition===v;if(k==='Deity / Sacred Focus')return t.focus===v;if(k==='Site Category')return t.type===v;return false})}
function rows(){return DATA.filter(t=>matches(t,filters))}
function updateCount(){let p=document.getElementById('browseLiveCount');if(!p){p=document.createElement('div');p.id='browseLiveCount';p.className='count-pill';document.querySelector('.browse-grid')?.insertAdjacentElement('beforebegin',p)}if(p)p.textContent=`${rows().length.toLocaleString()} temples found`}
function resultHTML(a){return a.map(t=>`<a class="result-link" href="#temple/${t.id}"><div class="result-thumb"></div><div class="result-main"><strong>${esc(t.name)}</strong><span>${esc(t.place)}, ${esc(t.district)}, ${esc(t.state)}</span><small>✦ ${esc(t.focus)} · ${esc(t.type)}</small></div><b class="result-arrow">›</b></a>`).join('')}
function sorted(a){const m=document.getElementById('sortSelect')?.value||'relevance';return [...a].sort((x,y)=>m==='az'?x.name.localeCompare(y.name):m==='za'?y.name.localeCompare(x.name):m==='stateaz'?x.state.localeCompare(y.state)||x.name.localeCompare(y.name):m==='stateza'?y.state.localeCompare(x.state)||y.name.localeCompare(x.name):0)}
function showResults(applySort=false){let r=rows();if(applySort)r=sorted(r);const app=document.getElementById('app');if(!app)return;app.innerHTML=`<section class="browse-page"><div class="browse-page-wrap"><div class="page-head"><a class="back" href="#browse">← Back</a><h1>Browse Results</h1></div><span class="count-pill">${r.length.toLocaleString()} temples found</span><div class="result-list">${r.length?resultHTML(r):'<div class="empty">No temples found for the selected filters.</div>'}</div></div></section>`}
function onChange(e){const s=e.target;if(!s.matches('select[data-browse]'))return;const n=s.dataset.browse,v=s.value;if(n==='State / Union Territory'&&v!==filters[n]){filters={};if(v)filters[n]=v;selects().forEach(x=>{if(x!==s)x.value=''})}else if(n==='District'&&v!==filters[n]){if(v)filters[n]=v;else delete filters[n];delete filters['Village / Town / City'];const place=selects().find(x=>x.dataset.browse==='Village / Town / City');if(place)place.value=''}else{if(v)filters[n]=v;else delete filters[n]}save();updateCount()}
function bind(){document.addEventListener('change',onChange,true);document.addEventListener('click',e=>{const v=e.target.closest('#viewBrowse');if(v){e.preventDefault();e.stopImmediatePropagation();showResults(false);return}const a=e.target.closest('#applySort');if(a){e.preventDefault();e.stopImmediatePropagation();showResults(true)}},true);window.addEventListener('hashchange',()=>setTimeout(()=>{if(location.hash==='#browse'){captureInitial();syncDom();updateCount()}},0));setTimeout(()=>{if(location.hash==='#browse'){captureInitial();syncDom();updateCount()}},0)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();