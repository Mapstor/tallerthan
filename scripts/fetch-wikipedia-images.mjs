/**
 * Fetch Wikipedia images for all celebrities
 * Run with: node scripts/fetch-wikipedia-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Celebrity name overrides for Wikipedia searches
const NAME_OVERRIDES = {
  'dwayne-johnson': 'Dwayne Johnson',
  'shaquille-oneal': "Shaquille O'Neal",
  'jay-z': 'Jay-Z',
  '50-cent': '50 Cent',
  'ice-cube': 'Ice Cube',
  'snoop-dogg': 'Snoop Dogg',
  'cardi-b': 'Cardi B',
  'lizzo': 'Lizzo',
  'vin-diesel': 'Vin Diesel',
  'the-weeknd': 'The Weeknd',
  'post-malone': 'Post Malone',
  'bad-bunny': 'Bad Bunny',
  'dua-lipa': 'Dua Lipa',
  'billie-eilish': 'Billie Eilish',
  'mrbeast': 'MrBeast',
  'pewdiepie': 'PewDiePie',
  'queen-elizabeth-ii': 'Elizabeth II',
  'prince-william': 'William, Prince of Wales',
  'prince-harry': 'Prince Harry, Duke of Sussex',
  'kate-middleton': 'Catherine, Princess of Wales',
  'meghan-markle': 'Meghan, Duchess of Sussex',
};

async function getWikipediaImage(name) {
  try {
    // Wikipedia API requires proper User-Agent
    const headers = {
      'User-Agent': 'BodyScale/1.0 (https://bodyscale.com; contact@bodyscale.com) Node.js',
      'Accept': 'application/json',
    };

    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=400`;

    const response = await fetch(searchUrl, { headers });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();

    // Check if response is HTML (error page)
    if (text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
      throw new Error('Got HTML instead of JSON');
    }

    const data = JSON.parse(text);
    const pages = data.query?.pages;
    if (!pages) return { url: null, source: '' };

    const page = Object.values(pages)[0];

    if (page?.thumbnail?.source) {
      return {
        url: page.thumbnail.source,
        source: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title || name)}`,
      };
    }

    return { url: null, source: '' };
  } catch (error) {
    console.error(`  Error: ${error.message}`);
    return { url: null, source: '' };
  }
}

async function main() {
  const articlesDir = path.join(__dirname, '../../all-articles');
  const files = fs.readdirSync(articlesDir).filter(f =>
    f.endsWith('.md') &&
    !f.includes('CLAUDE') &&
    !f.includes('PROJECT') &&
    !f.includes('homepage') &&
    !f.includes('drive-time') &&
    !f.includes('radius-') &&
    !f.includes('remaining-')
  );

  const imageData = {};

  console.log(`Fetching images for ${files.length} celebrities...\n`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const slug = file.replace('.md', '');

    // Read article to get celebrity name
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const nameMatch = content.match(/^#\s*How Tall Is ([^?]+)\?/m);

    // Convert slug to title case as fallback
    const slugToName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    let name = nameMatch ? nameMatch[1].trim() : slugToName;

    // Check for name overrides
    if (NAME_OVERRIDES[slug]) {
      name = NAME_OVERRIDES[slug];
    }

    process.stdout.write(`[${String(i + 1).padStart(3)}/${files.length}] ${name.padEnd(30)}`);

    const result = await getWikipediaImage(name);

    imageData[slug] = {
      imageUrl: result.url,
      source: result.source,
      license: result.url ? 'CC/Fair Use via Wikipedia' : '',
    };

    console.log(result.url ? '  ✓' : '  ✗');

    // Rate limiting - be nice to Wikipedia
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Write to JSON file
  const outputPath = path.join(__dirname, '../src/data/celebrity-images.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(imageData, null, 2));

  // Count successes
  const successCount = Object.values(imageData).filter(d => d.imageUrl).length;
  console.log(`\n========================================`);
  console.log(`Done! Found images for ${successCount}/${files.length} celebrities.`);
  console.log(`Output saved to: ${outputPath}`);
}

main().catch(console.error);
