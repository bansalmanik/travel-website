import Image from "next/image";

const featuredDestinations = [
  {
    name: "Santorini, Greece",
    description: "Whitewashed villages, azure domes, and sunsets that paint the Aegean in gold.",
    region: "Mediterranean Escapes",
    imageUrl:
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1100&q=80",
  },
  {
    name: "Kyoto, Japan",
    description: "Silent bamboo forests and ancient temples woven into the rhythms of modern Japan.",
    region: "Cultural Immersions",
    imageUrl:
      "https://images.unsplash.com/photo-1494475673543-6a6a27143b22?auto=format&fit=crop&w=1100&q=80",
  },
  {
    name: "Patagonia, Chile",
    description: "Jagged peaks, turquoise glaciers, and the call of the untamed wild.",
    region: "Epic Adventures",
    imageUrl:
      "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1100&q=80",
  },
];

const travelStyles = [
  {
    title: "Tailored Journeys",
    description:
      "Work with our travel artists to weave itineraries that balance must-see icons with hidden gems.",
    icon: "🗺️",
  },
  {
    title: "Immersive Stays",
    description:
      "Handpicked villas, boutique hotels, and eco-retreats that celebrate local craftsmanship.",
    icon: "🏡",
  },
  {
    title: "Seamless Support",
    description:
      "From the moment you dream to the day you return, our concierge team is with you 24/7.",
    icon: "🤝",
  },
];

const testimonials = [
  {
    quote:
      "Every detail was flawless. We kayaked beneath glaciers at dawn and dined with a local family that evening.",
    traveler: "Amelia & Noah",
    trip: "10-day Patagonia Expedition",
  },
  {
    quote:
      "They understood our need for balance—quiet mornings in Kyoto followed by guided street-food adventures at night.",
    traveler: "Priya & Daniel",
    trip: "Cultural Japan Escape",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1600&q=80"
            alt="A pair of travelers watching the sunrise over mountain peaks"
            fill
            className="object-cover brightness-75"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-sky-900/60 to-slate-900/40" />
        </div>
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-white">
          <span className="text-xl font-semibold tracking-wide">GlobeTrek Journeys</span>
          <div className="hidden gap-8 text-sm uppercase tracking-[0.2em] md:flex">
            <a className="transition-opacity hover:opacity-80" href="#destinations">
              Destinations
            </a>
            <a className="transition-opacity hover:opacity-80" href="#experiences">
              Experiences
            </a>
            <a className="transition-opacity hover:opacity-80" href="#stories">
              Stories
            </a>
          </div>
          <a
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-900 transition hover:bg-sky-100"
            href="#plan"
          >
            Plan a Trip
          </a>
        </nav>
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-12 text-white sm:pb-32 sm:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-100">
            Tailor-made escapes across the globe
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            Craft unforgettable journeys that honor your curiosity and pace.
          </h1>
          <p className="mt-6 text-lg text-sky-100/90 sm:text-xl">
            Our travel architects curate immersive itineraries that weave iconic sights with whispered secrets.
            Wherever you wander, every moment is meticulously crafted for wonder.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-sky-300"
              href="#destinations"
            >
              Explore Adventures
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white hover:text-white"
              href="#stories"
            >
              View Travel Stories
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-24 px-6 py-16 sm:py-24">
        <section id="destinations" className="space-y-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-500">
                Featured Destinations
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Handpicked escapes designed for wonder
              </h2>
            </div>
            <p className="max-w-xl text-base text-slate-600">
              Browse immersive journeys tailored to every type of traveler. Discover vibrant cities, secluded islands,
              and soul-stirring landscapes crafted for effortless exploration.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredDestinations.map((destination) => (
              <article
                key={destination.name}
                className="group overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={destination.imageUrl}
                    alt={destination.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="space-y-3 px-6 py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
                    {destination.region}
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900">{destination.name}</h3>
                  <p className="text-sm leading-6 text-slate-600">{destination.description}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-sky-600">
                    View sample itinerary
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
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experiences" className="space-y-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-500">Travel Philosophy</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                The GlobeTrek signature experience
              </h2>
            </div>
            <p className="max-w-xl text-base text-slate-600">
              We pair meticulous planning with local expertise to craft journeys filled with meaning. Explore how we bring
              your travel dreams to life.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {travelStyles.map((style) => (
              <div
                key={style.title}
                className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-4xl">{style.icon}</span>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{style.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{style.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="stories" className="grid gap-12 rounded-3xl bg-slate-900 px-8 py-12 text-white md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-300">Traveler Stories</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Moments that stay with you long after you return home</h2>
            <p className="text-base text-slate-200">
              Hear from explorers who trusted us to bring their travel dreams to life. From glaciers to lantern-lit alleys,
              every detail was thoughtfully curated for them—and will be for you.
            </p>
            <a
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-slate-100"
              href="#plan"
            >
              Start Your Story
            </a>
          </div>
          <div className="space-y-8">
            {testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.traveler}
                className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur"
              >
                <p className="text-base leading-7 text-slate-100">“{testimonial.quote}”</p>
                <footer className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
                  {testimonial.traveler} · {testimonial.trip}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="plan" className="overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 px-8 py-16 text-slate-900">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-800/80">
                Plan with confidence
              </p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Ready for your next escape?</h2>
              <p className="text-base text-slate-900/80">
                Tell us about your dream journey and our travel architects will craft a bespoke itinerary within 48 hours.
                You choose the pace—we handle the rest.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-3xl bg-white/80 p-6 shadow-xl md:min-w-[280px]">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Complimentary consultation</span>
              <a
                className="flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-sky-400"
                href="mailto:hello@globetrek.com"
              >
                Schedule a Call
              </a>
              <a className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-sky-700" href="tel:+18005551234">
                Or call +1 (800) 555-1234
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/70 py-10 text-sm text-slate-600">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GlobeTrek Journeys. Crafted with curiosity worldwide.</p>
          <div className="flex gap-6">
            <a className="transition hover:text-slate-900" href="#destinations">
              Destinations
            </a>
            <a className="transition hover:text-slate-900" href="#experiences">
              Experiences
            </a>
            <a className="transition hover:text-slate-900" href="#plan">
              Plan a Trip
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
