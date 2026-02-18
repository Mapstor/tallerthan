import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCelebrities } from '@/lib/celebrities';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'All Celebrity Heights | TallerThan',
  description:
    'Browse heights of over 130 celebrities. Find out how tall your favorite actors, musicians, athletes, and more really are.',
};

export default function CelebritiesPage() {
  const celebrities = getAllCelebrities();

  // Schema for the celebrities directory page
  const directorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Celebrity Heights A-Z',
    description: 'Browse heights of over 130 celebrities. Find out how tall your favorite actors, musicians, athletes, and more really are.',
    url: 'https://tallerthan.com/celebrity',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: celebrities.length,
      itemListElement: celebrities.slice(0, 20).map((celeb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Person',
          name: celeb.name,
          url: `https://tallerthan.com/celebrity/${celeb.slug}`,
          height: {
            '@type': 'QuantitativeValue',
            value: celeb.heightCm,
            unitCode: 'CMT',
          },
        },
      })),
    },
  };

  // Group by first letter
  const grouped = celebrities.reduce(
    (acc, celebrity) => {
      const letter = celebrity.name[0].toUpperCase();
      if (!acc[letter]) {
        acc[letter] = [];
      }
      acc[letter].push(celebrity);
      return acc;
    },
    {} as Record<string, typeof celebrities>
  );

  const letters = Object.keys(grouped).sort();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'All Celebrities' }]} />

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Celebrity Heights A-Z
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Browse {celebrities.length} celebrity heights. Click any celebrity to
        see their detailed height profile and comparisons.
      </p>

      {/* Letter Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 sticky top-0 bg-white py-4 border-b border-gray-200">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-primary hover:text-white rounded text-sm font-medium transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Celebrity List */}
      <div className="space-y-12">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              {letter}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {grouped[letter].map((celebrity) => (
                <Link
                  key={celebrity.slug}
                  href={`/celebrity/${celebrity.slug}`}
                  className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {celebrity.imageUrl ? (
                      <img
                        src={celebrity.imageUrl}
                        alt={celebrity.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg text-gray-400 bg-gray-200">
                        {celebrity.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                      {celebrity.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {celebrity.heightImperial}
                    </p>
                    {celebrity.profession && (
                      <p className="text-xs text-gray-400 truncate">
                        {celebrity.profession}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
    </>
  );
}
