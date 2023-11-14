import { getFullName } from '../../util/names';
import { genArchetype } from '../../util/genArchetype';
import { PlayerGameSim } from './index';
import { posDict } from '../../globals';
import { Position } from './position';
import { genRawRating } from '../../util/genRawRating';
import { typeFactors } from '../../globals';
import { generateHeight as genHeight } from '../../util/genHeight';
import { bound } from '../../util/bound';
import { calculateHeightRating } from '../../util/heightRating';
import { gauss } from '../../util/gauss';

/*
54 = 4'6"
108 = 9'0"
*/

/**
 * Generates a player object with random attributes
 * @param posNo - the position number
 * @returns a PlayerGameSim object
 */
export function genPlayer(posNo: number = 0): PlayerGameSim {
    if (posNo < 0 || posNo > 5) {
        throw new Error('Invalid position number');
    }
    // generate player height and position
    const posHeightTuple = genPosition(posNo);
    const pos = posHeightTuple[0];
    const heightInInches = posHeightTuple[1];

    // generate player archetype
    const pArchetype = genArchetype(pos);

    // generate player ratings
    const pRatings = genRawRating(pArchetype);
    pRatings.hgt = calculateHeightRating(heightInInches, 20);

    // generate player ratings based on position
    for (const key in pRatings) {
        if (['hgt', 'stam', 'dur', 'cons', 'composite'].includes(key)) {
            continue;
        }
        if (key in typeFactors[pos]) {
            const typeFactor = typeFactors[pos][key];
            let rating = typeFactor * gauss(pRatings[key], 3);
            rating = Math.round(rating);
            rating = bound(rating, 0, 20);
            pRatings[key] = rating;
        }
    }

    // generate player durability and consistency, based on gaussian distribution
    pRatings.dur = Math.round(gauss(3, 1));
    pRatings.cons = Math.round(gauss(3, 1));

    // generate player badges - based on position

    // generate player tendencies - based on ratings

    // generate player stats

    // generate player name
    const pName = getFullName('male');

    // assemble player
    const p = new PlayerGameSim();
    p.name = pName;
    p.heightInInches = heightInInches;
    p.pos = pos;
    p.archetype = pArchetype;
    pRatings.updateComposite();
    p.rating = pRatings;

    return p;
}

/**
 * Generates a position and height tuple
 * @param n - the position number
 * @returns a tuple of Position and height in inches
 */
function genPosition(n: number): [Position, number] {
    while (true) {
        let heightInInches = Math.round(genHeight() + Math.random() - 0.5);
        heightInInches = parseInt(heightInInches.toString());

        // generate player position
        let pos: Position | null = null;
        const randType = Math.random();
        if (heightInInches >= 82) { // 6'10" or taller
            if (randType < 0.03) {
                pos = Position.G;
            } else if (randType < 0.08) {
                pos = Position.GF;
            } else if (randType < 0.15) {
                pos = Position.F;
            } else if (randType < 0.45) {
                pos = Position.FC;
            } else {
                pos = Position.C;
            }
        } else if (heightInInches <= 77) { // 6'5" or shorter
            if (randType < 0.50) {
                pos = Position.G;
            } else if (randType < 0.85) {
                pos = Position.GF;
            } else if (randType < 0.97) {
                pos = Position.F;
            } else {
                pos = Position.FC;
            }
        } else { // between 6'6" and 6'9" (inclusive)
            if (randType < 0.05) {
                pos = Position.G;
            } else if (randType < 0.25) {
                pos = Position.GF;
            } else if (randType < 0.75) {
                pos = Position.F;
            } else if (randType < 0.95) {
                pos = Position.FC;
            } else {
                pos = Position.C;
            }
        }

        if (n === 0) {
            return [pos, heightInInches];
        }
        if (pos && posDict[n].includes(pos)) {
            return [pos, heightInInches];
        }
    }
}
