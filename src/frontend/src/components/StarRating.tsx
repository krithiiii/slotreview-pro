import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number; // 0-10 scale
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

export function StarRating({
  rating,
  size = "md",
  showNumber = false,
}: StarRatingProps) {
  const stars = rating / 2; // Convert 0-10 to 0-5
  const fullStars = Math.floor(stars);
  const hasHalf = stars - fullStars >= 0.5;

  const sizeMap = { sm: 12, md: 16, lg: 22 };
  const px = sizeMap[size];

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i < fullStars;
        const half = !filled && i === fullStars && hasHalf;
        return (
          <span
            key={`star-${i}`}
            className="relative inline-block"
            style={{ width: px, height: px }}
          >
            <Star
              size={px}
              className="text-navy-border"
              fill="oklch(0.27 0.04 242)"
              strokeWidth={1.5}
            />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? "50%" : "100%" }}
              >
                <Star
                  size={px}
                  className="text-gold"
                  fill="oklch(0.75 0.1 75)"
                  strokeWidth={1.5}
                />
              </span>
            )}
          </span>
        );
      })}
      {showNumber && (
        <span className="ml-1 text-sm font-semibold text-gold">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
