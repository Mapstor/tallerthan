import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getCelebrityBySlug, getAllCelebrities } from '@/lib/celebrities';
import YouVsCelebrityClient from './client';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const celebrities = getAllCelebrities();
  return celebrities.map((celeb) => ({
    slug: celeb.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const celebrity = getCelebrityBySlug(params.slug);
  if (!celebrity) {
    return { title: 'Celebrity Not Found' };
  }

  return {
    title: `Your Height vs ${celebrity.name} | TallerThan`,
    description: `Compare your height to ${celebrity.name} (${celebrity.heightImperial}). See detailed height comparison, charts, and analysis.`,
  };
}

export default function YouVsCelebrityPage({ params }: PageProps) {
  const celebrity = getCelebrityBySlug(params.slug);

  if (!celebrity) {
    notFound();
  }

  // Get related celebrities (similar height to the current celebrity)
  const allCelebs = getAllCelebrities();
  const relatedCelebs = allCelebs
    .filter(c => c.slug !== celebrity.slug)
    .sort((a, b) => Math.abs(a.heightCm - celebrity.heightCm) - Math.abs(b.heightCm - celebrity.heightCm))
    .slice(0, 6);

  // Schema for you-vs comparison page
  const youVsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Your Height vs ${celebrity.name}`,
    description: `Compare your height to ${celebrity.name} (${celebrity.heightImperial}). See detailed height comparison, charts, and analysis.`,
    url: `https://tallerthan.com/compare/you-vs-${params.slug}`,
    mainEntity: {
      '@type': 'Person',
      name: celebrity.name,
      height: {
        '@type': 'QuantitativeValue',
        value: celebrity.heightCm,
        unitCode: 'CMT',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(youVsSchema) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-500">Loading comparison...</div></div>}>
        <YouVsCelebrityClient
          celebrity={celebrity}
          relatedCelebs={relatedCelebs}
        />
      </Suspense>
    </>
  );
}
