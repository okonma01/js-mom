import { Rating } from "../core/player/rating";
import { archetypeRatings } from "../globals";

export function genRawRating(archetype: string): Rating {
    const rawRating = new Rating();
    // Stamina for all archetypes is 15
    rawRating.stam = 15;
    rawRating.spd = archetypeRatings[archetype][0];
    rawRating.stre = archetypeRatings[archetype][1];
    rawRating.jmp = archetypeRatings[archetype][2];
    rawRating.ins = archetypeRatings[archetype][3];
    rawRating.mid = archetypeRatings[archetype][4];
    rawRating.tp = archetypeRatings[archetype][5];
    rawRating.ft = archetypeRatings[archetype][6];
    rawRating.pss = archetypeRatings[archetype][7];
    rawRating.hndl = archetypeRatings[archetype][8];
    rawRating.reb = archetypeRatings[archetype][9];
    rawRating.oiq = archetypeRatings[archetype][10];
    rawRating.diq = archetypeRatings[archetype][11];
    return rawRating;
}