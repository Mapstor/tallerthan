import { MetadataRoute } from 'next';
import { getAllCelebrities, getAllHeightSlugs, getComparisonPairs } from '@/lib/celebrities';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tallerthan.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/celebrity`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/height`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Celebrity profile pages
  const celebrities = getAllCelebrities();
  const celebrityPages: MetadataRoute.Sitemap = celebrities.map((celeb) => ({
    url: `${baseUrl}/celebrity/${celeb.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Height group pages
  const heightSlugs = getAllHeightSlugs();
  const heightPages: MetadataRoute.Sitemap = heightSlugs.map((slug) => ({
    url: `${baseUrl}/height/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Comparison pages
  const pairs = getComparisonPairs();
  const comparePages: MetadataRoute.Sitemap = pairs.map(({ slug1, slug2 }) => ({
    url: `${baseUrl}/compare/${slug1}-vs-${slug2}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...celebrityPages, ...heightPages, ...comparePages];
}
