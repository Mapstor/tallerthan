import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getComparisonPairs, getCelebrityBySlug } from '@/lib/celebrities';

export const metadata: Metadata = {
  title: 'Celebrity Height Comparisons | TallerThan',
  description:
    'Compare the heights of your favorite celebrities. See side-by-side height comparisons between famous actors, musicians, athletes, and more.',
};

export default function CompareIndexPage() {
  const pairs = getComparisonPairs().slice(0, 100);

  // Group by interesting categories
  const featuredPairs = pairs.slice(0, 12);
  const remainingPairs = pairs.slice(12);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Compare' }]} />

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Celebrity Height Comparisons
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        See how your favorite celebrities measure up against each other with our
        side-by-side height comparisons.
      </p>

      {/* CTA */}
      <div className="bg-primary text-white rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-2">Compare Your Own Height</h2>
        <p className="mb-4 text-blue-100">
          See how tall you are compared to celebrities with our interactive
          comparison tool.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          Try the Height Comparison Tool
        </Link>
      </div>

      {/* Featured Comparisons */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Popular Comparisons
      </h2>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {featuredPairs.map(({ slug1, slug2 }) => {
          const celeb1 = getCelebrityBySlug(slug1);
          const celeb2 = getCelebrityBySlug(slug2);
          if (!celeb1 || !celeb2) return null;

          return (
            <Link
              key={`${slug1}-vs-${slug2}`}
              href={`/compare/${slug1}-vs-${slug2}`}
              className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-4 hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-blue-100 flex-shrink-0">
                  {celeb1.imageUrl ? (
                    <img
                      src={celeb1.imageUrl}
                      alt={celeb1.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary text-sm font-bold">
                      {celeb1.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-emerald-100 flex-shrink-0">
                  {celeb2.imageUrl ? (
                    <img
                      src={celeb2.imageUrl}
                      alt={celeb2.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-600 text-sm font-bold">
                      {celeb2.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">
                  {celeb1.name} vs {celeb2.name}
                </div>
                <div className="text-sm text-gray-500">
                  {celeb1.heightImperial} vs {celeb2.heightImperial}
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          );
        })}
      </div>

      {/* All Comparisons */}
      {remainingPairs.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More Comparisons
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {remainingPairs.map(({ slug1, slug2 }) => {
              const celeb1 = getCelebrityBySlug(slug1);
              const celeb2 = getCelebrityBySlug(slug2);
              if (!celeb1 || !celeb2) return null;

              return (
                <Link
                  key={`${slug1}-vs-${slug2}`}
                  href={`/compare/${slug1}-vs-${slug2}`}
                  className="text-sm bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors truncate"
                >
                  {celeb1.name} vs {celeb2.name}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
