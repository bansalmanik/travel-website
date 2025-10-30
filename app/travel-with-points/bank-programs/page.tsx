import type { Metadata } from "next";
import Link from "next/link";

const pageTitle = "Bank Programs | Miles Go Round";
const pageDescription =
  "Compare the leading bank travel portals and redemption tools to decide where to earn and redeem your points.";

const bankPrograms = [
  {
    name: "Axis Travel Edge",
    href: "/travel-with-points/bank-programs/axis-travel-edge",
    blurb: "Preview the upcoming guide to maximizing the Axis Bank Travel Edge portal and transfer offers.",
  },
  {
    name: "HDFC SmartBuy",
    href: "/travel-with-points/bank-programs/hdfc-smartbuy",
    blurb: "See how we plan to stack SmartBuy bonuses, flash deals, and transfer partners for outsized value.",
  },
  {
    name: "HSBC Market Place",
    href: "/travel-with-points/bank-programs/hsbc-market-place",
    blurb: "Track the evolving HSBC Market Place offers and learn where to deploy your points once content launches.",
  },
  {
    name: "ICICI IShop",
    href: "/travel-with-points/bank-programs/icici-ishop",
    blurb: "Get ready for best practices on pairing ICICI IShop deals with partner transfers and cashback promos.",
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/travel-with-points/bank-programs",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "https://example.com/travel-with-points/bank-programs",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function BankProgramsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-24 text-center lg:py-32">
        <span className="inline-flex items-center self-center rounded-full border border-rose-200/40 bg-rose-100/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-rose-200">
          Bank Programs
        </span>
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold sm:text-5xl">Bank Programs</h1>
          <p className="text-base leading-7 text-slate-200/80">
            These bank-specific hubs are getting a refresh. Explore what&apos;s coming soon and choose which program you
            want us to cover first.
          </p>
        </div>
        <div className="grid gap-6 text-left sm:grid-cols-2">
          {bankPrograms.map((program) => (
            <Link
              key={program.name}
              href={program.href}
              className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
            >
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">{program.name}</h2>
                <p className="text-sm leading-6 text-slate-100/80">{program.blurb}</p>
              </div>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-amber-300">
                Coming soon
                <svg
                  aria-hidden
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
        <Link href="/travel-with-points" className="inline-flex items-center self-center text-sm font-semibold text-amber-300">
          <svg
            aria-hidden
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5" />
            <path d="m12 5-7 7 7 7" />
          </svg>
          Back to travel with points
        </Link>
      </div>
    </main>
  );
}
