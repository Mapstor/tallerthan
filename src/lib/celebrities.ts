import { getAllArticles, Article } from './articles';
import { parseHeightWithCm, generateHeightSlug } from './utils';

export interface Celebrity {
  slug: string;
  name: string;
  heightCm: number;
  heightImperial: string;
  heightClaimed?: string;
  weightLbs?: number;
  weightKg?: number;
  birthDate?: string;
  birthPlace?: string;
  nationality?: string;
  profession?: string;
  title: string;
  metaDescription: string;
  imageUrl?: string;
  imageSource?: string;
}

// Load celebrity images from pre-fetched data
import celebrityImages from '@/data/celebrity-images.json';

interface ImageData {
  [slug: string]: {
    imageUrl: string | null;
    source: string;
    license: string;
  };
}

const imageData: ImageData = celebrityImages as ImageData;

/**
 * Extract celebrity name from H1 heading
 */
function extractName(content: string): string | null {
  // Match "# How Tall Is [Name]?" pattern
  const h1Match = content.match(/^#\s*How Tall Is ([^?]+)\?/m);
  if (h1Match) {
    return h1Match[1].trim();
  }

  // Fallback: first H1
  const fallbackMatch = content.match(/^#\s*(.+)$/m);
  if (fallbackMatch) {
    return fallbackMatch[1].trim();
  }

  return null;
}

/**
 * Extract height from Quick Answer box
 * Looks for patterns like "📏 **5'10\" (178 cm)**" or similar
 */
function extractHeight(content: string): { imperial: string; cm: number } | null {
  // Look for height in Quick Answer section
  const heightPatterns = [
    // Pattern: 📏 **5'10" (178 cm)** barefoot
    /📏\s*\*\*(\d+'\d+(?:½|\.5)?(?:"|'')?\s*\([\d.]+\s*cm\))\*\*/i,
    // Pattern: **5'10" (178 cm)** barefoot
    /\*\*(\d+'\d+(?:½|\.5)?(?:"|'')?\s*\([\d.]+\s*cm\))\*\*\s*barefoot/i,
    // Pattern in blockquote: > 📏 **5'2½" (158.8 cm)**
    />\s*📏\s*\*\*(\d+'\d+(?:½|\.5)?(?:"|'')?\s*\([\d.]+\s*cm\))\*\*/i,
    // Any height pattern with cm
    /(\d+'\d+(?:½|\.5)?(?:"|'')?)\s*\(([\d.]+)\s*cm\)/,
  ];

  for (const pattern of heightPatterns) {
    const match = content.match(pattern);
    if (match) {
      // If we have separate groups for imperial and cm
      if (match[2]) {
        return {
          imperial: match[1],
          cm: parseFloat(match[2]),
        };
      }
      // Parse from combined string
      const parsed = parseHeightWithCm(match[1]);
      if (parsed) {
        return parsed;
      }
    }
  }

  return null;
}

/**
 * Extract claimed height
 */
function extractClaimedHeight(content: string): string | null {
  const patterns = [
    /📋\s*Claims:\s*([^\n]+)/i,
    /Claims:\s*\*?\*?(\d+'\d+(?:½|\.5)?(?:"|'')?)[\s\S]*?(?:\(|$)/i,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].trim().replace(/\*+/g, '');
    }
  }

  return null;
}

/**
 * Extract weight from Quick Answer box
 */
function extractWeight(content: string): { lbs: number; kg: number } | null {
  // Pattern: ⚖️ Weight: ~141 lbs (64 kg)
  const pattern = /⚖️\s*Weight:\s*~?(\d+)\s*lbs?\s*\((\d+)\s*kg\)/i;
  const match = content.match(pattern);

  if (match) {
    return {
      lbs: parseInt(match[1], 10),
      kg: parseInt(match[2], 10),
    };
  }

  return null;
}

/**
 * Extract birth date from Quick Answer box
 */
function extractBirthInfo(content: string): { date?: string; place?: string } | null {
  // Pattern: 🎂 Born: July 6, 1979, Philadelphia, Pennsylvania, USA
  const pattern = /🎂\s*Born:\s*([A-Za-z]+\s+\d+,\s+\d{4}),?\s*(.+)?/i;
  const match = content.match(pattern);

  if (match) {
    return {
      date: match[1].trim(),
      place: match[2]?.trim(),
    };
  }

  // Try alternate pattern: 🎂 Born: May 5, 1988, Tottenham, London
  const altPattern = /🎂\s*Born:\s*([^,\n]+),\s*(\d{4}),?\s*(.+)?/i;
  const altMatch = content.match(altPattern);

  if (altMatch) {
    return {
      date: `${altMatch[1].trim()}, ${altMatch[2]}`,
      place: altMatch[3]?.trim(),
    };
  }

  return null;
}

/**
 * Extract nationality
 */
function extractNationality(content: string): string | null {
  const pattern = /🌍\s*Nationality:\s*([^\n]+)/i;
  const match = content.match(pattern);

  if (match) {
    return match[1].trim();
  }

  return null;
}

/**
 * Extract profession from Quick Facts table or schema
 */
function extractProfession(content: string): string | null {
  // Look in Quick Facts table
  const tablePattern = /\|\s*Profession\s*\|\s*([^|]+)\|/i;
  const tableMatch = content.match(tablePattern);

  if (tableMatch) {
    return tableMatch[1].trim();
  }

  // Look in schema JSON
  const schemaPattern = /"jobTitle":\s*"([^"]+)"/;
  const schemaMatch = content.match(schemaPattern);

  if (schemaMatch) {
    return schemaMatch[1];
  }

  return null;
}

/**
 * Parse a single article into a Celebrity object
 */
function parseCelebrityFromArticle(article: Article): Celebrity | null {
  const name = extractName(article.content);
  if (!name) return null;

  const height = extractHeight(article.content);
  if (!height) return null;

  const weight = extractWeight(article.content);
  const birthInfo = extractBirthInfo(article.content);
  const nationality = extractNationality(article.content);
  const profession = extractProfession(article.content);
  const claimedHeight = extractClaimedHeight(article.content);

  // Get image data if available
  const image = imageData[article.slug];

  return {
    slug: article.slug,
    name,
    heightCm: height.cm,
    heightImperial: height.imperial,
    heightClaimed: claimedHeight || undefined,
    weightLbs: weight?.lbs,
    weightKg: weight?.kg,
    birthDate: birthInfo?.date,
    birthPlace: birthInfo?.place,
    nationality: nationality || undefined,
    profession: profession || undefined,
    title: article.frontmatter.title,
    metaDescription: article.frontmatter.meta_description,
    imageUrl: image?.imageUrl || undefined,
    imageSource: image?.source || undefined,
  };
}

// Cache for celebrities data
let cachedCelebrities: Celebrity[] | null = null;

/**
 * Get all celebrities from articles
 */
export function getAllCelebrities(): Celebrity[] {
  if (cachedCelebrities) {
    return cachedCelebrities;
  }

  const articles = getAllArticles();
  const celebrities: Celebrity[] = [];

  for (const article of articles) {
    const celebrity = parseCelebrityFromArticle(article);
    if (celebrity) {
      celebrities.push(celebrity);
    }
  }

  // Sort by name
  celebrities.sort((a, b) => a.name.localeCompare(b.name));

  cachedCelebrities = celebrities;
  return celebrities;
}

/**
 * Get a single celebrity by slug
 */
export function getCelebrityBySlug(slug: string): Celebrity | null {
  const celebrities = getAllCelebrities();
  return celebrities.find((c) => c.slug === slug) || null;
}

/**
 * Get celebrities grouped by height
 */
export function getCelebritiesByHeight(): Map<string, Celebrity[]> {
  const celebrities = getAllCelebrities();
  const groups = new Map<string, Celebrity[]>();

  for (const celebrity of celebrities) {
    const heightSlug = generateHeightSlug(celebrity.heightCm);

    if (!groups.has(heightSlug)) {
      groups.set(heightSlug, []);
    }
    groups.get(heightSlug)!.push(celebrity);
  }

  return groups;
}

/**
 * Get all unique height slugs
 */
export function getAllHeightSlugs(): string[] {
  const groups = getCelebritiesByHeight();
  return Array.from(groups.keys()).sort();
}

/**
 * Get celebrities at a specific height
 */
export function getCelebritiesAtHeight(heightSlug: string): Celebrity[] {
  const groups = getCelebritiesByHeight();
  return groups.get(heightSlug) || [];
}

/**
 * Get celebrities by profession
 */
export function getCelebritiesByProfession(profession: string): Celebrity[] {
  const celebrities = getAllCelebrities();
  return celebrities.filter((c) =>
    c.profession?.toLowerCase().includes(profession.toLowerCase())
  );
}

/**
 * Search celebrities by name
 */
export function searchCelebrities(query: string): Celebrity[] {
  const celebrities = getAllCelebrities();
  const lowerQuery = query.toLowerCase();

  return celebrities.filter((c) =>
    c.name.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get top celebrity comparison pairs
 * Based on same profession, extreme height differences, and popularity
 */
export function getComparisonPairs(): Array<{ slug1: string; slug2: string; label: string }> {
  const celebrities = getAllCelebrities();
  const pairs: Array<{ slug1: string; slug2: string; label: string; score: number }> = [];

  // Popular celebrities to prioritize
  const popularSlugs = new Set([
    'kevin-hart', 'dwayne-johnson', 'taylor-swift', 'tom-cruise',
    'ariana-grande', 'beyonce', 'brad-pitt', 'leonardo-dicaprio',
    'tom-holland', 'zendaya', 'shaquille-oneal', 'danny-devito',
    'peter-dinklage', 'jason-momoa', 'chris-hemsworth', 'scarlett-johansson',
  ]);

  // Generate pairs
  for (let i = 0; i < celebrities.length; i++) {
    for (let j = i + 1; j < celebrities.length; j++) {
      const c1 = celebrities[i];
      const c2 = celebrities[j];

      // Calculate pair score
      let score = 0;

      // Popularity bonus
      if (popularSlugs.has(c1.slug)) score += 10;
      if (popularSlugs.has(c2.slug)) score += 10;

      // Height difference bonus (more interesting comparisons)
      const heightDiff = Math.abs(c1.heightCm - c2.heightCm);
      if (heightDiff > 30) score += 5; // Extreme differences
      if (heightDiff > 15) score += 3;

      // Same profession bonus
      if (c1.profession && c2.profession) {
        const p1 = c1.profession.toLowerCase();
        const p2 = c2.profession.toLowerCase();
        if (p1.includes('actor') && p2.includes('actor')) score += 3;
        if (p1.includes('singer') && p2.includes('singer')) score += 3;
        if (p1.includes('basketball') && p2.includes('basketball')) score += 3;
      }

      if (score > 0) {
        pairs.push({
          slug1: c1.slug,
          slug2: c2.slug,
          label: `${c1.name} vs ${c2.name}`,
          score,
        });
      }
    }
  }

  // Sort by score and take top 500
  pairs.sort((a, b) => b.score - a.score);
  return pairs.slice(0, 500).map(({ slug1, slug2, label }) => ({ slug1, slug2, label }));
}

/**
 * Generate comparison slug from two celebrity slugs
 */
export function generateComparisonSlug(slug1: string, slug2: string): string {
  // Alphabetically sort to ensure consistent URLs
  const sorted = [slug1, slug2].sort();
  return `${sorted[0]}-vs-${sorted[1]}`;
}

/**
 * Parse comparison slug back to two slugs
 */
export function parseComparisonSlug(comparisonSlug: string): { slug1: string; slug2: string } | null {
  const match = comparisonSlug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;

  return {
    slug1: match[1],
    slug2: match[2],
  };
}
