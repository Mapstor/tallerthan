import Link from 'next/link';
import { getAllCelebrities } from '@/lib/celebrities';
import HeightComparisonTool from '@/components/HeightComparisonTool';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export const metadata = {
  title: 'Celebrity Height Comparison Tool | TallerThan',
  description:
    'Compare your height to celebrities instantly. See how you measure up to Taylor Swift, Kevin Hart, Dwayne Johnson and 130+ famous stars.',
  openGraph: {
    title: 'Celebrity Height Comparison Tool | TallerThan',
    description:
      'Compare your height to celebrities instantly. See visual comparisons you can share.',
  },
};

// Homepage schema
const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TallerThan Height Comparison Tool',
  description: 'Compare your height to celebrities instantly. See visual side-by-side comparisons.',
  url: 'https://tallerthan.com',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Compare your height to 130+ celebrities',
    'Visual side-by-side comparisons',
    'Share results on social media',
    'Both imperial and metric units',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the celebrity height comparison tool work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter your height in feet/inches or centimeters, select a celebrity from our database of 130+ stars, and instantly see a visual side-by-side comparison showing the exact height difference.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the celebrity heights accurate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our celebrity heights are researched from multiple reliable sources including official records, interviews, and verified measurements. Heights are listed without shoes for accuracy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I share my height comparison?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! After comparing your height, you can share the results directly to Twitter/X or copy a shareable link to post anywhere.',
      },
    },
  ],
};

export default function HomePage() {
  const celebrities = getAllCelebrities();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero with Tool */}
        <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
              How Tall Are You<br />
              <span className="text-emerald-400">Compared to Celebrities?</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Enter your height and instantly see visual comparisons with your favorite stars
            </p>
          </div>

          {/* The Tool */}
          <HeightComparisonTool celebrities={celebrities} />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">130+</div>
              <div className="text-sm text-gray-600">Celebrities</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-gray-600">Free to Use</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-gray-600">Comparisons</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Popular Height Comparisons
          </h2>
          <p className="text-gray-600 text-center mb-8">
            See how these famous pairs measure up
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { slug1: 'kevin-hart', slug2: 'dwayne-johnson', label: 'Kevin Hart vs The Rock' },
              { slug1: 'tom-cruise', slug2: 'brad-pitt', label: 'Tom Cruise vs Brad Pitt' },
              { slug1: 'ariana-grande', slug2: 'taylor-swift', label: 'Ariana Grande vs Taylor Swift' },
              { slug1: 'tom-holland', slug2: 'zendaya', label: 'Tom Holland vs Zendaya' },
              { slug1: 'danny-devito', slug2: 'shaquille-oneal', label: 'Danny DeVito vs Shaq' },
              { slug1: 'beyonce', slug2: 'rihanna', label: 'Beyoncé vs Rihanna' },
            ].map(({ slug1, slug2, label }) => (
              <Link
                key={`${slug1}-${slug2}`}
                href={`/compare/${slug1}-vs-${slug2}`}
                className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-primary hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-primary font-bold border-2 border-white">
                      {label.split(' vs ')[0].charAt(0)}
                    </div>
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold border-2 border-white">
                      {label.split(' vs ')[1].charAt(0)}
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="font-semibold text-gray-900">{label}</div>
                <div className="text-sm text-gray-500">See the height difference</div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/compare"
              className="inline-flex items-center text-primary hover:text-blue-700 font-medium"
            >
              View all comparisons &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Height */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Browse by Height
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Find celebrities at your height
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { slug: '5-ft-0', label: "5'0\"", cm: 152 },
              { slug: '5-ft-2', label: "5'2\"", cm: 157 },
              { slug: '5-ft-4', label: "5'4\"", cm: 163 },
              { slug: '5-ft-6', label: "5'6\"", cm: 168 },
              { slug: '5-ft-8', label: "5'8\"", cm: 173 },
              { slug: '5-ft-10', label: "5'10\"", cm: 178 },
              { slug: '6-ft-0', label: "6'0\"", cm: 183 },
              { slug: '6-ft-2', label: "6'2\"", cm: 188 },
              { slug: '6-ft-4', label: "6'4\"", cm: 193 },
            ].map(({ slug, label, cm }) => (
              <Link
                key={slug}
                href={`/height/${slug}`}
                className="group relative px-6 py-4 bg-gray-50 rounded-xl hover:bg-primary hover:text-white transition-all"
              >
                <div className="text-2xl font-bold">{label}</div>
                <div className="text-sm opacity-70">{cm} cm</div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/height"
              className="inline-flex items-center text-primary hover:text-blue-700 font-medium"
            >
              View all heights &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* All Celebrities Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            130+ Verified Celebrity Heights
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Researched from reliable sources
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {celebrities.slice(0, 18).map((celebrity) => (
              <Link
                key={celebrity.slug}
                href={`/celebrity/${celebrity.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:border-primary hover:shadow-lg transition-all text-center group"
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden bg-gray-100">
                  {celebrity.imageUrl ? (
                    <img
                      src={celebrity.imageUrl}
                      alt={celebrity.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">
                      {celebrity.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="font-medium text-gray-900 text-sm truncate">
                  {celebrity.name}
                </div>
                <div className="text-primary font-bold">
                  {celebrity.heightImperial}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/celebrity"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              View All {celebrities.length} Celebrities
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Compare Your Height?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Scroll up and enter your height to get started. It&apos;s free and instant.
          </p>
          <ScrollToTopButton />
        </div>
      </section>
    </div>
    </>
  );
}
