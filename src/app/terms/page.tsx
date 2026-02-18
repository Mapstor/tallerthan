import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Use | TallerThan',
  description:
    'Read the Terms of Use for TallerThan, the celebrity height comparison tool. Understand your rights and responsibilities when using our service.',
};

export default function TermsPage() {
  const lastUpdated = 'February 18, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Use</h1>
      <p className="text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

      <div className="prose prose-lg max-w-none">
        {/* Introduction */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <p className="text-gray-700 mb-0">
            Welcome to TallerThan. These Terms of Use (&quot;Terms&quot;) govern your access to and use of
            the TallerThan website, located at tallerthan.com (the &quot;Service&quot;). Please read these
            Terms carefully before using our Service. By accessing or using TallerThan, you agree
            to be bound by these Terms. If you do not agree to these Terms, please do not use our Service.
          </p>
        </div>

        {/* Section 1: Acceptance of Terms */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-700 mb-4">
          By accessing and using TallerThan, you acknowledge that you have read, understood, and agree
          to be bound by these Terms of Use and our Privacy Policy. These Terms constitute a legally
          binding agreement between you and TallerThan.
        </p>
        <p className="text-gray-700 mb-4">
          We reserve the right to modify these Terms at any time. We will notify users of any material
          changes by updating the &quot;Last Updated&quot; date at the top of this page. Your continued use of
          the Service after any such changes constitutes your acceptance of the new Terms.
        </p>
        <p className="text-gray-700 mb-8">
          If you are using the Service on behalf of an organization, you are agreeing to these Terms
          for that organization and representing that you have the authority to bind that organization
          to these Terms.
        </p>

        {/* Section 2: Description of Service */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
        <p className="text-gray-700 mb-4">
          TallerThan is a free, web-based educational entertainment platform that provides:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className="text-gray-700">
            Interactive height comparison tools allowing users to compare their height to celebrities
          </li>
          <li className="text-gray-700">
            Celebrity-to-celebrity height comparison features
          </li>
          <li className="text-gray-700">
            Detailed celebrity profiles with height information, measurements, and related data
          </li>
          <li className="text-gray-700">
            Height group pages listing celebrities of similar heights
          </li>
          <li className="text-gray-700">
            Social sharing functionality for comparison results
          </li>
          <li className="text-gray-700">
            Educational content about height statistics, measurements, and related topics
          </li>
        </ul>
        <p className="text-gray-700 mb-8">
          The Service is provided &quot;as is&quot; and is intended for entertainment and educational purposes
          only. We make no guarantees about the continuous availability of the Service and reserve the
          right to modify, suspend, or discontinue any aspect of the Service at any time.
        </p>

        {/* Section 3: User Eligibility */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Eligibility</h2>
        <p className="text-gray-700 mb-4">
          The Service is intended for users of all ages. However, if you are under the age of 13 (or
          the applicable age of digital consent in your jurisdiction), you should only use the Service
          with the involvement and consent of a parent or legal guardian.
        </p>
        <p className="text-gray-700 mb-8">
          By using the Service, you represent and warrant that you have the right, authority, and
          capacity to enter into these Terms and to abide by all of the terms and conditions set
          forth herein.
        </p>

        {/* Section 4: User Conduct */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Conduct</h2>
        <p className="text-gray-700 mb-4">
          When using TallerThan, you agree to:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className="text-gray-700">
            Use the Service only for lawful purposes and in accordance with these Terms
          </li>
          <li className="text-gray-700">
            Not use the Service in any way that could damage, disable, overburden, or impair the Service
          </li>
          <li className="text-gray-700">
            Not attempt to gain unauthorized access to any part of the Service, other accounts, or
            computer systems or networks connected to the Service
          </li>
          <li className="text-gray-700">
            Not use any automated means (including bots, scrapers, or spiders) to access the Service
            or collect content from the Service without our express written permission
          </li>
          <li className="text-gray-700">
            Not interfere with or disrupt the Service or servers or networks connected to the Service
          </li>
          <li className="text-gray-700">
            Not use the Service to transmit any viruses, malware, or other malicious code
          </li>
          <li className="text-gray-700">
            Not attempt to reverse engineer, decompile, or disassemble any software contained in the Service
          </li>
        </ul>
        <p className="text-gray-700 mb-8">
          We reserve the right to terminate or restrict your access to the Service for any violation
          of these Terms or for any other reason at our sole discretion.
        </p>

        {/* Section 5: Intellectual Property */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
        <p className="text-gray-700 mb-4">
          The Service and its original content, features, and functionality are owned by TallerThan
          and are protected by international copyright, trademark, patent, trade secret, and other
          intellectual property or proprietary rights laws.
        </p>
        <p className="text-gray-700 mb-4">
          You may not copy, modify, distribute, sell, or lease any part of our Service, nor may you
          reverse engineer or attempt to extract the source code of our software, unless laws prohibit
          these restrictions or you have our written permission.
        </p>
        <p className="text-gray-700 mb-4">
          The TallerThan name, logo, and all related names, logos, product and service names, designs,
          and slogans are trademarks of TallerThan. You may not use such marks without our prior
          written permission.
        </p>
        <p className="text-gray-700 mb-8">
          Celebrity images displayed on the Service are used under fair use principles for educational
          and informational purposes. All celebrity images remain the property of their respective
          copyright holders.
        </p>

        {/* Section 6: Disclaimer of Warranties */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <p className="text-gray-700 mb-4">
            THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY WARRANTIES
            OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES
            OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF
            PERFORMANCE.
          </p>
          <p className="text-gray-700 mb-4">
            BODYSCALE DOES NOT WARRANT THAT:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">
              The Service will function uninterrupted, secure, or available at any particular time or location
            </li>
            <li className="text-gray-700">
              Any errors or defects will be corrected
            </li>
            <li className="text-gray-700">
              The Service is free of viruses or other harmful components
            </li>
            <li className="text-gray-700">
              The results of using the Service will meet your requirements
            </li>
          </ul>
          <p className="text-gray-700 mb-0">
            Height information provided through the Service is for entertainment and educational
            purposes only. While we strive for accuracy, we make no guarantees about the accuracy,
            completeness, or reliability of any height measurements or celebrity information
            displayed on the Service.
          </p>
        </div>

        {/* Section 7: Limitation of Liability */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL BODYSCALE, ITS
          DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT
          LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className="text-gray-700">
            Your access to or use of or inability to access or use the Service
          </li>
          <li className="text-gray-700">
            Any conduct or content of any third party on the Service
          </li>
          <li className="text-gray-700">
            Any content obtained from the Service
          </li>
          <li className="text-gray-700">
            Unauthorized access, use, or alteration of your transmissions or content
          </li>
        </ul>
        <p className="text-gray-700 mb-8">
          In no event shall our total liability to you for all claims arising from or relating to
          the Service exceed the amount you paid us, if any, to use the Service during the twelve (12)
          months prior to the claim.
        </p>

        {/* Section 8: Indemnification */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
        <p className="text-gray-700 mb-8">
          You agree to defend, indemnify, and hold harmless TallerThan and its officers, directors,
          employees, contractors, agents, licensors, suppliers, successors, and assigns from and
          against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or
          fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation
          of these Terms or your use of the Service.
        </p>

        {/* Section 9: Third-Party Links */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Links and Content</h2>
        <p className="text-gray-700 mb-4">
          The Service may contain links to third-party websites or services that are not owned or
          controlled by TallerThan. We have no control over, and assume no responsibility for, the
          content, privacy policies, or practices of any third-party websites or services.
        </p>
        <p className="text-gray-700 mb-8">
          You acknowledge and agree that TallerThan shall not be responsible or liable, directly or
          indirectly, for any damage or loss caused or alleged to be caused by or in connection with
          the use of or reliance on any such content, goods, or services available on or through any
          such websites or services.
        </p>

        {/* Section 10: Governing Law */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law and Dispute Resolution</h2>
        <p className="text-gray-700 mb-4">
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction
          in which TallerThan operates, without regard to its conflict of law provisions.
        </p>
        <p className="text-gray-700 mb-4">
          Any dispute arising from or relating to the subject matter of these Terms shall be finally
          settled by arbitration, using the English language, in accordance with the applicable
          arbitration rules of the jurisdiction.
        </p>
        <p className="text-gray-700 mb-8">
          Notwithstanding the foregoing, either party may seek injunctive or other equitable relief
          in any court of competent jurisdiction to prevent the actual or threatened infringement,
          misappropriation, or violation of a party&apos;s copyrights, trademarks, trade secrets, patents,
          or other intellectual property rights.
        </p>

        {/* Section 11: Severability */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Severability</h2>
        <p className="text-gray-700 mb-8">
          If any provision of these Terms is held to be unenforceable or invalid, such provision will
          be changed and interpreted to accomplish the objectives of such provision to the greatest
          extent possible under applicable law, and the remaining provisions will continue in full
          force and effect.
        </p>

        {/* Section 12: Waiver */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Waiver</h2>
        <p className="text-gray-700 mb-8">
          The failure of TallerThan to enforce any right or provision of these Terms will not be
          considered a waiver of those rights. The waiver of any such right or provision will be
          effective only if in writing and signed by a duly authorized representative of TallerThan.
        </p>

        {/* Section 13: Entire Agreement */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Entire Agreement</h2>
        <p className="text-gray-700 mb-8">
          These Terms, together with our Privacy Policy, constitute the entire agreement between you
          and TallerThan regarding your use of the Service and supersede all prior and contemporaneous
          written or oral agreements between you and TallerThan.
        </p>

        {/* Section 14: Changes to Terms */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to Terms</h2>
        <p className="text-gray-700 mb-8">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
          If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new
          terms taking effect. What constitutes a material change will be determined at our sole
          discretion. By continuing to access or use our Service after those revisions become effective,
          you agree to be bound by the revised Terms.
        </p>

        {/* Section 15: Contact Information */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about these Terms, please contact us:
        </p>
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong>{' '}
            <a href="mailto:info@tallerthan.com" className="text-primary hover:underline">
              info@tallerthan.com
            </a>
          </p>
          <p className="text-gray-700 mb-0">
            <strong>Contact Form:</strong>{' '}
            <Link href="/contact" className="text-primary hover:underline">
              tallerthan.com/contact
            </Link>
          </p>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Documents</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/privacy"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Privacy Policy
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
