import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Visual Element */}
        <div className="mb-8 flex justify-center items-end gap-4">
          <div className="w-16 h-32 bg-gradient-to-t from-primary to-blue-400 rounded-t-full opacity-50" />
          <div className="w-16 h-24 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-full flex items-start justify-center pt-4">
            <span className="text-2xl">?</span>
          </div>
          <div className="w-16 h-40 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-full opacity-50" />
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>

        {/* Primary CTA */}
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors mb-8"
        >
          Compare Your Height
        </Link>

        {/* Helpful Links */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 mb-4">Or try one of these:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/celebrity"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              All Celebrities
            </Link>
            <Link
              href="/height"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Browse by Height
            </Link>
            <Link
              href="/compare"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Popular Comparisons
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
