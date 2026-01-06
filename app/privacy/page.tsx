import type { Metadata } from "next";

const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Miles Go Round",
  description: "Privacy Policy for Miles Go Round. Learn how we collect, use, and protect your information.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="mb-8 text-4xl font-bold text-slate-900 sm:text-5xl">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">Introduction</h2>
          <p>
            Miles Go Round ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Information We Collect</h2>
          <h3 className="mt-6 text-xl font-semibold text-slate-900">Information You Provide</h3>
          <p>
            We may collect information that you voluntarily provide to us, such as when you contact us via email or interact with our social media channels.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-slate-900">Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information about your device, including:
          </p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our website</li>
            <li>Respond to your inquiries and requests</li>
            <li>Analyze website usage and trends</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Cookies and Tracking Technologies</h2>
          <p>
            We may use cookies and similar tracking technologies to enhance your experience on our website. You can control cookies through your browser settings.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Affiliate Tracking and Third-Party Cookies</h2>
          <p>
            Our website contains affiliate links to credit card issuers, travel companies, and other partners. When you click on these affiliate links, third-party partners may use cookies, pixels, and other tracking technologies to:
          </p>
          <ul>
            <li>Track your activity and purchases</li>
            <li>Attribute referrals to our website</li>
            <li>Process affiliate commissions</li>
            <li>Provide targeted advertising</li>
          </ul>
          <p>
            These third-party partners have their own privacy policies governing the use of your information. We do not control and are not responsible for their tracking practices. We encourage you to review the privacy policies of any third-party sites you visit through our affiliate links.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Third-Party Services</h2>
          <p>
            Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-slate-900">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at info@milesgoround.com.
          </p>
        </div>
      </div>
    </div>
  );
}
