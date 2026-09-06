# Gallery content guide

Projects are **one JSON file each** in `src/content/projects/`. No code edits needed.

## Add a project
1. Copy `src/content/projects/_template.json` → `src/content/projects/<my-id>.json`
   - `<my-id>` = kebab-case, e.g. `my-new-app`. Filename must match the `id` inside.
2. Fill in `title`, `category` (`AI_CODE` or `DESIGN`), `date`, `description`, `tags`, `tech`.
   - `description` is the one-liner on the gallery card; `summary` is the 2–3 line explainer in the modal.
   - Write 3 short `highlights` bullets + a one-line `outcome` — the modal shows those instead of paragraphs.
   - `role` is a short line shown next to the date (e.g. "Design + front-end build").
3. Cover image (two options):
   - **Upload a file (recommended):** create `public/projects/<my-id>/cover.png`, put your image there, set `"imageUrl": "/projects/<my-id>/cover.png"`.
   - **Use a URL:** set `"imageUrl": "https://..."` (Behance, etc.).
4. Set `"order"` — lowest number shows first.
5. Run `npm run validate:content`, then commit + push. Vercel redeploys automatically.

## Remove a project
Delete `src/content/projects/<id>.json` (and optionally `public/projects/<id>/`). Commit + push.

## Reorder / move
Change the `order` numbers. Lowest first. Commit + push.

## Tips
- Recommended cover: 1600×900, JPG/PNG under ~500KB.
- `link`, `githubUrl`, `badge`, `stats`, `featured` are optional.
- `link` drives the modal's "CHECK OUT MY WORK" button; `githubUrl` adds a GitHub icon on the card (and modal, when different from `link`).
- The modal shows max 3 highlights, 3 stats, and 8 stack/tag pills (rest collapse to "+n more").
- Invalid files are skipped with a console warning — the gallery never crashes.
