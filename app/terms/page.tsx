import type { Metadata } from "next";

const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  title: "Terms and Conditions | Miles Go Round",
  description: "Terms and Conditions for Miles Go Round. Read our terms of service and usage policies.",
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="mb-8 text-4xl font-bold text-slate-900 sm:text-5xl">Terms and Conditions</h1>
        
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">Agreement to Terms</h2>
          <p>
            By accessing and using Miles Go Round, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use our website.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Use of Website</h2>
          <p>
            Miles Go Round provides information and resources related to travel rewards, credit cards, airline miles, and hotel points. The content is for informational purposes only.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-slate-900">Permitted Use</h3>
          <p>You may use our website for:</p>
          <ul>
            <li>Personal, non-commercial purposes</li>
            <li>Reading and learning about travel rewards</li>
            <li>Accessing guides and resources</li>
          </ul>

          <h3 className="mt-6 text-xl font-semibold text-slate-900">Prohibited Use</h3>
          <p>You may not:</p>
          <ul>
            <li>Copy, reproduce, or distribute our content without permission</li>
            <li>Use automated systems to access or scrape our website</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use our website for any illegal or unauthorized purpose</li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Disclaimer</h2>
          <p>
            The information provided on Miles Go Round is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind about the completeness, accuracy, or reliability of the information.
          </p>
          <p>
            Credit card offers, loyalty program terms, and travel rewards are subject to change without notice. Always verify current terms and conditions with the respective financial institutions or loyalty programs.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Not Financial or Professional Advice</h2>
          <p>
            <strong>Important:</strong> The content on Miles Go Round is for informational and educational purposes only and does not constitute financial, legal, tax, or professional advice. We are not financial advisors, and nothing on this website should be construed as personalized financial advice or recommendations.
          </p>
          <p>
            You should not rely solely on the information provided on this website when making financial decisions. Before applying for credit cards, making travel bookings, or making any financial decisions:
          </p>
          <ul>
            <li>Consult with qualified financial, legal, or tax professionals</li>
            <li>Review all terms and conditions directly with financial institutions</li>
            <li>Consider your personal financial situation and goals</li>
            <li>Understand that credit card approvals and offers are not guaranteed</li>
          </ul>
          <p>
            <strong>Credit Card Approvals:</strong> Credit card approvals are subject to the issuer's review of your credit history, income, and other factors. We cannot guarantee approval for any credit card or financial product. Terms, rates, fees, and rewards are determined by the issuing financial institution and may vary based on your creditworthiness.
          </p>
          <p>
            Any actions you take based on information from this website are at your own risk. We are not liable for any financial losses, damages, or consequences resulting from your use of this information.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Affiliate Relationships</h2>
          <p>
            Miles Go Round may contain affiliate links. If you click on these links and make a purchase or sign up for a service, we may receive a commission at no additional cost to you. This helps support our website and allows us to continue providing valuable content.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Intellectual Property</h2>
          <p>
            All content on Miles Go Round, including text, graphics, logos, and images, is the property of Miles Go Round or its content suppliers and is protected by copyright and intellectual property laws.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Limitation of Liability</h2>
          <p>
            Miles Go Round and its owners shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the website or reliance on the information provided.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">External Links</h2>
          <p>
            Our website may contain links to external websites. We are not responsible for the content, accuracy, or practices of these third-party sites.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the modified terms.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at info@milesgoround.com.
          </p>
        </div>
      </div>
    </div>
  );
}
