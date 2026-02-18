import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Us | TallerThan',
  description:
    'Get in touch with the TallerThan team. We welcome your questions, feedback, and suggestions about our celebrity height comparison tool.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-xl text-gray-600 mb-8">
        We&apos;d love to hear from you! Whether you have a question, feedback, or suggestion,
        our team is here to help.
      </p>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Main Contact Card */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

            <div className="space-y-6">
              {/* Email Contact */}
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <a
                    href="mailto:info@tallerthan.com"
                    className="text-primary text-lg font-medium hover:underline"
                  >
                    info@tallerthan.com
                  </a>
                  <p className="text-gray-600 text-sm mt-2">
                    Our primary contact method. We typically respond within 24-48 hours during business days.
                  </p>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
                  <p className="text-gray-700">24-48 hours</p>
                  <p className="text-gray-600 text-sm mt-2">
                    We aim to respond to all inquiries within 1-2 business days. Complex requests may take longer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-primary hover:underline flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-primary hover:underline flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary hover:underline flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/" className="text-primary hover:underline flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Back to Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Note */}
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-2">Love TallerThan?</h3>
            <p className="text-blue-100 text-sm">
              Share your height comparisons with friends and family! Use our share feature to let
              everyone know how you measure up to the stars.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Reasons Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What Can We Help You With?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* General Questions */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">General Questions</h3>
            <p className="text-gray-600 text-sm">
              Have a question about how to use TallerThan? We&apos;re here to help you get the most out of our
              height comparison tools.
            </p>
          </div>

          {/* Data Corrections */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Data Corrections</h3>
            <p className="text-gray-600 text-sm">
              Found an error in our celebrity height data? Let us know and we&apos;ll investigate and make
              corrections if needed.
            </p>
          </div>

          {/* Feature Requests */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Feature Requests</h3>
            <p className="text-gray-600 text-sm">
              Have an idea for a new feature or improvement? We love hearing suggestions from our users!
            </p>
          </div>

          {/* Celebrity Requests */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Celebrity Requests</h3>
            <p className="text-gray-600 text-sm">
              Want us to add a specific celebrity? Let us know who you&apos;d like to see in our database!
            </p>
          </div>

          {/* Technical Issues */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Technical Issues</h3>
            <p className="text-gray-600 text-sm">
              Experiencing a bug or technical problem? Please describe the issue and we&apos;ll work to resolve it.
            </p>
          </div>

          {/* Partnership */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Partnership Inquiries</h3>
            <p className="text-gray-600 text-sm">
              Interested in partnering with TallerThan? We&apos;re open to discussing collaboration opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Tips for Contacting Us */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips for Getting a Quick Response</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Be Specific</h4>
              <p className="text-gray-600 text-sm">
                Include details like the celebrity name, the page URL, or a description of what you
                were trying to do when you encountered an issue.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Include Screenshots</h4>
              <p className="text-gray-600 text-sm">
                If you&apos;re reporting a bug or error, screenshots help us understand exactly what
                you&apos;re seeing.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Use a Clear Subject Line</h4>
              <p className="text-gray-600 text-sm">
                A descriptive subject line helps us route your email to the right person and prioritize
                appropriately.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              4
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Provide Sources</h4>
              <p className="text-gray-600 text-sm">
                If you&apos;re suggesting a data correction, include links to reliable sources that support
                the correct information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              How accurate is your celebrity height data?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              <p>
                We strive for maximum accuracy by using multiple verified sources, including CelebHeights.com,
                official sports records, photo analysis, and more. However, celebrity heights can be difficult
                to verify with 100% certainty, so we present our best estimates based on available evidence.
                If you believe we have incorrect information, please let us know with supporting sources.
              </p>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Can you add a specific celebrity to your database?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              <p>
                Yes! We&apos;re always looking to expand our database. Email us with the celebrity&apos;s name and any
                reliable height information you have. We prioritize adding celebrities based on user demand
                and the availability of verified height data.
              </p>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Is TallerThan free to use?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              <p>
                Yes, TallerThan is completely free to use! We believe everyone should be able to have fun
                comparing their height to celebrities. We may display advertisements to support the site,
                but all features are available at no cost.
              </p>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              How do I share my height comparison results?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              <p>
                After making a comparison, look for the share button on the comparison page. You can copy
                a direct link to share with friends, or use our social sharing buttons to post directly
                to your favorite platforms. The link will include your comparison so others can see it!
              </p>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Do you store my height information?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              <p>
                No, we do not store your personal height measurements on our servers. The height you enter
                is processed locally in your browser. If you share a comparison link, your height is included
                in the URL so others can see the comparison, but it&apos;s not stored in our database.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to Start Comparing?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Don&apos;t wait to find out how you measure up! Try our free height comparison tool
          and see how your height compares to your favorite celebrities.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-colors"
        >
          Try the Height Comparison Tool
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
