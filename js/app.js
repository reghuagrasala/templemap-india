const state = {
  route: location.hash.replace('#', '') || 'home',
  previousRoute: 'home',
  query: '',
  results: [],
  favourites: JSON.parse(localStorage.getItem('templemap-favourites') || '[]'),
  textSize: localStorage.getItem('templemap-text-size') || 'normal'
};

const temples = [
  { id: 'ochira', name: 'Oachira Parabrahma Temple', ml: 'ഓച്ചിറ പരബ്രഹ്മ ക്ഷേത്രം', place: 'Oachira', district: 'Kollam', state: 'Kerala', focus: 'Parabrahmam', type: 'Pilgrimage centre', tradition: 'Non-idol worship' },
  { id: 'kottakkal-vishwambhara', name: 'Kottakkal Vishwambhara Temple', ml: 'കോട്ടക്കൽ വിശ്വംഭര ക്ഷേത്രം', place: 'Kottakkal', district: 'Malappuram', state: 'Kerala', focus: 'Shiva', type: 'Temple', tradition: 'Hindu' },
  { id: 'somnath', name: 'Somnath Temple', ml: 'സോമനാഥ ക്ഷേത്രം', place: 'Prabhas Patan', district: 'Gir Somnath', state: 'Gujarat', focus: 'Shiva', type: 'Temple', tradition: 'Hindu' },
  { id: 'vaishno-devi', name: 'Shri Mata Vaishno Devi Shrine', ml: 'ശ്രീ മാതാ വൈഷ്ണോ ദേവി ക്ഷേത്രം', place: 'Katra', district: 'Reasi', state: 'Jammu and Kashmir', focus: 'Vaishno Devi', type: 'Shrine', tradition: 'Hindu' },
  { id: 'tirumala', name: 'Tirumala Venkateswara Temple', ml: 'തിരുമല വെങ്കടേശ്വര ക്ഷേത്രം', place: 'Tirumala', district: 'Tirupati', state: 'Andhra Pradesh', focus: 'Venkateswara', type: 'Temple', tradition: 'Vaishnavism' }
];

const browseCategories = [
  ['State / Union Territory', 'Browse temples by state or union territory'],
  ['Religion', 'Browse by religion'],
  ['Sect / Tradition', 'Browse by sect or tradition'],
  ['Deity / Sacred Focus', 'Browse by deity or sacred focus'],
  ['Site Category', 'Temple, shrine, pilgrimage centre and more'],
  ['Heritage', 'Browse heritage-related places'],
  ['Historical Figure', 'Browse sites associated with historical figures'],
  ['Architecture', 'Browse by architectural tradition'],
  ['Pilgrimage / Temple Circuits', 'Explore pilgrimage routes and circuits']
];

function saveFavourites() { localStorage.setItem('templemap-favourites', JSON.stringify(state.favourites)); }
function applyTextSize() { document.body.classList.remove('large-text', 'xlarge-text'); if (state.textSize === 'large') document.body.classList.add('large-text'); if (state.textSize === 'xlarge') document.body.classList.add('xlarge-text'); }
function navigate(route) { location.hash = route; }

function searchTemples(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return temples.filter(t => [t.name, t.ml, t.place, t.district, t.state, t.focus, t.type, t.tradition].some(v => v && v.toLowerCase().includes(q)));
}

function searchPage() {
  const results = searchTemples(state.query);
  state.results = results;
  return `<div class="page-head"><a class="back" href="#home">← Back</a><h1>Search</h1></div>
    <div class="search-box"><input id="searchInput" value="${escapeHtml(state.query)}" placeholder="Search in English or Malayalam" autocomplete="off"></div>
    ${state.query ? `<span class="count-pill">${results.length.toLocaleString()} results found</span>` : '<p class="muted">Search by temple name, place, district, state, deity or sacred focus.</p>'}
    ${results.length ? `<div class="result-list">${results.slice(0, 10).map(resultLink).join('')}</div>${results.length > 10 ? '<p class="muted">Showing the first 10 results.</p>' : ''}` : state.query ? '<div class="empty">No matching temples found.</div>' : ''}`;
}

function resultLink(t) { return `<a class="result-link" href="#temple/${t.id}"><strong>${escapeHtml(t.name)}</strong><span class="muted">${escapeHtml(t.place)}, ${escapeHtml(t.district)}, ${escapeHtml(t.state)}</span></a>`; }
function templePage(id) {
  const t = temples.find(x => x.id === id);
  if (!t) return `<div class="empty">Temple not found.</div>`;
  const saved = state.favourites.includes(t.id);
  return `<div class="page-head"><a class="back" href="#${state.previousRoute || 'search'}">← Back</a><h1>Temple</h1></div>
    <div class="detail-grid">
      <div class="detail-image" role="img" aria-label="Temple image placeholder">⌂</div>
      <div class="detail-panel">
        <h2>${escapeHtml(t.name)}</h2>
        <p class="muted">${escapeHtml(t.ml)}</p>
        <div class="field"><b>Place</b>${escapeHtml(t.place)}, ${escapeHtml(t.district)}, ${escapeHtml(t.state)}</div>
        <div class="field"><b>Sacred Focus</b>${escapeHtml(t.focus)}</div>
        <div class="field"><b>Site Category</b>${escapeHtml(t.type)}</div>
        <div class="field"><b>Tradition</b>${escapeHtml(t.tradition)}</div>
        <div class="actions" style="margin-top:14px"><button class="${saved ? 'secondary' : 'primary'}" id="favButton">${saved ? '♥ Saved' : '♡ Add to Favourites'}</button></div>
        <div class="notice">TempleMap India is an independent public information resource. Verify changing information with the original authority before travelling.</div>
      </div>
    </div>`;
}

function homePage() {
  return `<section class="hero"><h1>TempleMap India</h1><p>A lightweight directory of temples and sacred places across India.</p></section>
    <div class="search-box"><input id="homeSearch" placeholder="Search in English or Malayalam" autocomplete="off"></div>
    <div class="actions"><a class="primary" href="#search">Search Temples</a><a class="secondary" href="#browse">Browse</a></div>
    <div class="status-row section"><span class="count-pill" id="locationStatus">📍 Location — Ready</span><span class="count-pill" id="internetStatus">🌐 Internet — Connected</span></div>
    <div class="notice">Please enable Location and Internet access for maps, nearby temples and latest updates.</div>
    <section class="section"><h2>Featured Temples</h2><div class="feature-strip">${temples.slice(0, 4).map(t => `<a class="feature" href="#temple/${t.id}"><div class="feature-thumb">⌂</div><span class="feature-name">${escapeHtml(t.name)}</span><small class="muted">${escapeHtml(t.place)}</small></a>`).join('')}</div></section>
    <section class="section"><h2>Latest Temple News & Festivals</h2><div class="card"><strong>Updates will appear here</strong><small>Official and verified current links will be added as the data layer grows.</small></div></section>`;
}

function browsePage() {
  return `<div class="page-head"><a class="back" href="#home">← Back</a><h1>Browse</h1></div><div class="filter-list">${browseCategories.map(([a,b]) => `<button class="filter-row" data-filter="${escapeHtml(a)}"><span><strong>${escapeHtml(a)}</strong><br><small class="muted">${escapeHtml(b)}</small></span><span>›</span></button>`).join('')}</div>`;
}

function favouritesPage() {
  const saved = temples.filter(t => state.favourites.includes(t.id));
  return `<div class="page-head"><a class="back" href="#home">← Back</a><h1>Favourites</h1></div>${saved.length ? `<div class="result-list">${saved.map(resultLink).join('')}</div>` : '<div class="empty">No favourites saved yet.<br>Open a temple and choose “Add to Favourites”.</div>'}`;
}

function settingsPage() {
  return `<div class="page-head"><a class="back" href="#home">← Back</a><h1>Settings</h1></div>
    <div class="filter-list">
      <div class="filter-row"><span><strong>📍 Location</strong><br><small class="muted">Permission status is controlled by your device/browser.</small></span><button class="secondary" id="locationButton">Enable</button></div>
      <div class="filter-row"><span><strong>🌐 Internet connection</strong><br><small class="muted">Used for maps and current information.</small></span><span class="muted">Check</span></div>
      <div class="filter-row"><span><strong>Language</strong><br><small class="muted">Interface language</small></span><span>English</span></div>
      <div class="filter-row"><span><strong>Text Size</strong><br><small class="muted">Layout reflows for larger text</small></span><select id="textSize"><option value="normal" ${state.textSize==='normal'?'selected':''}>Normal</option><option value="large" ${state.textSize==='large'?'selected':''}>Large</option><option value="xlarge" ${state.textSize==='xlarge'?'selected':''}>Extra Large</option></select></div>
      <div class="card"><strong>About</strong><small>TempleMap India is an independent public information directory, not a government website or government service.</small></div>
      <div class="card"><strong>Privacy</strong><small>Favourites are stored locally in this browser in the current version.</small></div>
    </div>`;
}

function render() {
  const app = document.getElementById('app');
  const [base, id] = state.route.split('/');
  if (base === 'temple') app.innerHTML = templePage(id);
  else if (base === 'search') app.innerHTML = searchPage();
  else if (base === 'browse') app.innerHTML = browsePage();
  else if (base === 'favourites') app.innerHTML = favouritesPage();
  else if (base === 'settings') app.innerHTML = settingsPage();
  else app.innerHTML = homePage();
  updateNav(base);
  bindEvents();
  applyTextSize();
  app.scrollTop = 0;
}

function updateNav(base) {
  document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === base || (base === 'temple' && a.dataset.nav === state.previousRoute)));
}
function bindEvents() {
  const input = document.getElementById('searchInput');
  if (input) input.addEventListener('input', e => { state.query = e.target.value; render(); const el=document.getElementById('searchInput'); el?.focus(); el?.setSelectionRange(el.value.length,el.value.length); });
  const homeSearch = document.getElementById('homeSearch');
  if (homeSearch) homeSearch.addEventListener('keydown', e => { if (e.key === 'Enter') { state.query = e.target.value; navigate('search'); } });
  document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => alert(`${b.dataset.filter} browsing will be connected to the full India data index next.`)));
  const favButton = document.getElementById('favButton');
  if (favButton) favButton.addEventListener('click', () => {
    const id = state.route.split('/')[1];
    state.favourites = state.favourites.includes(id) ? state.favourites.filter(x => x !== id) : [...state.favourites, id];
    saveFavourites(); render();
  });
  const settingsButton = document.getElementById('settingsButton');
  if (settingsButton) settingsButton.onclick = () => navigate('settings');
  const textSize = document.getElementById('textSize');
  if (textSize) textSize.onchange = e => { state.textSize = e.target.value; localStorage.setItem('templemap-text-size', state.textSize); applyTextSize(); };
  const locationButton = document.getElementById('locationButton');
  if (locationButton) locationButton.onclick = () => { if (!navigator.geolocation) return alert('Location is not supported by this browser.'); navigator.geolocation.getCurrentPosition(() => alert('Location permission is enabled for TempleMap India.'), () => alert('Location permission was not granted.')); };
}
function escapeHtml(value) { return String(value).replace(/[&<>'\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c])); }
window.addEventListener('hashchange', () => {
  const nextRoute = location.hash.replace('#', '') || 'home';
  const nextBase = nextRoute.split('/')[0];
  const currentBase = state.route.split('/')[0];
  if (nextBase === 'temple' && currentBase !== 'temple') state.previousRoute = state.route;
  state.route = nextRoute;
  render();
});
render();
