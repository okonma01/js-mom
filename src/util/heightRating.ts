import { bound } from "./bound";

/**
 * Calculates the height rating based on the given height in inches.
 * @param heightInInches The height in inches.
 * @returns The height rating.
 */
export function calculateHeightRating(heightInInches: number): number {
    const minHeight = 66; // 5'6"
    const maxHeight = 93; // 7'9"
    const height = bound((100 * (heightInInches - minHeight)) / (maxHeight - minHeight));
    return Math.floor(height);
}
