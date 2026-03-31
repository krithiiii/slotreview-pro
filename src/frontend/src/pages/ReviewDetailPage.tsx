import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { ProsConsBlock } from "../components/ProsConsBlock";
import { StarRating } from "../components/StarRating";
import { useGetReviewById } from "../hooks/useQueries";
import type { SlotReview } from "../hooks/useQueries";

const STATIC_DETAIL: SlotReview = {
  id: 2n,
  title: "Gates of Olympus",
  developer: "Pragmatic Play",
  category: "video" as any,
  description:
    "Zeus reigns supreme in this cascade megaways hit with multipliers that can skyrocket to 500x.",
  overview:
    "Gates of Olympus is a 6-reel Cluster Pays slot developed by Pragmatic Play. Released in 2021, it quickly became one of the most streamed and played online slots worldwide. The game features a divine Greek mythology theme with stunning visuals and a thunderous soundtrack.",
  features:
    "The game's standout features include a powerful Tumble mechanic where winning symbols are removed and new ones fall in their place. Multipliers from 2x to 500x can randomly appear on the reels during any spin. Landing 4+ Scatter symbols triggers the Free Spins bonus with guaranteed multipliers.",
  gameplay:
    "Gameplay centers on the Cluster Pays system — you need 8 or more matching symbols adjacent to each other to form a win. The Tumble mechanic means a single spin can chain multiple wins together as new symbols fill the board. The Buy Feature option lets you directly purchase the bonus round for 100x your bet.",
  verdict:
    "Gates of Olympus is arguably Pragmatic Play's finest hour. The combination of multiplier mechanics, tumble wins and the sheer spectacle of the bonus round places it in the elite tier of modern video slots. High volatility means you need patience, but when it pays — it pays big. Essential for any serious slot player.",
  rating: 9.5,
  rtp: 96.5,
  volatility: "high" as any,
  minBet: 0.2,
  maxBet: 125,
  pros: [
    "Multipliers up to 500x during free spins",
    "Cluster Pays with Tumble mechanic",
    "High-quality visuals and animations",
    "Buy Feature available in most regions",
    "Regular bonus frequency",
  ],
  cons: [
    "Very high volatility — not for small bankrolls",
    "Base game wins can feel scarce",
    "Buy Feature is expensive at 100x stake",
  ],
  screenshotUrls: [
    "/assets/generated/cover-gates-of-olympus.dim_400x300.jpg",
    "/assets/generated/cover-book-of-ra.dim_400x300.jpg",
    "/assets/generated/cover-sweet-bonanza.dim_400x300.jpg",
  ],
  featuredImageUrl: "/assets/generated/cover-gates-of-olympus.dim_400x300.jpg",
  isFeatured: true,
  dateAdded: BigInt(Date.now()),
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-navy-border last:border-0">
      <span className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

export function ReviewDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const numericId = useMemo(() => {
    try {
      return BigInt(id);
    } catch {
      return null;
    }
  }, [id]);

  const { data: backendReview, isLoading } = useGetReviewById(numericId);
  const review = backendReview ?? STATIC_DETAIL;

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div data-ocid="review.loading_state" className="space-y-4">
          <div className="h-8 w-1/3 bg-navy-card rounded animate-pulse" />
          <div className="h-64 w-full bg-navy-card rounded-xl animate-pulse" />
          <div className="h-4 w-full bg-navy-card rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-navy-card rounded animate-pulse" />
        </div>
      </main>
    );
  }

  if (!review) {
    return (
      <main
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="review.error_state"
      >
        <h2 className="text-xl font-bold text-foreground">Review not found.</h2>
        <Link
          to="/reviews"
          className="text-gold text-sm mt-4 inline-block hover:underline"
          search={{ q: undefined, sort: undefined }}
        >
          ← Back to Reviews
        </Link>
      </main>
    );
  }

  return (
    <main className="pb-20">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {review.featuredImageUrl ? (
          <img
            src={review.featuredImageUrl}
            alt={review.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.06 242), oklch(0.17 0.04 280))",
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.12 0.025 242) 0%, oklch(0.12 0.025 242 / 0.7) 50%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-6">
          <Link
            to="/reviews"
            data-ocid="review.link"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold mb-3"
            search={{ q: undefined, sort: undefined }}
          >
            <ChevronLeft size={14} />
            All Reviews
          </Link>
          <span className="block text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">
            {review.category} · {review.developer}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-foreground">
            {review.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-6 rounded-xl border border-navy-border bg-navy-card p-5 mb-6"
              data-ocid="review.card"
            >
              <div className="text-center">
                <div className="text-5xl font-extrabold text-gold leading-none">
                  {review.rating.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  Score
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <StarRating
                  rating={review.rating}
                  size="lg"
                  showNumber={false}
                />
                <p className="text-xs text-muted-foreground">
                  Based on expert gameplay analysis
                </p>
              </div>
            </motion.div>

            {/* Pros/Cons */}
            <div className="mb-6">
              <h3 className="uppercase text-xs font-bold tracking-widest text-gold mb-3">
                Pros &amp; Cons
              </h3>
              <ProsConsBlock pros={review.pros} cons={review.cons} />
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="overview" data-ocid="review.tab">
              <TabsList className="bg-navy-card border border-navy-border w-full justify-start gap-1 p-1 h-auto mb-6">
                {["overview", "features", "gameplay", "verdict"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    data-ocid="review.tab"
                    className="text-xs uppercase tracking-widest font-semibold data-[state=active]:bg-gold data-[state=active]:text-[oklch(0.20_0.03_242)]"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="rounded-xl border border-navy-border bg-navy-card p-5 prose prose-invert prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {review.overview}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="features" className="mt-0">
                <div className="rounded-xl border border-navy-border bg-navy-card p-5">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {review.features}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="gameplay" className="mt-0">
                <div className="rounded-xl border border-navy-border bg-navy-card p-5">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {review.gameplay}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="verdict" className="mt-0">
                <div className="rounded-xl border border-gold/30 bg-navy-card p-5">
                  <p className="text-foreground leading-relaxed text-sm font-medium">
                    {review.verdict}
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Screenshots */}
            {review.screenshotUrls.length > 0 && (
              <div className="mt-8">
                <h3 className="uppercase text-xs font-bold tracking-widest text-gold mb-3">
                  Screenshots
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {review.screenshotUrls.filter(Boolean).map((url, i) => (
                    <div
                      key={url}
                      data-ocid={`review.item.${i + 1}`}
                      className="rounded-lg overflow-hidden border border-navy-border aspect-video"
                    >
                      <img
                        src={url}
                        alt={`${review.title} screenshot ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {review.videoUrl && (
              <div className="mt-6">
                <h3 className="uppercase text-xs font-bold tracking-widest text-gold mb-3">
                  Gameplay Video
                </h3>
                <div className="rounded-xl overflow-hidden border border-navy-border aspect-video">
                  <iframe
                    src={review.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title={`${review.title} gameplay video`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className="rounded-xl border border-navy-border bg-navy-card p-5 sticky top-24"
              data-ocid="review.panel"
            >
              <h3 className="uppercase text-xs font-bold tracking-widest text-gold mb-4">
                Game Info
              </h3>
              <InfoRow label="Developer" value={review.developer} />
              <InfoRow label="Category" value={review.category} />
              <InfoRow label="RTP" value={`${review.rtp.toFixed(2)}%`} />
              <InfoRow label="Volatility" value={String(review.volatility)} />
              <InfoRow label="Min Bet" value={`$${review.minBet.toFixed(2)}`} />
              <InfoRow label="Max Bet" value={`$${review.maxBet.toFixed(2)}`} />
              <InfoRow
                label="Score"
                value={`${review.rating.toFixed(1)} / 10`}
              />

              <button
                type="button"
                data-ocid="review.primary_button"
                className="mt-5 w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-[oklch(0.20_0.03_242)] font-bold text-sm uppercase tracking-widest py-3 rounded-xl transition-colors"
              >
                Play Now <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
