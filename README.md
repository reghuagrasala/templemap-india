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


## Data pipeline

Kaggle is used as a **private candidate-data source**, not as an automatically trusted production database. The Kaggle API credentials must never be placed in `index.html`, browser JavaScript, or public data files.

The repository includes `.github/workflows/kaggle-candidate-refresh.yml`. It downloads the configured Kaggle dataset with the Kaggle API, validates the downloaded CSV files, and stores the candidate data as a short-lived GitHub Actions artifact. It deliberately does **not** publish Kaggle records directly to TempleMap India.

Configure these GitHub repository settings before using the workflow:

- Secret: `KAGGLE_API_TOKEN`
- Repository variable: `KAGGLE_DATASET` (Kaggle dataset slug such as `owner/dataset-name`)

Candidate records should subsequently be normalized, deduplicated, and verified against authoritative or credible sources before entering the public production dataset.

## Browse taxonomy

Browse uses standardized categories for filtering rather than treating every local deity name as a separate canonical deity. Local/traditional names and aliases remain searchable. For example, a verified Parthasarathy record can have a canonical sacred focus of Krishna, while Mahadeva can map to Shiva; “Amman” is not automatically mapped to Durga.

Administrative State/UT → District → Village/Town/City filtering is state-dependent. District lists should be maintained from current Government of India administrative sources rather than inferred from the small development sample. The Integrated Government Online Directory publishes the State/UT-wise district directory and identifies it as a Government of India directory.

The current interface sample remains a development dataset; it is not yet the final India-wide verified temple database.
