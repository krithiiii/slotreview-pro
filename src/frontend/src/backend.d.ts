import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SlotReviewInput {
    rtp: number;
    screenshotUrls: Array<string>;
    title: string;
    features: string;
    volatility: Volatility;
    cons: Array<string>;
    pros: Array<string>;
    overview: string;
    minBet: number;
    description: string;
    verdict: string;
    isFeatured: boolean;
    featuredImageUrl: string;
    category: SlotCategory;
    rating: number;
    maxBet: number;
    gameplay: string;
    videoUrl?: string;
    developer: string;
}
export interface SlotReview {
    id: bigint;
    rtp: number;
    screenshotUrls: Array<string>;
    title: string;
    features: string;
    volatility: Volatility;
    cons: Array<string>;
    pros: Array<string>;
    overview: string;
    minBet: number;
    description: string;
    verdict: string;
    isFeatured: boolean;
    featuredImageUrl: string;
    category: SlotCategory;
    rating: number;
    maxBet: number;
    gameplay: string;
    videoUrl?: string;
    dateAdded: bigint;
    developer: string;
}
export enum SlotCategory {
    megaways = "megaways",
    video = "video",
    classic = "classic",
    progressive = "progressive"
}
export enum Volatility {
    low = "low",
    high = "high",
    medium = "medium"
}
export interface backendInterface {
    addSlotReview(input: SlotReviewInput): Promise<bigint>;
    deleteSlotReview(id: bigint): Promise<void>;
    getAllSlotReviews(): Promise<Array<SlotReview>>;
    getFeaturedReviews(): Promise<Array<SlotReview>>;
    getReviewsByCategory(category: SlotCategory): Promise<Array<SlotReview>>;
    getReviewsByRatingRange(minRating: number, maxRating: number): Promise<Array<SlotReview>>;
    getReviewsByRtpRange(minRtp: number, maxRtp: number): Promise<Array<SlotReview>>;
    getReviewsByVolatility(volatility: Volatility): Promise<Array<SlotReview>>;
    getSlotReview(id: bigint): Promise<SlotReview | null>;
    updateSlotReview(id: bigint, input: SlotReviewInput): Promise<void>;
}
