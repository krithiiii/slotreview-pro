import { useRouter, useSearch } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ReviewCard } from "../components/ReviewCard";
import { useGetAllReviews } from "../hooks/useQueries";
import type { SlotReview } from "../hooks/useQueries";

const STATIC_REVIEWS: SlotReview[] = [
  {
    id: 1n,
    title: "Book of Ra Deluxe",
    developer: "Novomatic",
    category: "video" as any,
    description:
      "A timeless Egyptian adventure slot packed with free spins and expanding symbols.",
    overview: "",
    features: "",
    gameplay: "",
    verdict: "",
    rating: 9.2,
    rtp: 95.1,
    volatility: "high" as any,
    minBet: 0.02,
    maxBet: 100,
    pros: [],
    cons: [],
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
      "Zeus reigns supreme in this cascade megaways hit with multipliers that can skyrocket to 500x.",
    overview: "",
    features: "",
    gameplay: "",
    verdict: "",
    rating: 9.5,
    rtp: 96.5,
    volatility: "high" as any,
    minBet: 0.2,
    maxBet: 125,
    pros: [],
    cons: [],
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
      "A colourful candy-themed delight with tumbling reels and multiplier bombs.",
    overview: "",
    features: "",
    gameplay: "",
    verdict: "",
    rating: 9.0,
    rtp: 96.51,
    volatility: "high" as any,
    minBet: 0.2,
    maxBet: 125,
    pros: [],
    cons: [],
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
      "The jewel of NetEnt's catalogue — a dazzling gem-themed classic.",
    overview: "",
    features: "",
    gameplay: "",
    verdict: "",
    rating: 8.8,
    rtp: 96.09,
    volatility: "low" as any,
    minBet: 0.1,
    maxBet: 100,
    pros: [],
    cons: [],
    screenshotUrls: [],
    featuredImageUrl: "/assets/generated/cover-starburst.dim_400x300.jpg",
    isFeatured: false,
    dateAdded: BigInt(Date.now()),
  },
  {
    id: 5n,
    title: "Mega Moolah",
    developer: "Microgaming",
    category: "progressive" as any,
    description:
      "The legendary progressive jackpot slot that has created countless millionaires since 2006.",
    overview: "",
    features: "",
    gameplay: "",
    verdict: "",
    rating: 8.5,
    rtp: 88.12,
    volatility: "medium" as any,
    minBet: 0.25,
    maxBet: 6.25,
    pros: [],
    cons: [],
    screenshotUrls: [],
    featuredImageUrl: "",
    isFeatured: false,
    dateAdded: BigInt(Date.now()),
  },
  {
    id: 6n,
    title: "Gonzo's Quest Megaways",
    developer: "NetEnt / Red Tiger",
    category: "megaways" as any,
    description:
      "The iconic explorer returns in Megaways format with avalanche reels and up to 117,649 ways to win.",
    overview: "",
    features: "",
    gameplay: "",
    verdict: "",
    rating: 9.1,
    rtp: 96.0,
    volatility: "high" as any,
    minBet: 0.2,
    maxBet: 4,
    pros: [],
    cons: [],
    screenshotUrls: [],
    featuredImageUrl: "",
    isFeatured: false,
    dateAdded: BigInt(Date.now()),
  },
];

const CATEGORIES = [
  "all",
  "video",
  "megaways",
  "classic",
  "progressive",
] as const;
const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "rtp", label: "Best RTP" },
  { value: "latest", label: "Latest" },
];

export function ReviewsPage() {
  const searchParams = useSearch({ strict: false }) as {
    q?: string;
    sort?: string;
  };
  const router = useRouter();
  const { data: backendData, isLoading } = useGetAllReviews();

  const allReviews =
    backendData && backendData.length > 0 ? backendData : STATIC_REVIEWS;

  const [localSearch, setLocalSearch] = useState(searchParams.q || "");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState(searchParams.sort || "rating");

  useEffect(() => {
    setLocalSearch(searchParams.q || "");
  }, [searchParams.q]);

  const filtered = useMemo(() => {
    let list = [...allReviews];
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.developer.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q),
      );
    }
    if (activeCategory !== "all") {
      list = list.filter((r) => r.category === activeCategory);
    }
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "rtp") list.sort((a, b) => b.rtp - a.rtp);
    else list.sort((a, b) => Number(b.dateAdded) - Number(a.dateAdded));
    return list;
  }, [allReviews, localSearch, activeCategory, sortBy]);

  return (
    <main className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Browse
          </span>
          <h1 className="text-3xl font-extrabold uppercase tracking-wide text-foreground mt-1">
            All Reviews
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {filtered.length} review{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search games or developers…"
              data-ocid="reviews.search_input"
              className="w-full bg-navy-card border border-navy-border text-sm text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch("");
                  router.navigate({
                    to: "/reviews",
                    search: { q: undefined, sort: undefined },
                  });
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              data-ocid="reviews.select"
              className="bg-navy-card border border-navy-border text-sm text-foreground rounded-xl px-3 py-2.5 focus:outline-none focus:border-gold/50 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              data-ocid="reviews.tab"
              className={`text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? "bg-gold text-[oklch(0.20_0.03_242)] border-gold"
                  : "border-navy-border text-muted-foreground hover:border-gold/40 hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div
            data-ocid="reviews.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={`skeleton-${i}`}
                className="rounded-xl border border-navy-border bg-navy-card overflow-hidden"
              >
                <div className="aspect-[4/3] bg-navy-light animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-navy-light rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-navy-light rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div data-ocid="reviews.empty_state" className="text-center py-20">
            <p className="text-muted-foreground text-lg">No reviews found.</p>
            <button
              type="button"
              onClick={() => {
                setLocalSearch("");
                setActiveCategory("all");
              }}
              data-ocid="reviews.secondary_button"
              className="mt-4 text-sm text-gold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.06 } },
              hidden: {},
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((review, i) => (
              <motion.div
                key={review.id.toString()}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <ReviewCard review={review} index={i} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
