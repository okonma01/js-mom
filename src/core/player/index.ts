// import { Badge } from './badge';
import { overall } from './overall';
import { Position } from './position';
import { posDict } from '../../globals';
import { Rating, getRatings } from './rating';
import { PlayerStat } from './stat';
import { heightInFeet } from '../../util/heightInFeet';


/**
 * Represents a player in the game simulation.
 */
export class PlayerGameSim {
    static count = 0;
    id: string;
    name: string;
    heightInInches: number;
    archetype: string[];
    pos: Position;
    stat: PlayerStat;
    rating: Rating;
    injured: boolean;

    /**
     * Creates a new instance of the PlayerGameSim class.
     */
    constructor() {
        this.id = 'player' + PlayerGameSim.count;
        PlayerGameSim.count += 1;
        this.name = '';
        this.heightInInches = 0;
        this.archetype = [];
        this.pos = Position.G;
        this.stat = new PlayerStat();
        this.rating = new Rating();
        this.injured = false;
    }

    /**
     * Logs the player's information to the console.
     */
    getInfo(): void {
        console.log('PLAYER NAME: ', this.name, '\n');
        console.log('PLAYER HEIGHT: ', heightInFeet(this.heightInInches), '\n');
        console.log('PLAYER POSITION: ', this.pos, '\n');
        console.log('PLAYER RATINGS: ', getRatings(this.rating), '\n');
        console.log('PLAYER OVR: coming soon...');
    }

    /**
     * Gets the rating for the specified attribute.
     * @param attr The attribute to get the rating for.
     * @returns The rating for the specified attribute.
     */
    getRating(attr: string): number {
        if (attr in this.rating.composite) {
            return this.rating.composite[attr];
        }
        if (!(attr in this.rating)) {
            return -1;
        }
        return this.rating[attr];
    }

    /**
     * Clears the player's stats.
     */
    clearStat(): void {
        for (const s in this.stat) {
            if (s === 'energy') {
                this.stat[s] = 100;
            } else {
                this.stat[s] = 0;
            }
        }
    }

    /**
     * Gets the value of the specified stat.
     * @param s The stat to get the value of.
     * @returns The value of the specified stat.
     */
    getStat(s: string): number {
        if (!(s in this.stat)) {
            return -1;
        }
        return this.stat[s];
    }

    /**
     * Gets the overall rating for the player at the specified position.
     * @param pos The position to get the overall rating for.
     * @returns The overall rating for the player at the specified position.
     */
    getOvr(pos: number): number {
        if (!posDict[pos].includes(this.pos)) {
            return -1;
        }
        return overall(this, this.pos);
    }
}
