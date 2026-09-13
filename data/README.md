# TempleMap India data files

The website is designed so routine content updates can be made in data files without changing the main HTML/CSS/JavaScript.

## Home page: `home-data.json`

Use these fields:

- `siteName` — site name
- `description` — home description
- `wallpaper` — image URL/path for the home wallpaper; use `null` when no image is supplied
- `featuredTempleIds` — IDs of featured temples
- `newsLinks` — small text links shown under **Latest Temple News & Festivals**
- `lastUpdated` — date of the data update

Example news link:

```json
{"title":"Festival update","url":"https://example.org/update","source":"Official Temple Source"}
```

## General updates: `updates.json`

Use `items` for verified current information that can be displayed as text links. Keep the original source URL and publication/update date where available.

## Final temple result links: `temple-updates.json`

Each temple ID can contain:

- `lastVerified`
- `links` — official website, booking/darshan, seva/pooja, accommodation, prasadam, live darshan, events/updates, etc.
- `newsLinks` — latest temple-specific news/festival links

Example:

```json
{
  "temples": {
    "somnath": {
      "lastVerified": "2026-09-13",
      "links": [
        {"label":"Official Website","url":"https://example.org"},
        {"label":"Live Darshan","url":"https://example.org/live"}
      ],
      "newsLinks": [
        {"title":"Festival update","url":"https://example.org/news","source":"Official Source"}
      ]
    }
  }
}
```

Only add links that have been verified. TempleMap India is an independent public information resource and should not imply that an external source is operated by TempleMap India.

## Large temple database

Do not put a huge CSV directly into `app.js`. The production India-wide index should be partitioned/indexed so visitors download only the data needed for their search or browse operation.
