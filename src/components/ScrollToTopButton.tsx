'use client';

export default function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="inline-flex items-center px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-colors text-lg shadow-lg"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
      Try It Now
    </button>
  );
}
