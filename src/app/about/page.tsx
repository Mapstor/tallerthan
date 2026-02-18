import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Us | TallerThan - Celebrity Height Comparison Tool',
  description:
    'Learn about TallerThan, our mission to educate and entertain through celebrity height comparisons. Discover how we research heights and our commitment to accuracy.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <h1 className="text-4xl font-bold text-gray-900 mb-6">About TallerThan</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          TallerThan is a free, educational entertainment platform dedicated to helping people
          understand and visualize height comparisons. We provide meticulously researched
          height data for over 130 celebrities from movies, music, sports, and entertainment,
          making it fun and easy to see how you measure up against the stars.
        </p>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            TallerThan started as a fun passion project with a simple goal: to create an engaging,
            educational resource that helps people understand height in a relatable way. We believe
            that learning should be entertaining, and what better way to understand measurements
            than by comparing yourself to your favorite celebrities?
          </p>
          <p className="text-gray-700 mb-4">
            Height is one of the most commonly searched facts about celebrities. Queries like
            &quot;How tall is Kevin Hart?&quot;, &quot;Taylor Swift height&quot;, and &quot;Dwayne Johnson height&quot;
            generate millions of searches every month. People are naturally curious about how
            celebrities compare to themselves and to each other.
          </p>
          <p className="text-gray-700 mb-0">
            Our mission is to satisfy this curiosity while providing accurate, well-researched
            information in a visually appealing and interactive format. We aim to educate and
            entertain simultaneously, making height comparisons both informative and fun.
          </p>
        </div>

        {/* What We Offer Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
        <p className="text-gray-700 mb-4">
          TallerThan provides a comprehensive suite of height comparison tools and resources:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-3xl mb-3">📏</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Height Comparison Tool</h3>
            <p className="text-gray-600 text-sm">
              Enter your height and instantly see a visual side-by-side comparison with any celebrity
              in our database. Switch between imperial and metric units effortlessly.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Celebrity vs Celebrity Comparisons</h3>
            <p className="text-gray-600 text-sm">
              Compare any two celebrities side-by-side with detailed statistics, visual representations,
              and interesting facts about their height differences.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Celebrity Profiles</h3>
            <p className="text-gray-600 text-sm">
              Each celebrity has a comprehensive profile including verified height, comparison to
              average heights, height history, and comparisons with similar celebrities.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Shareable Results</h3>
            <p className="text-gray-600 text-sm">
              Share your height comparisons on social media. Let your friends know you&apos;re taller
              than Tom Cruise or the same height as Beyoncé!
            </p>
          </div>
        </div>

        {/* Research Methodology Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Research Methodology</h2>
        <p className="text-gray-700 mb-4">
          Accurate height information is surprisingly difficult to obtain. Celebrities often claim
          heights that differ from their actual measurements, sometimes by several inches. At TallerThan,
          we take height accuracy seriously and employ a rigorous multi-source verification process:
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Sources</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">1.</span>
              <div>
                <strong className="text-gray-900">CelebHeights.com</strong>
                <p className="text-gray-600 text-sm mt-1">
                  The most respected celebrity height database on the internet, maintained by height
                  enthusiast Rob Paul since 2004. This site features thousands of celebrity listings
                  with detailed analysis, photo comparisons, and community discussion.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">2.</span>
              <div>
                <strong className="text-gray-900">Official Sports Records</strong>
                <p className="text-gray-600 text-sm mt-1">
                  For athletes, we reference official league measurements from the NBA, NFL, FIFA,
                  and other sports organizations. These measurements are typically taken during
                  combines or official team physicals.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">3.</span>
              <div>
                <strong className="text-gray-900">Photo Analysis</strong>
                <p className="text-gray-600 text-sm mt-1">
                  We analyze photographs of celebrities standing next to people of verified heights,
                  accounting for footwear, posture, camera angles, and other factors that can
                  affect apparent height.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">4.</span>
              <div>
                <strong className="text-gray-900">Official Documents</strong>
                <p className="text-gray-600 text-sm mt-1">
                  When available, we reference official documents such as passport records, driver&apos;s
                  licenses, military records, or modeling agency statistics.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">5.</span>
              <div>
                <strong className="text-gray-900">Interview Statements</strong>
                <p className="text-gray-600 text-sm mt-1">
                  We note what celebrities have claimed in interviews, though we recognize these
                  self-reported heights are often inaccurate. We use them as reference points
                  but verify with other sources.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <p className="text-gray-700 mb-8">
          When sources conflict, we use our best judgment based on the reliability of each source
          and the preponderance of evidence. All heights are listed as &quot;barefoot&quot; measurements
          unless otherwise noted, and we acknowledge that heights can vary slightly throughout
          the day and over a person&apos;s lifetime.
        </p>

        {/* Educational Value Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Educational Value</h2>
        <p className="text-gray-700 mb-4">
          Beyond entertainment, TallerThan serves several educational purposes:
        </p>

        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <strong className="text-gray-900">Understanding Measurement Systems</strong>
              <p className="text-gray-600 mt-1">
                By displaying heights in both imperial (feet and inches) and metric (centimeters)
                systems, we help users become familiar with both measurement standards used worldwide.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <strong className="text-gray-900">Statistical Context</strong>
              <p className="text-gray-600 mt-1">
                We provide information about average heights for different demographics, helping
                users understand where they and celebrities fall on the height distribution curve.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <strong className="text-gray-900">Visual Perception</strong>
              <p className="text-gray-600 mt-1">
                Our visual comparisons help users understand that height differences that seem
                significant on paper may appear different in real life, and vice versa.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <strong className="text-gray-900">Critical Thinking</strong>
              <p className="text-gray-600 mt-1">
                By showing the difference between claimed heights and verified heights, we encourage
                users to think critically about information and verify claims from multiple sources.
              </p>
            </div>
          </li>
        </ul>

        {/* Our Commitment Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Users</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Accuracy</h3>
            <p className="text-gray-600 text-sm">
              We strive for the most accurate height data possible, using multiple verified sources.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Privacy</h3>
            <p className="text-gray-600 text-sm">
              Your height data stays in your browser. We don&apos;t store personal measurements.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Free Forever</h3>
            <p className="text-gray-600 text-sm">
              TallerThan is and always will be completely free to use for everyone.
            </p>
          </div>
        </div>

        {/* The Team Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Team Behind TallerThan</h2>
        <p className="text-gray-700 mb-4">
          TallerThan was created by a small team of developers and designers who share a passion
          for creating useful, entertaining web tools. What started as a weekend project to answer
          the question &quot;How tall am I compared to my favorite celebrities?&quot; has grown into a
          comprehensive height comparison platform.
        </p>
        <p className="text-gray-700 mb-8">
          We&apos;re constantly working to improve TallerThan, adding new celebrities, enhancing our
          comparison tools, and making the user experience better. We value user feedback and are
          always open to suggestions for new features or celebrities to add.
        </p>

        {/* Contact Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-4">
          We love hearing from our users! Whether you have a suggestion for a new feature, spotted
          an error in our data, or just want to say hello, we&apos;d be happy to hear from you.
        </p>
        <ul className="space-y-2 mb-8">
          <li>
            <strong>General Inquiries:</strong>{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Form
            </Link>
          </li>
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:info@tallerthan.com" className="text-primary hover:underline">
              info@tallerthan.com
            </a>
          </li>
        </ul>

        {/* Legal Links */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Information</h3>
          <p className="text-gray-600 mb-4 text-sm">
            For information about how we handle your data and the terms of using our service,
            please review our legal documents:
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="text-primary hover:underline text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-primary hover:underline text-sm">
              Terms of Use
            </Link>
            <Link href="/contact" className="text-primary hover:underline text-sm">
              Contact Us
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-3">Ready to Compare Heights?</h3>
          <p className="text-blue-100 mb-6">
            Find out how your height measures up against your favorite celebrities.
            It&apos;s free, fun, and takes just seconds!
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
    </div>
  );
}
