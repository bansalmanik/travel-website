import Link from "next/link";

export const metadata = {
  title: "Contact | Miles Go Round",
  description: "Get in touch with Miles Go Round. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="mb-8 text-4xl font-bold text-slate-900 sm:text-5xl">Contact Us</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed text-slate-600">
            We'd love to hear from you! Whether you have questions, feedback, or want to share your travel story, feel free to reach out.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Email</h3>
              <p className="text-slate-600">
                Send us an email and we'll get back to you as soon as possible.
              </p>
              <a href="mailto:hello@milesgoround.com" className="mt-4 inline-block text-sm font-medium text-slate-900 hover:underline">
                hello@milesgoround.com
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                <svg className="h-6 w-6 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Social Media</h3>
              <p className="text-slate-600">
                Follow us on Instagram for daily travel inspiration and tips.
              </p>
              <a href="https://www.instagram.com/milesgoround/" target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium text-slate-900 hover:underline">
                @milesgoround
              </a>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Can I contribute a travel story?</h3>
                <p className="text-slate-600">
                  Yes! We love featuring travel stories from our community. Send us an email with your story idea.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Do you offer personalized travel advice?</h3>
                <p className="text-slate-600">
                  While we provide comprehensive guides and resources, we don't currently offer one-on-one consulting. However, our guides cover most common scenarios.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">How often is your content updated?</h3>
                <p className="text-slate-600">
                  We regularly update our content to reflect the latest changes in loyalty programs, credit card offers, and travel trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
