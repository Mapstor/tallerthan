import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCelebritiesByHeight } from '@/lib/celebrities';
import { parseHeightSlug, formatCmToImperial } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Celebrity Heights Directory | TallerThan',
  description:
    'Browse celebrities by height. Find famous actors, musicians, athletes, and more grouped by how tall they are.',
};

export default function HeightIndexPage() {
  const heightGroups = getCelebritiesByHeight();

  // Sort height slugs by actual height (shortest to tallest)
  const sortedHeights = Array.from(heightGroups.entries())
    .map(([slug, celebrities]) => ({
      slug,
      cm: parseHeightSlug(slug) || 0,
      count: celebrities.length,
      celebrities: celebrities.slice(0, 3),
    }))
    .sort((a, b) => a.cm - b.cm);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Heights' }]} />

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Celebrity Heights Directory
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        Browse {sortedHeights.reduce((sum, h) => sum + h.count, 0)} celebrities organized by height,
        from shortest to tallest.
      </p>

      {/* Height Reference */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Quick Reference
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-500">US Average (Men)</div>
            <div className="font-medium">5&apos;9&quot; (175 cm)</div>
          </div>
          <div>
            <div className="text-gray-500">US Average (Women)</div>
            <div className="font-medium">5&apos;4&quot; (162 cm)</div>
          </div>
          <div>
            <div className="text-gray-500">Shortest Celebrity</div>
            <div className="font-medium">
              {sortedHeights[0] ? formatCmToImperial(sortedHeights[0].cm) : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Tallest Celebrity</div>
            <div className="font-medium">
              {sortedHeights[sortedHeights.length - 1]
                ? formatCmToImperial(sortedHeights[sortedHeights.length - 1].cm)
                : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Height Groups */}
      <div className="space-y-4">
        {sortedHeights.map(({ slug, cm, count, celebrities }) => (
          <Link
            key={slug}
            href={`/height/${slug}`}
            className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">
                {formatCmToImperial(cm)}
              </h3>
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                {count} {count === 1 ? 'celebrity' : 'celebrities'}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-2">
              {Math.round(cm)} cm
            </div>
            <div className="text-gray-600">
              Including{' '}
              {celebrities.map((c, i) => (
                <span key={c.slug}>
                  {c.name}
                  {i < celebrities.length - 1
                    ? i === celebrities.length - 2
                      ? ' and '
                      : ', '
                    : ''}
                </span>
              ))}
              {count > 3 && ` and ${count - 3} more`}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
