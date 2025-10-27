export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  heroGradient: string;
  content: string[];
  highlights: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "sunset-safari-in-kenya",
    title: "Chasing Sunsets on a Kenyan Savannah",
    excerpt:
      "Witness the magic of the Maasai Mara with a golden-hour safari adventure that captures the heart of Africa.",
    author: "Amina Patel",
    date: "May 18, 2024",
    readTime: "7 min read",
    category: "Africa",
    heroGradient: "from-amber-200 via-orange-400 to-rose-500",
    content: [
      "Every traveler dreams of a sunset that feels tailor-made, and the Maasai Mara delivers just that. As the sun dips behind the acacia trees, the plains erupt in an amber glow that feels almost surreal.",
      "Our journey began at dawn with a balloon ride over herds of wildebeest, but it was the evening drive that stole our hearts. Guided by local Maasai trackers, we learned how to read the savannah—spotting subtle shifts in the landscape that hinted at wildlife hidden in the tall grass.",
      "If you're planning a sunset safari, pack a light layer and your sense of wonder. The temperature drops quickly after dusk, and you won't want to miss those final moments as the horizon bursts into color.",
    ],
    highlights: [
      "Best time to visit: July to October",
      "Stay at a camp that supports local Maasai communities",
      "Book a balloon safari for a bird's-eye view of the migration",
    ],
  },
  {
    slug: "iceland-ring-road-itinerary",
    title: "A Dreamy 7-Day Road Trip Around Iceland",
    excerpt:
      "An unforgettable loop around the Land of Fire and Ice filled with waterfalls, black sand beaches, and steaming lagoons.",
    author: "Lars Gunnarson",
    date: "April 2, 2024",
    readTime: "9 min read",
    category: "Europe",
    heroGradient: "from-sky-200 via-cyan-400 to-indigo-500",
    content: [
      "There’s a special rhythm to driving Iceland’s Ring Road. One moment you’re tracing volcanic cliffs and the next you’re winding past glassy fjords dotted with tiny fishing towns.",
      "We started in Reykjavik, stocking up on snacks before heading east toward Vik. Highlights along the way included the thundering Skógafoss waterfall and a detour to the Glacier Lagoon, where icebergs drift like diamonds.",
      "Don’t rush. The magic of Iceland is in the pauses—lingering in hot springs, chatting with locals at roadside cafes, and letting the ever-changing skies set the tempo of your trip.",
    ],
    highlights: [
      "Rent a 4x4 for unpredictable weather",
      "Download offline maps—signal can be spotty",
      "Pack layers, even in midsummer",
    ],
  },
  {
    slug: "tokyo-nightlife-guide",
    title: "Neon Nights: Exploring Tokyo After Dark",
    excerpt:
      "Discover hidden izakayas, rooftop gardens, and the electric energy that turns Tokyo into a playground after sunset.",
    author: "Hana Watanabe",
    date: "March 14, 2024",
    readTime: "6 min read",
    category: "Asia",
    heroGradient: "from-fuchsia-200 via-purple-500 to-blue-500",
    content: [
      "Tokyo’s nightlife is a kaleidoscope of neon lights, cozy alleyways, and futuristic lounges. Start in Shinjuku’s Omoide Yokocho where smoky yakitori stalls serve skewers late into the night.",
      "For a change of pace, ride the elevator up to a rooftop garden bar in Roppongi. The skyline views are jaw-dropping, and the cocktails are works of art.",
      "End your night in Shimokitazawa, a neighborhood that hums with live music and secondhand vinyl shops that stay open past midnight.",
    ],
    highlights: [
      "Reserve speakeasy tables in advance",
      "Carry cash for smaller izakayas",
      "Last trains run shortly after midnight",
    ],
  },
];
