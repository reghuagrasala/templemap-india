# TempleMap India

TempleMap India is an independent, lightweight public information directory for temples and sacred places across India.

## Initial architecture

- `index.html` — responsive application shell
- `css/styles.css` — mobile-first responsive styling
- `js/app.js` — navigation and initial application logic
- `data/home-data.json` — home wallpaper, featured temples and news configuration
- `data/updates.json` — general current updates
- `data/temple-updates.json` — temple-specific current updates
- `data/temples/` — scalable temple data layer

The project is deliberately data-first. The large candidate CSV used during research is not loaded into every visitor's browser. Temple records will be progressively verified and indexed.

## Principles

1. Fast on mobile and slow connections.
2. Text and search first; images load only when useful.
3. Search in English or Malayalam, with multilingual temple information planned.
4. Clear distinction between verified information and unverified candidates.
5. Official temple/authority sources take priority for changing information.
6. The site is independent and must not be presented as a government service.
7. Responsive text sizing must reflow rather than break the layout.

## Status

Early foundation build. The current sample data is for interface development only; it is not a complete or authoritative India-wide temple database.
