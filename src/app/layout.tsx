import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://tallerthan.com'),
  title: {
    default: 'TallerThan - Celebrity Height Comparison Tool',
    template: '%s | TallerThan',
  },
  description:
    'Compare your height to celebrities. Find out how tall your favorite stars are and see visual side-by-side comparisons.',
  keywords: [
    'celebrity height',
    'height comparison',
    'how tall is',
    'celebrity heights comparison',
    'compare heights',
    'celebrity height chart',
  ],
  authors: [{ name: 'TallerThan' }],
  creator: 'TallerThan',
  publisher: 'TallerThan',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'TallerThan',
    title: 'TallerThan - Celebrity Height Comparison Tool',
    description:
      'Compare your height to 130+ celebrities. See visual side-by-side comparisons you can share on social media.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TallerThan - Celebrity Height Comparison Tool',
    description:
      'Compare your height to 130+ celebrities. See visual side-by-side comparisons you can share on social media.',
    creator: '@tallerthan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token', // Replace with actual token
  },
};

// WebSite schema for the entire site
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TallerThan',
  alternateName: 'TallerThan Celebrity Heights',
  url: 'https://tallerthan.com',
  description:
    'Compare your height to celebrities. Find out how tall your favorite stars are.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://tallerthan.com/celebrity/{search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TallerThan',
  url: 'https://tallerthan.com',
  logo: 'https://tallerthan.com/icon.png',
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
