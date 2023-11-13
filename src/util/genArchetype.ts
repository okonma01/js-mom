import { archetypeDict } from '../globals';
import { Position } from '../core/player/position';

function getRandomArchetype(archetypes: string[], weights: number[]): string[] {
    let totalWeight = weights.reduce((a, b) => a + b, 0);
    let randomNum = Math.random();
    if (randomNum <= 0.15) {
        let archetype1 = getRandomItem(archetypes);
        let archetype2 = getRandomItem(archetypes.filter(a => a !== archetype1));
        return [archetype1, archetype2];
    }
    randomNum *= totalWeight;
    for (let i = 0; i < archetypes.length; i++) {
        if (randomNum < weights[i]) {
            return [archetypes[i]];
        }
        randomNum -= weights[i];
    }
    return [archetypes[archetypes.length - 1]]; // fallback, should not happen
}

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function genArchetype(pos: Position): string[] {
    const archetypeList = archetypeDict[pos];
    const archetypes = archetypeList[0];
    const weights = archetypeList[1];
    return getRandomArchetype(archetypes, weights);
}