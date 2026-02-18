import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">📏</span>
              <span className="text-xl font-bold text-white">TallerThan</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Compare your height to over 130 celebrities. Find out how tall your
              favorite stars are and see visual side-by-side comparisons you can
              share on social media.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Height Comparison Tool
                </Link>
              </li>
              <li>
                <Link
                  href="/celebrity"
                  className="hover:text-white transition-colors"
                >
                  All Celebrities
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Heights */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Heights</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/height/5-ft-10"
                  className="hover:text-white transition-colors"
                >
                  5&apos;10&quot; Celebrities
                </Link>
              </li>
              <li>
                <Link
                  href="/height/6-ft-0"
                  className="hover:text-white transition-colors"
                >
                  6&apos;0&quot; Celebrities
                </Link>
              </li>
              <li>
                <Link
                  href="/height/5-ft-6"
                  className="hover:text-white transition-colors"
                >
                  5&apos;6&quot; Celebrities
                </Link>
              </li>
              <li>
                <Link
                  href="/height/5-ft-2"
                  className="hover:text-white transition-colors"
                >
                  5&apos;2&quot; Celebrities
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} TallerThan. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Heights are estimates based on publicly available information.
          </p>
        </div>
      </div>
    </footer>
  );
}
