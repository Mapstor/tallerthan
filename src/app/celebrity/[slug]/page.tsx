import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllArticleSlugs, getArticleBySlug, markdownToHtml } from '@/lib/articles';
import { getCelebrityBySlug } from '@/lib/celebrities';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Celebrity Not Found | TallerThan',
    };
  }

  return {
    title: article.frontmatter.title || `${slug} Height | TallerThan`,
    description: article.frontmatter.meta_description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.meta_description,
      type: 'article',
    },
  };
}

export default async function CelebrityPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const celebrity = getCelebrityBySlug(slug);

  if (!article) {
    notFound();
  }

  const contentHtml = markdownToHtml(article.content);

  return (
    <>
      <SchemaMarkup schemas={article.schemas} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Celebrities', href: '/celebrity' },
            { label: celebrity?.name || slug },
          ]}
        />

        {/* Quick Stats Card */}
        {celebrity && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Celebrity Photo */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-white shadow-md">
                  {celebrity.imageUrl ? (
                    <img
                      src={celebrity.imageUrl}
                      alt={celebrity.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl text-gray-400 bg-gray-200">
                      {celebrity.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {celebrity.name}&apos;s Height
                  </h2>
                  <p className="text-3xl font-bold text-primary">
                    {celebrity.heightImperial} ({celebrity.heightCm} cm)
                  </p>
                  {celebrity.nationality && (
                    <p className="text-gray-600 mt-1">{celebrity.nationality}</p>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  href={`/?celeb=${slug}`}
                  className="inline-flex items-center px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  📏 Compare Your Height
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Related Celebrities */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Compare {celebrity?.name || 'This Celebrity'}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/?celeb=${slug}`}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Compare to Your Height
            </Link>
            <Link
              href="/celebrity"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse All Celebrities
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
