// Validates src/content/projects/*.json without extra dependencies.
// Run: npm run validate:content
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dir = path.join(root, 'src', 'content', 'projects');
const validCategories = new Set(['VIDEO', 'AI_CODE', 'DESIGN']);

let errors = [];
let warnings = [];
let checked = 0;
const ids = new Set();

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.json') || file === '_template.json') continue;
  checked++;
  const full = path.join(dir, file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (e) {
    errors.push(`${file}: invalid JSON (${e.message})`);
    continue;
  }
  const need = ['id', 'title', 'category', 'date', 'imageUrl', 'description', 'tags', 'tech'];
  for (const k of need) {
    if (data[k] === undefined || data[k] === '') errors.push(`${file}: missing "${k}"`);
  }
  if (data.id) {
    if (!/^[a-z0-9-]+$/.test(data.id)) errors.push(`${file}: id "${data.id}" must be kebab-case (a-z, 0-9, -)`);
    if (ids.has(data.id)) errors.push(`${file}: duplicate id "${data.id}"`);
    ids.add(data.id);
    const expected = `${data.id}.json`;
    if (file !== expected) errors.push(`${file}: filename should match id -> ${expected}`);
  }
  if (data.category && !validCategories.has(data.category)) {
    errors.push(`${file}: category must be one of ${[...validCategories].join(', ')}`);
  }
  if (data.imageUrl && data.imageUrl.startsWith('/')) {
    const local = path.join(root, 'public', data.imageUrl.replace(/^\//, ''));
    if (!fs.existsSync(local)) errors.push(`${file}: image not found at public${data.imageUrl} (expected ${local})`);
  } else if (data.imageUrl && !/^https?:\/\//.test(data.imageUrl)) {
    errors.push(`${file}: imageUrl must start with /projects/... or https://`);
  }
  if (data.order !== undefined && typeof data.order !== 'number') {
    errors.push(`${file}: order must be a number`);
  }
  if (data.highlights !== undefined) {
    if (!Array.isArray(data.highlights)) warnings.push(`${file}: highlights should be an array of strings`);
    else if (data.highlights.length > 3) warnings.push(`${file}: highlights has ${data.highlights.length} items, modal shows max 3`);
  } else {
    warnings.push(`${file}: no highlights — modal looks best with 3 short bullets`);
  }
  if (data.outcome !== undefined && data.outcome.length > 120) {
    warnings.push(`${file}: outcome is ${data.outcome.length} chars, keep under ~120`);
  }
  if (data.summary === undefined) {
    warnings.push(`${file}: no summary — modal falls back to the one-line description`);
  }
  for (const k of ['link', 'githubUrl']) {
    if (data[k] !== undefined && !/^https?:\/\//.test(data[k])) {
      errors.push(`${file}: ${k} must be an https:// URL`);
    }
  }
}

if (errors.length) {
  console.error(`validate:content FAILED (${checked} files):\n - ` + errors.join('\n - '));
  process.exit(1);
} else {
  console.log(`validate:content OK — ${checked} project(s), ${ids.size} unique id(s).`);
  if (warnings.length) console.warn(`warnings:\n - ` + warnings.join('\n - '));
}
