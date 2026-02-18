import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleFrontmatter {
  title: string;
  meta_description: string;
  slug: string;
  schema?: {
    person?: Record<string, unknown>;
  };
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
  schemas: object[];
}

const ARTICLES_DIRECTORY = path.join(process.cwd(), '..', 'all-articles');

// Files to ignore (not celebrity articles)
const IGNORED_FILES = [
  'homepage.md',
  'PROJECT_BRIEF.md',
  'CLAUDE.md',
  'radius-on-google-maps.md',
  'drive-time-map.md',
  'remaining-pages.md',
];

/**
 * Parse HTML comment frontmatter format
 * <!--
 * title: ...
 * meta_description: ...
 * slug: ...
 * -->
 */
function parseHtmlCommentFrontmatter(content: string): { frontmatter: Partial<ArticleFrontmatter>; body: string } | null {
  const commentMatch = content.match(/^<!--\s*([\s\S]*?)\s*-->/);
  if (!commentMatch) return null;

  const frontmatterText = commentMatch[1];
  const frontmatter: Partial<ArticleFrontmatter> = {};

  // Parse key: value pairs
  const lines = frontmatterText.split('\n');
  let currentKey = '';
  let currentValue = '';

  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      if (currentKey) {
        frontmatter[currentKey as keyof ArticleFrontmatter] = currentValue.trim() as never;
      }
      currentKey = keyMatch[1];
      currentValue = keyMatch[2];
    } else if (currentKey) {
      currentValue += ' ' + line.trim();
    }
  }

  if (currentKey) {
    frontmatter[currentKey as keyof ArticleFrontmatter] = currentValue.trim() as never;
  }

  const body = content.slice(commentMatch[0].length).trim();

  return { frontmatter, body };
}

/**
 * Extract JSON-LD schemas from markdown content
 */
function extractSchemas(content: string): object[] {
  const schemas: object[] = [];
  const jsonBlockRegex = /```json\s*([\s\S]*?)```/g;

  let match;
  while ((match = jsonBlockRegex.exec(content)) !== null) {
    try {
      const schema = JSON.parse(match[1].trim());
      if (schema['@context'] === 'https://schema.org') {
        schemas.push(schema);
      }
    } catch {
      // Invalid JSON, skip
    }
  }

  return schemas;
}

/**
 * Parse a single article file
 */
export function parseArticle(filename: string): Article | null {
  const filePath = path.join(ARTICLES_DIRECTORY, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const slug = filename.replace('.md', '');

  let frontmatter: ArticleFrontmatter;
  let content: string;

  // Try YAML frontmatter first (gray-matter)
  if (fileContent.startsWith('---')) {
    const parsed = matter(fileContent);
    frontmatter = {
      title: parsed.data.title || '',
      meta_description: parsed.data.meta_description || '',
      slug: parsed.data.slug || slug,
      schema: parsed.data.schema,
    };
    content = parsed.content;
  } else {
    // Try HTML comment frontmatter
    const parsed = parseHtmlCommentFrontmatter(fileContent);
    if (parsed) {
      frontmatter = {
        title: parsed.frontmatter.title || '',
        meta_description: parsed.frontmatter.meta_description || '',
        slug: parsed.frontmatter.slug || slug,
      };
      content = parsed.body;
    } else {
      // No frontmatter found, use filename as slug
      frontmatter = {
        title: '',
        meta_description: '',
        slug: slug,
      };
      content = fileContent;
    }
  }

  // Extract schemas from content
  const schemas = extractSchemas(content);

  return {
    slug: frontmatter.slug || slug,
    frontmatter,
    content,
    schemas,
  };
}

/**
 * Get all article slugs
 */
export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIRECTORY)) {
    console.warn('Articles directory not found:', ARTICLES_DIRECTORY);
    return [];
  }

  const files = fs.readdirSync(ARTICLES_DIRECTORY);

  return files
    .filter((file) => file.endsWith('.md') && !IGNORED_FILES.includes(file))
    .map((file) => file.replace('.md', ''));
}

/**
 * Get all articles
 */
export function getAllArticles(): Article[] {
  const slugs = getAllArticleSlugs();

  return slugs
    .map((slug) => parseArticle(`${slug}.md`))
    .filter((article): article is Article => article !== null);
}

/**
 * Get a single article by slug
 */
export function getArticleBySlug(slug: string): Article | null {
  return parseArticle(`${slug}.md`);
}

/**
 * Convert markdown to HTML (basic implementation)
 * For production, consider using remark/rehype
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Remove JSON schema blocks (they're handled separately)
  html = html.replace(/```json[\s\S]*?```/g, '');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Blockquotes - handle multi-line blockquotes
  html = convertBlockquotes(html);

  // Tables
  html = convertMarkdownTables(html);

  // Lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Paragraphs (simple: double newlines)
  html = html.replace(/\n\n+/g, '</p><p>');
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*(<h[123]>)/g, '$1');
  html = html.replace(/(<\/h[123]>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<table>)/g, '$1');
  html = html.replace(/(<\/table>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<blockquote>)/g, '$1');
  html = html.replace(/(<\/blockquote>)\s*<\/p>/g, '$1');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');

  return html;
}

/**
 * Convert markdown blockquotes to HTML
 * Handles multi-line blockquotes and empty > lines
 */
function convertBlockquotes(markdown: string): string {
  const lines = markdown.split('\n');
  let inBlockquote = false;
  let blockquoteContent: string[] = [];
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this line starts with >
    if (line.match(/^>\s?/)) {
      if (!inBlockquote) {
        inBlockquote = true;
        blockquoteContent = [];
      }
      // Remove the > prefix and add content (can be empty)
      const content = line.replace(/^>\s?/, '');
      blockquoteContent.push(content);
    } else {
      if (inBlockquote) {
        // End of blockquote, output it
        result.push('<blockquote>' + blockquoteContent.join('<br>') + '</blockquote>');
        blockquoteContent = [];
        inBlockquote = false;
      }
      result.push(line);
    }
  }

  // Handle blockquote at end of content
  if (inBlockquote) {
    result.push('<blockquote>' + blockquoteContent.join('<br>') + '</blockquote>');
  }

  return result.join('\n');
}

/**
 * Convert markdown tables to HTML
 */
function convertMarkdownTables(markdown: string): string {
  const lines = markdown.split('\n');
  let inTable = false;
  let tableHtml = '';
  let result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this is a table row
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHtml = '<table>';
      }

      // Skip separator row (contains only |, -, and spaces)
      if (/^\|[\s\-:|]+\|$/.test(line.trim())) {
        continue;
      }

      // Parse cells
      const cells = line
        .split('|')
        .slice(1, -1) // Remove empty first and last elements
        .map((cell) => cell.trim());

      // First non-separator row is header
      const isHeader = tableHtml === '<table>';
      const tag = isHeader ? 'th' : 'td';
      const rowTag = isHeader ? 'thead' : 'tbody';

      if (isHeader) {
        tableHtml += `<${rowTag}><tr>`;
      } else if (tableHtml.endsWith('</thead>')) {
        tableHtml += '<tbody><tr>';
      } else {
        tableHtml += '<tr>';
      }

      for (const cell of cells) {
        tableHtml += `<${tag}>${cell}</${tag}>`;
      }

      tableHtml += '</tr>';
      if (isHeader) {
        tableHtml += '</thead>';
      }
    } else {
      if (inTable) {
        tableHtml += '</tbody></table>';
        result.push(tableHtml);
        tableHtml = '';
        inTable = false;
      }
      result.push(line);
    }
  }

  // Close any remaining table
  if (inTable) {
    tableHtml += '</tbody></table>';
    result.push(tableHtml);
  }

  return result.join('\n');
}
