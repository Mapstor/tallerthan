import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  getAllHeightSlugs,
  getCelebritiesAtHeight,
  Celebrity,
} from '@/lib/celebrities';
import {
  parseHeightSlug,
  formatCmToImperial,
  getHeightPercentile,
} from '@/lib/utils';

interface HeightPageProps {
  params: { height: string };
}

export async function generateStaticParams() {
  const heightSlugs = getAllHeightSlugs();
  return heightSlugs.map((height) => ({ height }));
}

export async function generateMetadata({
  params,
}: HeightPageProps): Promise<Metadata> {
  const heightCm = parseHeightSlug(params.height);
  if (!heightCm) {
    return { title: 'Height Not Found' };
  }

  const imperial = formatCmToImperial(heightCm);
  const celebrities = getCelebritiesAtHeight(params.height);

  return {
    title: `Celebrities Who Are ${imperial} Tall | TallerThan`,
    description: `Discover ${celebrities.length} celebrities who are ${imperial} (${Math.round(heightCm)} cm) tall. See famous actors, musicians, and athletes at this height.`,
    openGraph: {
      title: `Celebrities Who Are ${imperial} Tall`,
      description: `Discover ${celebrities.length} celebrities who are ${imperial} (${Math.round(heightCm)} cm) tall.`,
    },
  };
}

function getHeightContext(cm: number): {
  percentileMale: number;
  percentileFemale: number;
  descriptionMale: string;
  descriptionFemale: string;
} {
  const percentileMale = getHeightPercentile(cm, 'male');
  const percentileFemale = getHeightPercentile(cm, 'female');

  const getDescription = (percentile: number, gender: string): string => {
    if (percentile < 5) return `very short for a ${gender}`;
    if (percentile < 25) return `shorter than average for a ${gender}`;
    if (percentile < 40) return `slightly below average for a ${gender}`;
    if (percentile <= 60) return `average height for a ${gender}`;
    if (percentile <= 75) return `slightly above average for a ${gender}`;
    if (percentile <= 95) return `taller than average for a ${gender}`;
    return `very tall for a ${gender}`;
  };

  return {
    percentileMale,
    percentileFemale,
    descriptionMale: getDescription(percentileMale, 'man'),
    descriptionFemale: getDescription(percentileFemale, 'woman'),
  };
}

function CelebrityListItem({ celebrity }: { celebrity: Celebrity }) {
  return (
    <Link
      href={`/celebrity/${celebrity.slug}`}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all group"
    >
      <div className="w-12 h-12 bg-gray-100 rounded-full flex-shrink-0 overflow-hidden">
        {celebrity.imageUrl ? (
          <img
            src={celebrity.imageUrl}
            alt={celebrity.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{celebrity.name}</h3>
        <p className="text-sm text-gray-600">
          {celebrity.profession || 'Celebrity'}
        </p>
      </div>
      <div className="text-right">
        <div className="font-medium text-gray-900">{celebrity.heightImperial}</div>
        <div className="text-sm text-gray-500">{Math.round(celebrity.heightCm)} cm</div>
      </div>
    </Link>
  );
}

export default function HeightPage({ params }: HeightPageProps) {
  const heightCm = parseHeightSlug(params.height);
  if (!heightCm) {
    notFound();
  }

  const celebrities = getCelebritiesAtHeight(params.height);
  if (celebrities.length === 0) {
    notFound();
  }

  const imperial = formatCmToImperial(heightCm);
  const context = getHeightContext(heightCm);

  // Group celebrities by profession
  const byProfession = new Map<string, Celebrity[]>();
  for (const celeb of celebrities) {
    const profession = celeb.profession || 'Other';
    if (!byProfession.has(profession)) {
      byProfession.set(profession, []);
    }
    byProfession.get(profession)!.push(celeb);
  }

  // Schema for this height page
  const heightSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Celebrities Who Are ${imperial} Tall`,
    description: `Discover ${celebrities.length} celebrities who are ${imperial} (${Math.round(heightCm)} cm) tall.`,
    url: `https://tallerthan.com/height/${params.height}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: celebrities.length,
      itemListElement: celebrities.slice(0, 10).map((celeb, index) => ({
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(heightSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Heights', href: '/height' },
          { label: imperial },
        ]}
      />

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Celebrities Who Are {imperial} Tall
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        {celebrities.length} famous {celebrities.length === 1 ? 'person is' : 'people are'}{' '}
        {imperial} ({Math.round(heightCm)} cm) tall
      </p>

      {/* Height Context Box */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          How Does {imperial} Compare?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">For Men</div>
            <div className="text-2xl font-bold text-primary mb-1">
              {context.percentileMale.toFixed(0)}th percentile
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {context.descriptionMale}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">For Women</div>
            <div className="text-2xl font-bold text-primary mb-1">
              {context.percentileFemale.toFixed(0)}th percentile
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {context.descriptionFemale}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Based on average US adult heights: 5&apos;9&quot; (175 cm) for men, 5&apos;4&quot; (162 cm) for women
        </p>
      </div>

      {/* CTA */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-8">
        <p className="text-gray-700">
          <strong>Are you {imperial} tall?</strong>{' '}
          <Link href="/" className="text-primary hover:underline">
            Compare your height to these celebrities
          </Link>{' '}
          with our free comparison tool.
        </p>
      </div>

      {/* Celebrity List */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        All {imperial} Celebrities
      </h2>

      <div className="space-y-3">
        {celebrities
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((celebrity) => (
            <CelebrityListItem key={celebrity.slug} celebrity={celebrity} />
          ))}
      </div>

      {/* Related Heights */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Browse Other Heights
        </h2>
        <div className="flex flex-wrap gap-2">
          {getAllHeightSlugs()
            .slice(0, 20)
            .map((slug) => {
              const cm = parseHeightSlug(slug);
              const label = cm ? formatCmToImperial(cm) : slug;
              return (
                <Link
                  key={slug}
                  href={`/height/${slug}`}
                  className={`px-3 py-1 rounded-full text-sm ${
                    slug === params.height
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
    </>
  );
}
