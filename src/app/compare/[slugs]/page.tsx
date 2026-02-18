import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  getComparisonPairs,
  getCelebrityBySlug,
  parseComparisonSlug,
  Celebrity,
} from '@/lib/celebrities';
import { formatHeightDifference, formatHeightFull } from '@/lib/utils';

interface ComparePageProps {
  params: { slugs: string };
}

export async function generateStaticParams() {
  const pairs = getComparisonPairs();
  return pairs.map(({ slug1, slug2 }) => ({
    slugs: `${slug1}-vs-${slug2}`,
  }));
}

export async function generateMetadata({
  params,
}: ComparePageProps): Promise<Metadata> {
  const parsed = parseComparisonSlug(params.slugs);
  if (!parsed) {
    return { title: 'Comparison Not Found' };
  }

  const celeb1 = getCelebrityBySlug(parsed.slug1);
  const celeb2 = getCelebrityBySlug(parsed.slug2);

  if (!celeb1 || !celeb2) {
    return { title: 'Comparison Not Found' };
  }

  const taller = celeb1.heightCm > celeb2.heightCm ? celeb1 : celeb2;
  const shorter = celeb1.heightCm > celeb2.heightCm ? celeb2 : celeb1;
  const diff = formatHeightDifference(taller.heightCm, shorter.heightCm);

  return {
    title: `${celeb1.name} vs ${celeb2.name} Height Comparison | TallerThan`,
    description: `Compare heights: ${celeb1.name} (${celeb1.heightImperial}) vs ${celeb2.name} (${celeb2.heightImperial}). ${taller.name} is ${diff}.`,
    openGraph: {
      title: `${celeb1.name} vs ${celeb2.name} Height Comparison`,
      description: `${taller.name} is ${diff} than ${shorter.name}.`,
    },
  };
}

function HeightSilhouette({
  celebrity,
  maxHeightCm,
  color,
}: {
  celebrity: Celebrity;
  maxHeightCm: number;
  color: string;
}) {
  const scale = celebrity.heightCm / maxHeightCm;
  const heightPercent = scale * 100;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-end justify-center"
        style={{ height: '280px' }}
      >
        {/* Silhouette with Photo */}
        <div
          className="flex flex-col items-center justify-end transition-all duration-300"
          style={{ height: `${heightPercent}%` }}
        >
          {celebrity.imageUrl ? (
            <div className="flex flex-col items-center h-full">
              {/* Photo circle at top */}
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 flex-shrink-0"
                style={{ borderColor: color }}
              >
                <img
                  src={celebrity.imageUrl}
                  alt={celebrity.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Body bar */}
              <div
                className="w-6 sm:w-8 flex-1 rounded-b-lg mt-1"
                style={{ backgroundColor: color, minHeight: '20px' }}
              />
            </div>
          ) : (
            <svg
              viewBox="0 0 100 200"
              className="w-20 sm:w-24"
              style={{ height: '100%' }}
              fill={color}
            >
              {/* Head */}
              <circle cx="50" cy="20" r="18" />
              {/* Body */}
              <path d="M50 38 L50 100 M30 60 L70 60 M50 100 L30 180 M50 100 L70 180"
                    stroke={color}
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none" />
            </svg>
          )}
        </div>
        {/* Height marker */}
        <div
          className="absolute left-0 right-0 border-t-2 border-dashed"
          style={{
            bottom: `${heightPercent}%`,
            borderColor: color,
          }}
        />
      </div>
      <div className="mt-4 text-center">
        <div className="font-bold text-gray-900 text-lg">{celebrity.name}</div>
        <div className="text-2xl font-bold" style={{ color }}>
          {celebrity.heightImperial}
        </div>
        <div className="text-sm text-gray-500">
          {Math.round(celebrity.heightCm)} cm
        </div>
      </div>
    </div>
  );
}

export default function ComparePage({ params }: ComparePageProps) {
  const parsed = parseComparisonSlug(params.slugs);
  if (!parsed) {
    notFound();
  }

  const celeb1 = getCelebrityBySlug(parsed.slug1);
  const celeb2 = getCelebrityBySlug(parsed.slug2);

  if (!celeb1 || !celeb2) {
    notFound();
  }

  const maxHeightCm = Math.max(celeb1.heightCm, celeb2.heightCm);
  const taller = celeb1.heightCm > celeb2.heightCm ? celeb1 : celeb2;
  const shorter = celeb1.heightCm > celeb2.heightCm ? celeb2 : celeb1;
  const heightDiff = taller.heightCm - shorter.heightCm;
  const diffText = formatHeightDifference(taller.heightCm, shorter.heightCm);

  // Schema for this comparison page
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${celeb1.name} vs ${celeb2.name} Height Comparison`,
    description: `Compare heights: ${celeb1.name} (${celeb1.heightImperial}) vs ${celeb2.name} (${celeb2.heightImperial}). ${taller.name} is ${diffText}.`,
    author: {
      '@type': 'Organization',
      name: 'TallerThan',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TallerThan',
      url: 'https://tallerthan.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://tallerthan.com/compare/${params.slugs}`,
    },
    about: [
      {
        '@type': 'Person',
        name: celeb1.name,
        height: {
          '@type': 'QuantitativeValue',
          value: celeb1.heightCm,
          unitCode: 'CMT',
        },
      },
      {
        '@type': 'Person',
        name: celeb2.name,
        height: {
          '@type': 'QuantitativeValue',
          value: celeb2.heightCm,
          unitCode: 'CMT',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Compare', href: '/compare' },
          { label: `${celeb1.name} vs ${celeb2.name}` },
        ]}
      />

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center">
        {celeb1.name} vs {celeb2.name}
      </h1>
      <p className="text-xl text-gray-600 mb-8 text-center">Height Comparison</p>

      {/* Visual Comparison */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 gap-8">
          <HeightSilhouette
            celebrity={celeb1}
            maxHeightCm={maxHeightCm + 10}
            color="#2563EB"
          />
          <HeightSilhouette
            celebrity={celeb2}
            maxHeightCm={maxHeightCm + 10}
            color="#10B981"
          />
        </div>
      </div>

      {/* Difference Box */}
      <div className="bg-primary text-white rounded-xl p-6 mb-8 text-center">
        <div className="text-lg mb-2">Height Difference</div>
        <div className="text-4xl font-bold mb-2">
          {Math.round(heightDiff * 10) / 10} cm
        </div>
        <div className="text-xl">
          {taller.name} is{' '}
          <span className="font-semibold">{diffText}</span>
        </div>
      </div>

      {/* Stats Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Stat
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-primary">
                {celeb1.name}
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-600">
                {celeb2.name}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 text-sm text-gray-600">Height</td>
              <td className="px-4 py-3 text-center font-medium">
                {formatHeightFull(celeb1.heightCm)}
              </td>
              <td className="px-4 py-3 text-center font-medium">
                {formatHeightFull(celeb2.heightCm)}
              </td>
            </tr>
            {(celeb1.weightLbs || celeb2.weightLbs) && (
              <tr>
                <td className="px-4 py-3 text-sm text-gray-600">Weight</td>
                <td className="px-4 py-3 text-center">
                  {celeb1.weightLbs
                    ? `${celeb1.weightLbs} lbs (${celeb1.weightKg} kg)`
                    : '—'}
                </td>
                <td className="px-4 py-3 text-center">
                  {celeb2.weightLbs
                    ? `${celeb2.weightLbs} lbs (${celeb2.weightKg} kg)`
                    : '—'}
                </td>
              </tr>
            )}
            {(celeb1.profession || celeb2.profession) && (
              <tr>
                <td className="px-4 py-3 text-sm text-gray-600">Profession</td>
                <td className="px-4 py-3 text-center">
                  {celeb1.profession || '—'}
                </td>
                <td className="px-4 py-3 text-center">
                  {celeb2.profession || '—'}
                </td>
              </tr>
            )}
            {(celeb1.nationality || celeb2.nationality) && (
              <tr>
                <td className="px-4 py-3 text-sm text-gray-600">Nationality</td>
                <td className="px-4 py-3 text-center">
                  {celeb1.nationality || '—'}
                </td>
                <td className="px-4 py-3 text-center">
                  {celeb2.nationality || '—'}
                </td>
              </tr>
            )}
            {(celeb1.birthDate || celeb2.birthDate) && (
              <tr>
                <td className="px-4 py-3 text-sm text-gray-600">Birth Date</td>
                <td className="px-4 py-3 text-center">
                  {celeb1.birthDate || '—'}
                </td>
                <td className="px-4 py-3 text-center">
                  {celeb2.birthDate || '—'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Links to Individual Pages */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link
          href={`/celebrity/${celeb1.slug}`}
          className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-4 hover:border-primary hover:shadow-md transition-all"
        >
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-primary">
            {celeb1.imageUrl ? (
              <img
                src={celeb1.imageUrl}
                alt={celeb1.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl text-gray-400 bg-gray-200">
                {celeb1.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">
              Learn more about {celeb1.name}
            </div>
            <div className="text-sm text-primary">View full profile &rarr;</div>
          </div>
        </Link>
        <Link
          href={`/celebrity/${celeb2.slug}`}
          className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-4 hover:border-emerald-500 hover:shadow-md transition-all"
        >
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-emerald-500">
            {celeb2.imageUrl ? (
              <img
                src={celeb2.imageUrl}
                alt={celeb2.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl text-gray-400 bg-gray-200">
                {celeb2.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">
              Learn more about {celeb2.name}
            </div>
            <div className="text-sm text-emerald-600">View full profile &rarr;</div>
          </div>
        </Link>
      </div>

      {/* CTA */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          How do you compare?
        </h2>
        <p className="text-gray-600 mb-4">
          Enter your height and see how you measure up to {celeb1.name}, {celeb2.name}, and other celebrities.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try the Height Comparison Tool
        </Link>
      </div>
    </div>
    </>
  );
}
