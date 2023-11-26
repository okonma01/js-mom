export function pickPlayer(ratios, playerCount) {
    const sum = ratios.reduce((a, b) => a + b, 0);
    const random = Math.random() * sum;
    let i = 0;
    let cumulativeProbability = ratios[i];
    while (random > cumulativeProbability) {
        i += 1;
        cumulativeProbability += ratios[i];
    }
    return i;
}