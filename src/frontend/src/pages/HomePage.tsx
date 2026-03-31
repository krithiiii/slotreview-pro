import { useRouter } from "@tanstack/react-router";
import { ArrowRight, Award, BarChart3, Search, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ReviewCard } from "../components/ReviewCard";
import { useGetAllReviews, useGetFeaturedReviews } from "../hooks/useQueries";
import type { SlotReview } from "../hooks/useQueries";

const STATIC_REVIEWS: SlotReview[] = [
  {
    id: 1n,
    title: "Book of Ra Deluxe",
    developer: "Novomatic",
    category: "video" as any,
    description:
      "A timeless Egyptian adventure slot packed with free spins and expanding symbols. One of the most-played video slots in European casinos.",
    overview: "Book of Ra Deluxe is a classic 5-reel Egyptian-themed slot.",
    features: "Free spins with expanding symbols, gamble feature, autoplay.",
    gameplay: "Spin to match pharaohs, scarabs and the Book of Ra symbol.",
    verdict: "An absolute classic that holds up brilliantly even today.",
    rating: 9.2,
    rtp: 95.1,
    volatility: "high" as any,
    minBet: 0.02,
    maxBet: 100,
    pros: ["Iconic expanding symbol mechanic", "High RTP at 95.1%"],
    cons: ["Dated graphics compared to modern slots"],
    screenshotUrls: [],
    featuredImageUrl: "/assets/generated/cover-book-of-ra.dim_400x300.jpg",
    isFeatured: true,
    dateAdded: BigInt(Date.now()),
  },
  {
    id: 2n,
    title: "Gates of Olympus",
    developer: "Pragmatic Play",
    category: "video" as any,
    description:
      "Zeus reigns supreme in this cascade megaways hit with multipliers that can skyrocket to 500x. A modern favourite with massive win potential.",
    overview:
      "Gates of Olympus is a 6-reel Cluster Pays slot by Pragmatic Play.",
    features: "Tumble mechanic, multipliers up to 500x, free spins bonus.",
    gameplay: "Clusters of 8+ matching symbols award wins on every tumble.",
    verdict: "One of the best high-volatility slots available today.",
    rating: 9.5,
    rtp: 96.5,
    volatility: "high" as any,
    minBet: 0.2,
    maxBet: 125,
    pros: ["Huge win multipliers", "Engaging tumble mechanic"],
    cons: ["Very high volatility"],
    screenshotUrls: [],
    featuredImageUrl:
      "/assets/generated/cover-gates-of-olympus.dim_400x300.jpg",
    isFeatured: true,
    dateAdded: BigInt(Date.now()),
  },
  {
    id: 3n,
    title: "Sweet Bonanza",
    developer: "Pragmatic Play",
    category: "video" as any,
    description:
      "A colourful candy-themed delight with tumbling reels and multiplier bombs. Deceptively sweet with explosive bonus potential.",
    overview: "Sweet Bonanza is a 6x5 cluster pays slot with a candy theme.",
    features: "Tumble mechanic, scatter symbols, multiplier bombs up to 100x.",
    gameplay: "Collect 8+ matching sweets or fruits to trigger wins.",
    verdict: "A joyful and highly rewarding slot with serious win potential.",
    rating: 9.0,
    rtp: 96.51,
    volatility: "high" as any,
    minBet: 0.2,
    maxBet: 125,
    pros: ["Fun and colorful theme", "Up to 100x multiplier bombs"],
    cons: ["Bonus can feel elusive"],
    screenshotUrls: [],
    featuredImageUrl: "/assets/generated/cover-sweet-bonanza.dim_400x300.jpg",
    isFeatured: true,
    dateAdded: BigInt(Date.now()),
  },
  {
    id: 4n,
    title: "Starburst",
    developer: "NetEnt",
    category: "classic" as any,
    description:
      "The jewel of NetEnt's catalogue — a dazzling gem-themed classic that launched a thousand slot careers.",
    overview: "Starburst is a 5-reel, 10-payline video slot with cosmic gems.",
    features: "Expanding wilds, re-spins, both-ways pays.",
    gameplay: "Match colourful gems and wilds expand to trigger re-spins.",
    verdict: "A true icon. Approachable for beginners, loved by veterans.",
    rating: 8.8,
    rtp: 96.09,
    volatility: "low" as any,
    minBet: 0.1,
    maxBet: 100,
    pros: ["Beginner-friendly low volatility", "Expanding wilds"],
    cons: ["Limited bonus features"],
    screenshotUrls: [],
    featuredImageUrl: "/assets/generated/cover-starburst.dim_400x300.jpg",
    isFeatured: true,
    dateAdded: BigInt(Date.now()),
  },
];

const TRUST_ITEMS = [
  {
    icon: ShieldIcon,
    title: "Independent & Unbiased",
    desc: "We accept no money from game developers or casinos. Every review is written by a player, for players.",
  },
  {
    icon: BarChart3,
    title: "Real RTP & Volatility Data",
    desc: "We publish verified RTP percentages and volatility ratings so you know exactly what you're getting into.",
  },
  {
    icon: Award,
    title: "Rigorous Testing Process",
    desc: "Every game is played through thousands of spins before we write a single word of our review.",
  },
];

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: featuredData, isLoading } = useGetFeaturedReviews();
  const { data: allData } = useGetAllReviews();

  const featured =
    featuredData && featuredData.length > 0
      ? featuredData
      : allData && allData.length > 0
        ? allData.slice(0, 4)
        : STATIC_REVIEWS;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.navigate({
        to: "/reviews",
        search: { q: searchQuery.trim(), sort: undefined },
      });
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, oklch(0.68 0.14 225), transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, oklch(0.87 0.12 87), transparent 70%)",
            }}
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-gold mb-4">
                Honest Slot Reviews
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold uppercase leading-tight text-foreground mb-5">
                Know Before
                <br />
                <span className="text-gold">You Spin</span>
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed max-w-md mb-8">
                In-depth, unbiased reviews of the world's most popular slot
                games. RTP data, volatility analysis, pros &amp; cons —
                everything you need to play smarter.
              </p>

              {/* Search */}
              <form onSubmit={handleSearch} className="flex gap-0 max-w-md">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search slot games…"
                    data-ocid="home.search_input"
                    className="w-full bg-navy-card border border-navy-border border-r-0 text-sm text-foreground placeholder:text-muted-foreground rounded-l-xl pl-10 pr-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  data-ocid="home.primary_button"
                  className="bg-gold hover:bg-gold-light text-[oklch(0.20_0.03_242)] font-bold text-sm px-5 rounded-r-xl transition-colors shrink-0"
                >
                  Search
                </button>
              </form>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mt-8">
                {[
                  { icon: Award, value: "200+", label: "Games Reviewed" },
                  { icon: BarChart3, value: "96%", label: "Avg RTP Tracked" },
                  { icon: Zap, value: "100%", label: "Independent" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={16} className="text-gold" />
                    <span className="font-bold text-foreground text-sm">
                      {value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="hidden lg:flex justify-center relative"
            >
              <div className="relative rounded-2xl overflow-hidden neon-blue-glow">
                <img
                  src="/assets/generated/hero-slot-machine.dim_700x600.png"
                  alt="Slot machine illustration"
                  className="w-full max-w-lg rounded-2xl"
                />
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.12 0.025 242) 0%, transparent 40%)",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="section-gradient py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Editor's Picks
            </span>
            <h2 className="text-2xl font-bold uppercase tracking-wide text-foreground mt-2">
              Featured Reviews
            </h2>
          </div>

          {isLoading ? (
            <div
              data-ocid="reviews.loading_state"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={`skeleton-${i}`}
                  className="rounded-xl border border-navy-border bg-navy-card overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-navy-light animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-3/4 bg-navy-light rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-navy-light rounded animate-pulse" />
                    <div className="h-3 w-full bg-navy-light rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {},
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {featured.slice(0, 4).map((review, i) => (
                <motion.div
                  key={review.id.toString()}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <ReviewCard review={review} index={i} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() =>
                router.navigate({
                  to: "/reviews",
                  search: { q: undefined, sort: undefined },
                })
              }
              data-ocid="home.secondary_button"
              className="flex items-center gap-2 border border-gold/50 text-gold hover:bg-gold/10 font-semibold text-sm uppercase tracking-widest px-8 py-3 rounded-xl transition-colors"
            >
              Browse All Reviews
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-foreground">
            Why Trust Our Reviews?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-navy-border bg-navy-card p-6 flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Icon size={18} className="text-gold" />
              </div>
              <h3 className="font-bold uppercase tracking-wide text-sm text-foreground">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function ShieldIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <title>Shield</title>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
