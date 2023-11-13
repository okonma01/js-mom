import { Rating } from "../core/player/rating";
import { archetypeRatings } from "../globals";

export function genRawRating(archetype: string[]): Rating {
    const rawRating = new Rating();
    // Stamina for all archetypes is 15
    rawRating.stam = 15;
    rawRating.spd = Math.max(...archetype.map(a => archetypeRatings[a][0]));
    rawRating.stre = Math.max(...archetype.map(a => archetypeRatings[a][1]));
    rawRating.jmp = Math.max(...archetype.map(a => archetypeRatings[a][2]));
    rawRating.ins = Math.max(...archetype.map(a => archetypeRatings[a][3]));
    rawRating.mid = Math.max(...archetype.map(a => archetypeRatings[a][4]));
    rawRating.tp = Math.max(...archetype.map(a => archetypeRatings[a][5]));
    rawRating.ft = Math.max(...archetype.map(a => archetypeRatings[a][6]));
    rawRating.pss = Math.max(...archetype.map(a => archetypeRatings[a][7]));
    rawRating.hndl = Math.max(...archetype.map(a => archetypeRatings[a][8]));
    rawRating.reb = Math.max(...archetype.map(a => archetypeRatings[a][9]));
    rawRating.oiq = Math.max(...archetype.map(a => archetypeRatings[a][10]));
    rawRating.diq = Math.max(...archetype.map(a => archetypeRatings[a][11]));
    return rawRating;
}