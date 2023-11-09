/**
 * Returns a random number from a normal distribution with the specified mean and standard deviation.
 * @param mean - The mean of the normal distribution.
 * @param stdDev - The standard deviation of the normal distribution.
 * @returns A random number from the normal distribution.
 */
export function gauss(mean: number, stdDev: number): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    const normal = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return Math.round(mean + stdDev * normal);
}