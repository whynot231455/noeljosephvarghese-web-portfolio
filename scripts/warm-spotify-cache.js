const fs = require('fs');
const path = require('path');

async function warmCache() {
  const contentDir = path.join(process.cwd(), 'content');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const cachePath = path.join(contentDir, 'playlists.cache.json');

  if (!fs.existsSync(cachePath)) {
    // Write an empty array fallback so that the build does not fail.
    // Replace this with actual fetch logic if you need fresh data at build time.
    fs.writeFileSync(cachePath, JSON.stringify([], null, 2), 'utf-8');
    console.log('[Spotify prebuild] Created empty content/playlists.cache.json');
  } else {
    console.log('[Spotify prebuild] content/playlists.cache.json already exists');
  }
}

warmCache().catch(console.error);
