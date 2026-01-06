import Link from "next/link";
import type { Metadata } from "next";

const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  title: "About Miles Go Round | Travel Stories & Smart Rewards",
  description: "Learn about Miles Go Round - your guide to meaningful travel experiences and smart strategies for using rewards to explore the world.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About Miles Go Round",
    description: "Your guide to meaningful travel experiences and smart strategies for using rewards to explore the world.",
    url: `${siteUrl}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="mb-8 text-4xl font-bold text-slate-900 sm:text-5xl">About Miles Go Round</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed text-slate-600">
            Miles Go Round is your trusted companion in the world of travel rewards. We help travelers like you unlock the full potential of miles and points to explore the world without breaking the bank.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">Our Mission</h2>
          <p className="text-slate-600">
            We believe that travel should be accessible to everyone. Our mission is to demystify the complex world of travel rewards, credit card points, and airline miles, making it easy for you to earn, maximize, and redeem your points for unforgettable journeys.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">What We Offer</h2>
          <ul className="space-y-3 text-slate-600">
            <li>Comprehensive guides on credit card rewards programs</li>
            <li>Detailed breakdowns of airline and hotel loyalty programs</li>
            <li>Points transfer strategies and conversion tools</li>
            <li>Real travel stories and experiences</li>
            <li>Up-to-date resources and tips for maximizing your rewards</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">Our Approach</h2>
          <p className="text-slate-600">
            We combine practical advice with real-world experiences. Every guide, tip, and recommendation comes from extensive research and personal travel experiences. We're not just about accumulating points—we're about making every mile meaningful.
          </p>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">Get in Touch</h3>
            <p className="mb-4 text-slate-600">
              Have questions or want to share your travel story? We'd love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800"
            >
              Contact Us
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
