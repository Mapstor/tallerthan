'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Celebrity } from '@/lib/celebrities';
import { formatCmToImperial, cmToFeetInches, getHeightPercentile } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';

interface YouVsCelebrityClientProps {
  celebrity: Celebrity;
  relatedCelebs: Celebrity[];
}

// Fun objects/distances for height differences
function getHeightDifferenceContext(diffCm: number): string[] {
  const absDiff = Math.abs(diffCm);
  const contexts: string[] = [];

  if (absDiff < 1) {
    contexts.push("You're virtually the same height - less than a finger's width apart!");
  } else if (absDiff <= 2.5) {
    contexts.push("That's about the width of a golf ball");
    contexts.push("Roughly the height of a AA battery");
  } else if (absDiff <= 5) {
    contexts.push("That's about the length of a credit card");
    contexts.push("Roughly the height of a tennis ball");
  } else if (absDiff <= 7.5) {
    contexts.push("That's about the length of a dollar bill");
    contexts.push("Roughly the height of a smartphone");
  } else if (absDiff <= 10) {
    contexts.push("That's about the length of a standard pencil");
    contexts.push("Roughly the width of a paperback book");
  } else if (absDiff <= 15) {
    contexts.push("That's about the length of a standard ruler");
    contexts.push("Roughly the height of a water bottle");
  } else if (absDiff <= 20) {
    contexts.push("That's about the length of a laptop screen");
    contexts.push("Roughly the height of a bowling pin");
  } else if (absDiff <= 30) {
    contexts.push("That's about the length of a yoga mat width");
    contexts.push("Roughly the height of a traffic cone");
  } else if (absDiff <= 45) {
    contexts.push("That's about the height of a guitar");
    contexts.push("Roughly the length of a baseball bat");
  } else {
    contexts.push("That's a significant height difference!");
    contexts.push("More than the height of a standard desk");
  }

  return contexts;
}

// Get activities where height matters
function getHeightAdvantages(userCm: number, celebCm: number): { userAdvantages: string[], celebAdvantages: string[] } {
  const userAdvantages: string[] = [];
  const celebAdvantages: string[] = [];

  const taller = userCm > celebCm ? 'user' : 'celeb';

  const tallerAdvantages = [
    "Better view at concerts",
    "Easier to reach high shelves",
    "Often perceived as more authoritative",
    "Advantage in basketball",
    "Better for modeling runway",
  ];

  const shorterAdvantages = [
    "More legroom on airplanes",
    "Better for gymnastics",
    "Easier to fit in sports cars",
    "Often more agile",
    "Better for horse racing (jockeys)",
  ];

  if (taller === 'user') {
    userAdvantages.push(...tallerAdvantages.slice(0, 3));
    celebAdvantages.push(...shorterAdvantages.slice(0, 3));
  } else {
    celebAdvantages.push(...tallerAdvantages.slice(0, 3));
    userAdvantages.push(...shorterAdvantages.slice(0, 3));
  }

  return { userAdvantages, celebAdvantages };
}

export default function YouVsCelebrityClient({ celebrity, relatedCelebs }: YouVsCelebrityClientProps) {
  const searchParams = useSearchParams();
  const heightParam = searchParams.get('height');
  const unitParam = searchParams.get('unit') || 'metric';

  const userHeightCm = heightParam ? parseInt(heightParam) : 170;

  const diff = userHeightCm - celebrity.heightCm;
  const absDiff = Math.abs(diff);
  const isTaller = diff > 0.5;
  const isShorter = diff < -0.5;
  const isSame = Math.abs(diff) <= 0.5;

  // Format differences
  const diffCm = Math.round(absDiff * 10) / 10;
  const { feet: diffFeet, inches: diffInches } = cmToFeetInches(absDiff);
  const diffImperial = diffFeet > 0
    ? `${diffFeet}'${Math.round(diffInches)}"`
    : `${Math.round(diffInches)}"`;

  // Percentiles
  const userPercentileMale = getHeightPercentile(userHeightCm, 'male');
  const userPercentileFemale = getHeightPercentile(userHeightCm, 'female');
  const celebPercentileMale = getHeightPercentile(celebrity.heightCm, 'male');
  const celebPercentileFemale = getHeightPercentile(celebrity.heightCm, 'female');

  // Context and advantages
  const heightContext = getHeightDifferenceContext(diff);
  const { userAdvantages, celebAdvantages } = getHeightAdvantages(userHeightCm, celebrity.heightCm);

  const maxHeightCm = 230;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: 'Compare', href: '/compare' },
              { label: `You vs ${celebrity.name}` },
            ]}
            light
          />

          <div className="text-center mt-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              You vs {celebrity.name}
            </h1>
            <p className="text-xl text-blue-100">
              Height Comparison & Analysis
            </p>
          </div>

          {/* Visual Comparison */}
          <div className="mt-12 bg-white/10 backdrop-blur rounded-2xl p-8">
            <div className="flex justify-center items-end gap-8 md:gap-16" style={{ height: '300px' }}>
              {/* You */}
              <div className="flex flex-col items-center">
                <div
                  className="w-24 sm:w-32 bg-gradient-to-t from-white to-blue-100 rounded-t-full transition-all shadow-lg flex flex-col items-center justify-start pt-4"
                  style={{ height: `${(userHeightCm / maxHeightCm) * 100}%` }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md">
                    You
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-2xl sm:text-3xl font-bold">{formatCmToImperial(userHeightCm)}</div>
                  <div className="text-blue-200">{Math.round(userHeightCm)} cm</div>
                </div>
              </div>

              {/* Difference Indicator */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className={`text-4xl sm:text-5xl font-bold ${isSame ? 'text-white' : isTaller ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isSame ? '=' : isTaller ? `+${diffImperial}` : `-${diffImperial}`}
                </div>
                <div className="text-blue-200 mt-1">
                  {isSame ? 'Same height!' : `${diffCm} cm`}
                </div>
              </div>

              {/* Celebrity */}
              <div className="flex flex-col items-center">
                <div
                  className="w-24 sm:w-32 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-full transition-all shadow-lg flex flex-col items-center justify-start pt-4 overflow-hidden"
                  style={{ height: `${(celebrity.heightCm / maxHeightCm) * 100}%` }}
                >
                  {celebrity.imageUrl ? (
                    <img
                      src={celebrity.imageUrl}
                      alt={celebrity.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover ring-4 ring-white/50 shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md">
                      {celebrity.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <div className="text-2xl sm:text-3xl font-bold">{celebrity.heightImperial}</div>
                  <div className="text-blue-200">{Math.round(celebrity.heightCm)} cm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Key Takeaway */}
        <div className={`rounded-2xl p-8 mb-12 text-center ${
          isSame ? 'bg-gray-100' : isTaller ? 'bg-blue-50 border-2 border-blue-200' : 'bg-amber-50 border-2 border-amber-200'
        }`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {isSame ? (
              <>You&apos;re the exact same height as {celebrity.name}!</>
            ) : isTaller ? (
              <>You&apos;re <span className="text-primary">{diffImperial} ({diffCm} cm)</span> taller than {celebrity.name}</>
            ) : (
              <>{celebrity.name} is <span className="text-amber-600">{diffImperial} ({diffCm} cm)</span> taller than you</>
            )}
          </h2>
          <p className="text-gray-600 text-lg">
            {heightContext[0]}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Height Comparison Table</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Measurement</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary">You</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-emerald-600">{celebrity.name}</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-gray-600">Height (Imperial)</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">{formatCmToImperial(userHeightCm)}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">{celebrity.heightImperial}</td>
                  <td className={`px-6 py-4 text-center font-bold ${isTaller ? 'text-primary' : isShorter ? 'text-amber-600' : 'text-gray-600'}`}>
                    {isSame ? '—' : `${isTaller ? '+' : '-'}${diffImperial}`}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600">Height (Metric)</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">{Math.round(userHeightCm)} cm</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">{Math.round(celebrity.heightCm)} cm</td>
                  <td className={`px-6 py-4 text-center font-bold ${isTaller ? 'text-primary' : isShorter ? 'text-amber-600' : 'text-gray-600'}`}>
                    {isSame ? '—' : `${isTaller ? '+' : '-'}${diffCm} cm`}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600">Percentile (vs. US men)</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">{userPercentileMale.toFixed(0)}th</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">{celebPercentileMale.toFixed(0)}th</td>
                  <td className="px-6 py-4 text-center text-gray-500">—</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600">Percentile (vs. US women)</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">{userPercentileFemale.toFixed(0)}th</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">{celebPercentileFemale.toFixed(0)}th</td>
                  <td className="px-6 py-4 text-center text-gray-500">—</td>
                </tr>
                {celebrity.profession && (
                  <tr>
                    <td className="px-6 py-4 text-gray-600">Profession</td>
                    <td className="px-6 py-4 text-center text-gray-400">—</td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">{celebrity.profession}</td>
                    <td className="px-6 py-4 text-center text-gray-500">—</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Height Bar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Visual Height Chart</h2>
          <div className="space-y-4">
            {/* You */}
            <div className="flex items-center gap-4">
              <div className="w-20 sm:w-24 text-sm font-medium text-gray-700">You</div>
              <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-blue-400 h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: `${(userHeightCm / maxHeightCm) * 100}%` }}
                >
                  <span className="text-white text-sm font-bold">{formatCmToImperial(userHeightCm)}</span>
                </div>
              </div>
            </div>
            {/* Celebrity */}
            <div className="flex items-center gap-4">
              <div className="w-20 sm:w-24 text-sm font-medium text-gray-700 truncate">{celebrity.name}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: `${(celebrity.heightCm / maxHeightCm) * 100}%` }}
                >
                  <span className="text-white text-sm font-bold">{celebrity.heightImperial}</span>
                </div>
              </div>
            </div>
            {/* Average Man */}
            <div className="flex items-center gap-4">
              <div className="w-20 sm:w-24 text-sm font-medium text-gray-400">Avg. Man</div>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-gray-300 h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: `${(175 / maxHeightCm) * 100}%` }}
                >
                  <span className="text-gray-600 text-xs font-medium">5&apos;9&quot;</span>
                </div>
              </div>
            </div>
            {/* Average Woman */}
            <div className="flex items-center gap-4">
              <div className="w-20 sm:w-24 text-sm font-medium text-gray-400">Avg. Woman</div>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-gray-300 h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: `${(162 / maxHeightCm) * 100}%` }}
                >
                  <span className="text-gray-600 text-xs font-medium">5&apos;4&quot;</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Average heights based on US adult population data
          </p>
        </div>

        {/* Fun Facts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Height Difference Context */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📏</span> What Does {diffImperial} Look Like?
            </h3>
            <ul className="space-y-3">
              {heightContext.map((context, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{context}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Height Advantages */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span> Height Advantages
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-semibold text-primary mb-2">Your advantages:</div>
                <ul className="space-y-1">
                  {userAdvantages.map((adv, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> {adv}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold text-emerald-600 mb-2">{celebrity.name}&apos;s advantages:</div>
                <ul className="space-y-1">
                  {celebAdvantages.map((adv, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> {adv}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Percentile Explanation */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Understanding Your Height Percentile</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Your height among men</div>
              <div className="text-4xl font-bold text-primary mb-2">{userPercentileMale.toFixed(0)}th percentile</div>
              <p className="text-gray-600 text-sm">
                You&apos;re taller than {userPercentileMale.toFixed(0)}% of adult men in the US.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Your height among women</div>
              <div className="text-4xl font-bold text-primary mb-2">{userPercentileFemale.toFixed(0)}th percentile</div>
              <p className="text-gray-600 text-sm">
                You&apos;re taller than {userPercentileFemale.toFixed(0)}% of adult women in the US.
              </p>
            </div>
          </div>
        </div>

        {/* Celebrity Info Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 flex items-center justify-center">
              {celebrity.imageUrl ? (
                <img
                  src={celebrity.imageUrl}
                  alt={celebrity.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover ring-4 ring-white shadow-xl"
                />
              ) : (
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/20 flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                  {celebrity.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About {celebrity.name}</h3>
              <dl className="grid sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Height</dt>
                  <dd className="font-semibold text-gray-900">{celebrity.heightImperial} ({Math.round(celebrity.heightCm)} cm)</dd>
                </div>
                {celebrity.profession && (
                  <div>
                    <dt className="text-sm text-gray-500">Profession</dt>
                    <dd className="font-semibold text-gray-900">{celebrity.profession}</dd>
                  </div>
                )}
                {celebrity.nationality && (
                  <div>
                    <dt className="text-sm text-gray-500">Nationality</dt>
                    <dd className="font-semibold text-gray-900">{celebrity.nationality}</dd>
                  </div>
                )}
                {celebrity.birthDate && (
                  <div>
                    <dt className="text-sm text-gray-500">Birth Date</dt>
                    <dd className="font-semibold text-gray-900">{celebrity.birthDate}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-6">
                <Link
                  href={`/celebrity/${celebrity.slug}`}
                  className="inline-flex items-center text-primary hover:text-blue-700 font-medium"
                >
                  View full profile →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Compare with others */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Compare With Other Celebrities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {relatedCelebs.map((celeb) => {
              const celebDiff = userHeightCm - celeb.heightCm;
              const isCelebTaller = celebDiff > 0.5;

              return (
                <Link
                  key={celeb.slug}
                  href={`/compare/you-vs-${celeb.slug}?height=${userHeightCm}&unit=${unitParam}`}
                  className="group text-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden bg-gray-100 ring-2 ring-gray-100 group-hover:ring-primary/30 transition-all">
                    {celeb.imageUrl ? (
                      <img
                        src={celeb.imageUrl}
                        alt={celeb.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl text-gray-400">
                        {celeb.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-900 truncate">{celeb.name}</div>
                  <div className="text-xs text-gray-500">{celeb.heightImperial}</div>
                  <div className={`text-xs font-medium mt-1 ${
                    Math.abs(celebDiff) <= 0.5 ? 'text-gray-500' : isCelebTaller ? 'text-primary' : 'text-amber-600'
                  }`}>
                    {Math.abs(celebDiff) <= 0.5 ? 'Same' : isCelebTaller ? `+${Math.round(celebDiff)} cm` : `${Math.round(celebDiff)} cm`}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Compare With More Celebrities</h2>
          <p className="text-blue-100 mb-6">
            We have 130+ celebrity heights to compare with. Try another comparison!
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-colors"
          >
            Back to Comparison Tool
          </Link>
        </div>
      </div>
    </div>
  );
}
