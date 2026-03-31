import { Link } from "@tanstack/react-router";
import type { SlotReview } from "../hooks/useQueries";
import { StarRating } from "./StarRating";

interface ReviewCardProps {
  review: SlotReview;
  index: number;
}

function getInitials(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function FallbackCover({ title }: { title: string }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.06 242), oklch(0.17 0.04 280))",
      }}
    >
      <span
        className="text-3xl font-bold tracking-wider text-gold opacity-80"
        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
      >
        {getInitials(title)}
      </span>
    </div>
  );
}

export function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <Link
      to="/reviews/$id"
      params={{ id: review.id.toString() }}
      data-ocid={`reviews.item.${index + 1}`}
      className="group block rounded-xl border border-navy-border bg-navy-card overflow-hidden hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold"
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-light">
        {review.featuredImageUrl ? (
          <img
            src={review.featuredImageUrl}
            alt={review.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const fallback = e.currentTarget.nextSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="w-full h-full absolute inset-0"
          style={{ display: review.featuredImageUrl ? "none" : "flex" }}
        >
          <FallbackCover title={review.title} />
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 rounded-lg px-2.5 py-1 text-sm font-bold bg-gold/90 text-[oklch(0.20_0.03_242)] shadow-md">
          {review.rating.toFixed(1)}
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-black/60 text-gold border border-gold/30">
          {review.category}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h3 className="uppercase font-bold text-sm tracking-wide text-foreground group-hover:text-gold transition-colors line-clamp-1">
          {review.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 mb-2">
          {review.developer}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {review.description}
        </p>
        <div className="mt-3">
          <StarRating rating={review.rating} size="sm" />
        </div>
      </div>
    </Link>
  );
}
