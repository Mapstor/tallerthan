/**
 * Fetch Wikipedia images for all celebrities
 * Run with: npx ts-node scripts/fetch-wikipedia-images.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface ImageData {
  [slug: string]: {
    imageUrl: string | null;
    source: string;
    license: string;
  };
}

// Celebrity name overrides for Wikipedia searches
// (when the article name doesn't match Wikipedia exactly)
const NAME_OVERRIDES: { [slug: string]: string } = {
  'dwayne-johnson': 'Dwayne Johnson',
  'the-rock': 'Dwayne Johnson',
  'shaquille-oneal': 'Shaquille O\'Neal',
  'jay-z': 'Jay-Z',
  '50-cent': '50 Cent',
  'ice-cube': 'Ice Cube',
  'snoop-dogg': 'Snoop Dogg',
  'cardi-b': 'Cardi B',
  'lizzo': 'Lizzo',
};

async function getWikipediaImage(name: string): Promise<{ url: string | null; source: string }> {
  try {
    // First, search for the page to get the exact title
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages|info&format=json&pithumbsize=400&origin=*`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    const pages = data.query?.pages;
    if (!pages) return { url: null, source: '' };

    const page = Object.values(pages)[0] as any;

    if (page?.thumbnail?.source) {
      return {
        url: page.thumbnail.source,
        source: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
      };
    }

    return { url: null, source: '' };
  } catch (error) {
    console.error(`Error fetching image for ${name}:`, error);
    return { url: null, source: '' };
  }
}

async function main() {
  // Read celebrity data from existing lib
  const articlesDir = path.join(__dirname, '../../all-articles');
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && f !== 'homepage.md');

  const imageData: ImageData = {};

  console.log(`Fetching images for ${files.length} celebrities...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const slug = file.replace('.md', '');

    // Read article to get celebrity name
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const nameMatch = content.match(/^#\s*How Tall Is ([^?]+)\?/m);
    let name = nameMatch ? nameMatch[1].trim() : slug.replace(/-/g, ' ');

    // Check for name overrides
    if (NAME_OVERRIDES[slug]) {
      name = NAME_OVERRIDES[slug];
    }

    console.log(`[${i + 1}/${files.length}] Fetching: ${name}`);

    const result = await getWikipediaImage(name);

    imageData[slug] = {
      imageUrl: result.url,
      source: result.source,
      license: result.url ? 'Wikipedia (check individual image license)' : '',
    };

    // Rate limiting - be nice to Wikipedia
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Write to JSON file
  const outputPath = path.join(__dirname, '../src/data/celebrity-images.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(imageData, null, 2));

  // Count successes
  const successCount = Object.values(imageData).filter(d => d.imageUrl).length;
  console.log(`\nDone! Found images for ${successCount}/${files.length} celebrities.`);
  console.log(`Output saved to: ${outputPath}`);
}

main().catch(console.error);
