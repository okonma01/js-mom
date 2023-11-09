/**
 * Generates an array of weights that sum up to a given value.
 * @param n The number of weights to generate.
 * @param sum The sum of all the weights.
 * @param delta The difference between consecutive weights.
 * @returns An array of weights.
 */
export function generateWeights(n: number = 10, sum: number = 100, delta: number = 0.2): number[] {
    // If n is less than or equal to 1, return an array with a single element equal to sum.
    if (n <= 1) {
        return [sum];
    }

    // Generate an initial list of weights.
    const initList = Array(n).fill(sum/n).map((val, i) => {
        // If i is less than or equal to the midpoint of n, add delta * i to val.
        if (i <= Math.round(n/2)) {
            return val + delta * i;
        } else {
            // Otherwise, subtract delta * (n - i) from val.
            return val - delta * (n - i);
        }
    }).map(val => Math.round(val * 10) / 10);

    // Sort the initial list in descending order and return it.
    initList.sort((a, b) => b - a);
    return initList;
}
