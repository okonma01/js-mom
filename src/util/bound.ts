export function bound(x: number = 0, min: number = 0, max: number = 100): number {
    return Math.min(Math.max(x, min), max);
}