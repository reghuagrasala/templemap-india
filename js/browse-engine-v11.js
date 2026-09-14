(()=>{
const demo=[
{name:'Oachira Parabrahma Temple',place:'Oachira',district:'Kollam',state:'Kerala',focus:'Parabrahmam',type:'Pilgrimage Centre',tradition:'Non-idol worship'},
{name:'Kottakkal Vishwambhara Temple',place:'Kottakkal',district:'Malappuram',state:'Kerala',focus:'Shiva',type:'Temple',tradition:'Hinduism'},
{name:'Somnath Temple',place:'Prabhas Patan',district:'Gir Somnath',state:'Gujarat',focus:'Shiva',type:'Temple',tradition:'Hinduism'},
{name:'Shri Mata Vaishno Devi Shrine',place:'Katra',district:'Reasi',state:'Jammu and Kashmir',focus:'Vaishno Devi',type:'Shrine',tradition:'Hinduism'},
{name:'Tirumala Venkateswara Temple',place:'Tirumala',district:'Tirupati',state:'Andhra Pradesh',focus:'Venkateswara',type:'Temple',tradition:'Vaishnavism'},
{name:'Sabarimala Sree Dharma Sastha Temple',place:'Sabarimala',district:'Pathanamthitta',state:'Kerala',focus:'Ayyappa',type:'Temple',tradition:'Hinduism'},
{name:'Guruvayur Sree Krishna Temple',place:'Guruvayur',district:'Thrissur',state:'Kerala',focus:'Krishna',type:'Temple',tradition:'Vaishnavism'},
{name:'Kashi Vishwanath Temple',place:'Varanasi',district:'Varanasi',state:'Uttar Pradesh',focus:'Shiva',type:'Temple',tradition:'Hinduism'},
{name:'Vadakkumnathan Temple',place:'Thrissur',district:'Thrissur',state:'Kerala',focus:'Shiva',type:'Temple',tradition:'Hinduism'}];
const norm=s=>String(s||'').normalize('NFKC').trim().toLocaleLowerCase();
const get=n=>document.querySelector(`select[data-browse="${CSS.escape(n)}"]`);
const filters=()=>{const f={};document.querySelectorAll('select[data-browse]').forEach(s=>{if(s.value)f[s.dataset.browse]=s.value});return f};
const matches=(t,f)=>Object.entries(f).every(([k,v])=>{switch(k){case'State / Union Territory':return t.state===v;case'District':return t.district===v;case'Village / Town / City':return t.place===v;case'Religion':return t.tradition==='Hinduism'?v==='Hinduism':false;case'Sect / Tradition':return t.tradition===v;case'Deity / Sacred Focus':return t.focus===v;case'Site Category':return t.type===v;case'Festival / Event':return false;default:return false}});
const count=()=>demo.filter(t=>matches(t,filters())).length;
function pill(){let p=document.getElementById('browseLiveCount');if(!p){p=document.createElement('div');p.id='browseLiveCount';p.className='count-pill';const g=document.querySelector('.browse-grid');if(g)g.parentNode.insertBefore(p,g)}p.textContent=`${count().toLocaleString()} temples found`}
function sync(){pill();}
function install(){document.addEventListener('change',e=>{if(e.target.matches('select[data-browse]'))setTimeout(sync,0)});new MutationObserver(()=>{if(document.querySelector('.browse-page'))sync()}).observe(document.body,{childList:true,subtree:true});sync()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();