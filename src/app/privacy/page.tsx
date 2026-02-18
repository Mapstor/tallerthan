import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | TallerThan',
  description:
    'Read the Privacy Policy for TallerThan. Learn how we collect, use, and protect your information when you use our celebrity height comparison tool.',
};

export default function PrivacyPage() {
  const lastUpdated = 'February 18, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

      <div className="prose prose-lg max-w-none">
        {/* Introduction */}
        <div className="bg-green-50 rounded-xl p-6 mb-8">
          <p className="text-gray-700 mb-0">
            At TallerThan, we take your privacy seriously. This Privacy Policy describes how we collect,
            use, and share information about you when you use our website at tallerthan.com (the &quot;Service&quot;).
            We encourage you to read this Privacy Policy carefully to understand our practices regarding
            your information and how we will treat it.
          </p>
        </div>

        {/* Privacy Summary Box */}
        <div className="bg-white border-2 border-green-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Privacy at a Glance
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-500 mt-1">✓</span>
              <span>We do not require account registration to use our Service</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-500 mt-1">✓</span>
              <span>Your height measurements are processed locally in your browser and are not stored on our servers</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-500 mt-1">✓</span>
              <span>We do not sell your personal information to third parties</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-500 mt-1">✓</span>
              <span>We use minimal cookies, primarily for analytics and improving user experience</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-500 mt-1">✓</span>
              <span>You can use most features of our Service without providing any personal information</span>
            </li>
          </ul>
        </div>

        {/* Section 1: Information We Collect */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We collect information in several ways when you use our Service. The types of information
          we collect include:
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">1.1 Information You Provide Voluntarily</h3>
        <p className="text-gray-700 mb-4">
          When you use certain features of our Service, you may choose to provide information to us:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li className="text-gray-700">
            <strong>Contact Information:</strong> If you contact us through our contact form or email,
            you provide your email address and any other information you include in your message.
          </li>
          <li className="text-gray-700">
            <strong>Height Measurements:</strong> When using our comparison tool, you enter your height.
            This information is processed locally in your browser and included in shareable URLs if you
            choose to share your comparison results.
          </li>
          <li className="text-gray-700">
            <strong>Feedback and Suggestions:</strong> Any feedback, suggestions, or other communications
            you send to us.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">1.2 Information Collected Automatically</h3>
        <p className="text-gray-700 mb-4">
          When you access or use our Service, we automatically collect certain information:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li className="text-gray-700">
            <strong>Log Information:</strong> We collect information that your browser sends whenever
            you visit our Service, including your IP address, browser type, browser version, the pages
            of our Service that you visit, the time and date of your visit, the time spent on those
            pages, and other diagnostic data.
          </li>
          <li className="text-gray-700">
            <strong>Device Information:</strong> We collect information about the device you use to
            access our Service, including device type, operating system, unique device identifiers,
            and mobile network information.
          </li>
          <li className="text-gray-700">
            <strong>Usage Information:</strong> We collect information about how you use our Service,
            including the pages you view, the links you click, and the features you use.
          </li>
          <li className="text-gray-700">
            <strong>Location Information:</strong> We may collect information about your approximate
            location based on your IP address.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">1.3 Information from Cookies and Similar Technologies</h3>
        <p className="text-gray-700 mb-8">
          We use cookies and similar tracking technologies to track activity on our Service and hold
          certain information. Cookies are files with a small amount of data that are sent to your
          browser from a website and stored on your device. For more information about the cookies
          we use, please see Section 5 of this Privacy Policy.
        </p>

        {/* Section 2: How We Use Your Information */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          We use the information we collect for various purposes, including:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Service Operation</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Provide, maintain, and improve our Service</li>
              <li>• Process and respond to your inquiries</li>
              <li>• Enable sharing features</li>
              <li>• Provide customer support</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Analytics & Improvement</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Understand how users interact with our Service</li>
              <li>• Analyze usage patterns and trends</li>
              <li>• Develop new features and functionality</li>
              <li>• Test and improve performance</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Communication</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Respond to your comments and questions</li>
              <li>• Send technical notices and updates</li>
              <li>• Provide information you request</li>
              <li>• Send service-related announcements</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Security & Legal</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Detect and prevent fraud and abuse</li>
              <li>• Protect the rights and safety of users</li>
              <li>• Comply with legal obligations</li>
              <li>• Enforce our Terms of Use</li>
            </ul>
          </div>
        </div>

        {/* Section 3: How We Share Your Information */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Share Your Information</h2>
        <p className="text-gray-700 mb-4">
          We do not sell, trade, or rent your personal information to third parties. We may share
          your information in the following circumstances:
        </p>

        <ul className="list-disc pl-6 mb-8 space-y-3">
          <li className="text-gray-700">
            <strong>Service Providers:</strong> We may share your information with third-party service
            providers who perform services on our behalf, such as web hosting, data analysis, email
            delivery, and customer service. These service providers are contractually obligated to
            use your information only as necessary to provide services to us.
          </li>
          <li className="text-gray-700">
            <strong>Analytics Partners:</strong> We use analytics services, such as Google Analytics,
            to help us understand how users interact with our Service. These services may collect
            information about your use of our Service and other websites.
          </li>
          <li className="text-gray-700">
            <strong>Legal Requirements:</strong> We may disclose your information if required to do so
            by law or in response to valid requests by public authorities (e.g., a court or government
            agency).
          </li>
          <li className="text-gray-700">
            <strong>Protection of Rights:</strong> We may disclose your information when we believe
            it is necessary to investigate, prevent, or take action regarding potential violations of
            our Terms of Use, suspected fraud, situations involving potential threats to the safety
            of any person, or as evidence in litigation.
          </li>
          <li className="text-gray-700">
            <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale
            of all or a portion of our assets, your information may be transferred as part of that
            transaction. We will notify you via prominent notice on our Service of any change in
            ownership or uses of your personal information.
          </li>
          <li className="text-gray-700">
            <strong>With Your Consent:</strong> We may share your information for other purposes with
            your consent.
          </li>
        </ul>

        {/* Section 4: Data Retention */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Retention</h2>
        <p className="text-gray-700 mb-4">
          We retain your information for as long as necessary to fulfill the purposes outlined in this
          Privacy Policy, unless a longer retention period is required or permitted by law.
        </p>
        <p className="text-gray-700 mb-4">
          Specifically:
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li className="text-gray-700">
            <strong>Height Measurements:</strong> Height data you enter is processed locally in your
            browser and is not stored on our servers. If you share a comparison via URL, the height
            data is included in the URL itself.
          </li>
          <li className="text-gray-700">
            <strong>Contact Information:</strong> If you contact us, we retain your correspondence for
            as long as necessary to respond to your inquiry and maintain records for legal and business purposes.
          </li>
          <li className="text-gray-700">
            <strong>Analytics Data:</strong> We retain aggregated analytics data for up to 26 months
            to analyze trends and improve our Service.
          </li>
          <li className="text-gray-700">
            <strong>Log Data:</strong> Server log data is typically retained for up to 90 days for
            security and diagnostic purposes.
          </li>
        </ul>

        {/* Section 5: Cookies and Tracking Technologies */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
        <p className="text-gray-700 mb-4">
          We use cookies and similar tracking technologies to collect and track information about your
          use of our Service. Cookies are small data files stored on your device.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of Cookies We Use</h3>
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <ul className="space-y-4">
            <li className="pb-4 border-b border-gray-200">
              <strong className="text-gray-900">Essential Cookies</strong>
              <p className="text-gray-600 mt-1">
                These cookies are necessary for the Service to function properly. They enable basic
                functions like page navigation and access to secure areas. The Service cannot function
                properly without these cookies.
              </p>
            </li>
            <li className="pb-4 border-b border-gray-200">
              <strong className="text-gray-900">Analytics Cookies</strong>
              <p className="text-gray-600 mt-1">
                These cookies help us understand how visitors interact with our Service by collecting
                and reporting information anonymously. We use this information to improve our Service.
              </p>
            </li>
            <li className="pb-4 border-b border-gray-200">
              <strong className="text-gray-900">Functional Cookies</strong>
              <p className="text-gray-600 mt-1">
                These cookies enable enhanced functionality and personalization, such as remembering
                your unit preference (metric or imperial). If you do not allow these cookies, some
                features may not function properly.
              </p>
            </li>
            <li>
              <strong className="text-gray-900">Advertising Cookies</strong>
              <p className="text-gray-600 mt-1">
                These cookies may be set through our Service by our advertising partners. They may be
                used to build a profile of your interests and show you relevant advertisements on other
                sites. They do not store directly personal information but are based on uniquely
                identifying your browser and device.
              </p>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Managing Cookies</h3>
        <p className="text-gray-700 mb-4">
          Most web browsers allow you to control cookies through their settings. You can set your
          browser to refuse cookies or to alert you when cookies are being sent. However, if you
          disable cookies, some features of our Service may not function properly.
        </p>
        <p className="text-gray-700 mb-8">
          For more information about cookies and how to manage them, visit{' '}
          <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            www.allaboutcookies.org
          </a>.
        </p>

        {/* Section 6: Third-Party Services */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Services</h2>
        <p className="text-gray-700 mb-4">
          Our Service may contain links to third-party websites, services, or content that are not
          owned or controlled by TallerThan. This Privacy Policy does not apply to any third-party
          websites or services. We encourage you to review the privacy policies of any third-party
          websites or services you visit.
        </p>
        <p className="text-gray-700 mb-4">
          We may use the following third-party services:
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li className="text-gray-700">
            <strong>Google Analytics:</strong> We use Google Analytics to analyze website traffic and
            usage patterns. Google Analytics collects information anonymously and reports website trends
            without identifying individual visitors. For more information, see{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Google&apos;s Privacy Policy
            </a>.
          </li>
          <li className="text-gray-700">
            <strong>Content Delivery Networks (CDNs):</strong> We may use CDNs to deliver content
            efficiently to users around the world. These services may collect certain technical
            information as part of their operation.
          </li>
          <li className="text-gray-700">
            <strong>Social Media Platforms:</strong> If you choose to share content from our Service
            on social media platforms, those platforms may collect information about your use.
          </li>
        </ul>

        {/* Section 7: Your Rights */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
        <p className="text-gray-700 mb-4">
          Depending on your location, you may have certain rights regarding your personal information:
        </p>

        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Privacy Rights</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">1</span>
              </div>
              <div>
                <strong className="text-gray-900">Right to Access</strong>
                <p className="text-gray-600 text-sm mt-1">
                  You have the right to request a copy of the personal information we hold about you.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">2</span>
              </div>
              <div>
                <strong className="text-gray-900">Right to Correction</strong>
                <p className="text-gray-600 text-sm mt-1">
                  You have the right to request correction of any inaccurate personal information we hold about you.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">3</span>
              </div>
              <div>
                <strong className="text-gray-900">Right to Deletion</strong>
                <p className="text-gray-600 text-sm mt-1">
                  You have the right to request deletion of your personal information in certain circumstances.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">4</span>
              </div>
              <div>
                <strong className="text-gray-900">Right to Object</strong>
                <p className="text-gray-600 text-sm mt-1">
                  You have the right to object to processing of your personal information in certain circumstances.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">5</span>
              </div>
              <div>
                <strong className="text-gray-900">Right to Data Portability</strong>
                <p className="text-gray-600 text-sm mt-1">
                  You have the right to request a copy of your data in a structured, machine-readable format.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">6</span>
              </div>
              <div>
                <strong className="text-gray-900">Right to Withdraw Consent</strong>
                <p className="text-gray-600 text-sm mt-1">
                  Where processing is based on consent, you have the right to withdraw consent at any time.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <p className="text-gray-700 mb-8">
          To exercise any of these rights, please contact us using the information provided in the
          &quot;Contact Us&quot; section below. We will respond to your request within a reasonable timeframe
          and in accordance with applicable law.
        </p>

        {/* Section 8: Data Security */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Security</h2>
        <p className="text-gray-700 mb-4">
          We take reasonable measures to protect your information from unauthorized access, use,
          alteration, or destruction. However, no method of transmission over the Internet or method
          of electronic storage is 100% secure.
        </p>
        <p className="text-gray-700 mb-4">
          Security measures we implement include:
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li className="text-gray-700">
            HTTPS encryption for all data transmitted between your browser and our servers
          </li>
          <li className="text-gray-700">
            Regular security assessments and updates to our systems
          </li>
          <li className="text-gray-700">
            Limited access to personal information by employees and contractors
          </li>
          <li className="text-gray-700">
            Secure hosting infrastructure with industry-standard protections
          </li>
        </ul>

        {/* Section 9: International Data Transfers */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
        <p className="text-gray-700 mb-8">
          Your information may be transferred to, and maintained on, computers located outside of your
          state, province, country, or other governmental jurisdiction where the data protection laws
          may differ from those of your jurisdiction. If you are located outside the United States
          and choose to provide information to us, please note that we transfer the data to the United
          States and process it there. By using our Service, you consent to this transfer.
        </p>

        {/* Section 10: Children's Privacy */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children&apos;s Privacy</h2>
        <p className="text-gray-700 mb-4">
          Our Service is intended for users of all ages. We do not knowingly collect personally
          identifiable information from children under 13. If you are a parent or guardian and you
          are aware that your child has provided us with personal information, please contact us.
        </p>
        <p className="text-gray-700 mb-8">
          If we become aware that we have collected personal information from a child under 13 without
          verification of parental consent, we take steps to remove that information from our servers.
        </p>

        {/* Section 11: California Privacy Rights */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. California Privacy Rights</h2>
        <p className="text-gray-700 mb-4">
          If you are a California resident, you have specific rights under the California Consumer
          Privacy Act (CCPA) and the California Privacy Rights Act (CPRA):
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li className="text-gray-700">
            The right to know what personal information is being collected about you
          </li>
          <li className="text-gray-700">
            The right to know whether your personal information is sold or disclosed and to whom
          </li>
          <li className="text-gray-700">
            The right to say no to the sale of personal information
          </li>
          <li className="text-gray-700">
            The right to access your personal information
          </li>
          <li className="text-gray-700">
            The right to request deletion of your personal information
          </li>
          <li className="text-gray-700">
            The right to equal service and price, even if you exercise your privacy rights
          </li>
        </ul>

        {/* Section 12: European Privacy Rights */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. European Privacy Rights (GDPR)</h2>
        <p className="text-gray-700 mb-4">
          If you are located in the European Economic Area (EEA), you have certain rights under the
          General Data Protection Regulation (GDPR), including those outlined in Section 7 above.
        </p>
        <p className="text-gray-700 mb-8">
          Our legal basis for collecting and using your personal information depends on the specific
          information concerned and the context in which we collect it. We may process your personal
          information because we need to perform a contract with you, you have given us consent to do
          so, the processing is in our legitimate interests, or we need to comply with the law.
        </p>

        {/* Section 13: Changes to Privacy Policy */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to This Privacy Policy</h2>
        <p className="text-gray-700 mb-8">
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the top.
          We encourage you to review this Privacy Policy periodically for any changes. Changes to this
          Privacy Policy are effective when they are posted on this page.
        </p>

        {/* Section 14: Contact Us */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about this Privacy Policy, your personal information, or would like
          to exercise your privacy rights, please contact us:
        </p>
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong>{' '}
            <a href="mailto:info@tallerthan.com" className="text-primary hover:underline">
              info@tallerthan.com
            </a>
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Contact Form:</strong>{' '}
            <Link href="/contact" className="text-primary hover:underline">
              tallerthan.com/contact
            </Link>
          </p>
          <p className="text-gray-700 mb-0">
            <strong>Subject Line:</strong> Privacy Inquiry
          </p>
        </div>

        <p className="text-gray-700 mb-8">
          We will respond to your inquiry within 30 days. If you have an unresolved privacy concern
          that we have not addressed satisfactorily, you may have the right to lodge a complaint with
          your local data protection authority.
        </p>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Documents</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/terms"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
