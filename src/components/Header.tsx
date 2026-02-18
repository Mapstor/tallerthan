import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo Icon - Two figures comparing heights */}
            <div className="relative flex items-end gap-0.5">
              <div className="w-3 h-8 bg-gradient-to-t from-primary to-blue-400 rounded-t-full transition-all group-hover:h-9" />
              <div className="w-3 h-6 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-full transition-all group-hover:h-7" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-tight tracking-tight">
                Taller<span className="text-primary">Than</span>
              </span>
              <span className="text-[10px] text-gray-400 leading-none hidden sm:block">
                Celebrity Heights <span className="italic">(or shorter?)</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Compare Heights
            </Link>
            <Link
              href="/celebrity"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              All Celebrities
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
