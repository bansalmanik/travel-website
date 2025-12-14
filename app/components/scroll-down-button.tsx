"use client";

export default function ScrollDownButton() {
  const handleScroll = () => {
    document.getElementById('story-content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScroll}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-white/80 transition hover:text-white"
      aria-label="Scroll to content"
    >
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  );
}
