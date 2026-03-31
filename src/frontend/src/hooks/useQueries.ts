import { useQuery } from "@tanstack/react-query";
import type { SlotCategory, SlotReview, Volatility } from "../backend.d";
import { useActor } from "./useActor";

export type { SlotReview, SlotCategory, Volatility };

export function useGetAllReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<SlotReview[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSlotReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeaturedReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<SlotReview[]>({
    queryKey: ["reviews", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetReviewById(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<SlotReview | null>({
    queryKey: ["reviews", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getSlotReview(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useGetReviewsByCategory(category: SlotCategory | null) {
  const { actor, isFetching } = useActor();
  return useQuery<SlotReview[]>({
    queryKey: ["reviews", "category", category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getReviewsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}
