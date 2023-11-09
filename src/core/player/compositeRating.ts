import { Rating } from "./rating";
import { compositeRatingDict } from "../../globals";

// Composite ratings are derived ratings; they come from the raw ratings
// They determine who gets what in the game - usage, blocks, steals, etc.
// I also added defense here - to determine a team's defensive rating (summing up the players on the court)
/**
 * CompositeRating class represents a composite rating for a player.
 * It contains various attributes such as jumpBall, halfcourtUsage, fastbreakUsage, shotUsage, blocking, fouling, rebounding, stealing, drawingFoul, defenseInside, and defensePerimeter.
 * @class
 * @property {number} jumpBall - The jump ball rating of the player.
 * @property {number} halfcourtUsage - The half court usage rating of the player.
 * @property {number} fastbreakUsage - The fast break usage rating of the player.
 * @property {number} shotUsage - The shot usage rating of the player.
 * @property {number} blocking - The blocking rating of the player.
 * @property {number} fouling - The fouling rating of the player.
 * @property {number} rebounding - The rebounding rating of the player.
 * @property {number} stealing - The stealing rating of the player.
 * @property {number} drawingFoul - The drawing foul rating of the player.
 * @property {number} defenseInside - The inside defense rating of the player.
 * @property {number} defensePerimeter - The perimeter defense rating of the player.
 */
export class CompositeRating {
    jumpBall: number = 0;
    halfcourtUsage: number = 0;
    fastbreakUsage: number = 0;
    shotUsage: number = 0;
    blocking: number = 0;
    fouling: number = 0;
    rebounding: number = 0;
    stealing: number = 0;
    drawingFoul: number = 0;
    defenseInside: number = 0;
    defensePerimeter: number = 0;

    /**
     * Compose the composite rating of the player.
     * @param {Rating} rating - The rating object of the player.
     */
    compose(rating: Rating): void {
        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                for (let i = 0; i < compositeRatingDict[key][0].length; i++) {
                    const rawRating = compositeRatingDict[key][0][i];
                    if (typeof rawRating !== "string") {
                        this[key] = Number(this[key]) + (rawRating * compositeRatingDict[key][1][i]) as any;
                    } else {
                        this[key] = Number(this[key]) + (rating.get(rawRating) * compositeRatingDict[key][1][i]) as any;
                    }
                }
                this[key] = Math.floor(Number(this[key])) as any;
            }
        }
    }
}
