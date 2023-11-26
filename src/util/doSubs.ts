import { Game } from "../core/game";
import { fatigueAdjOvr } from "../core/player/overall";
import { getBestPlayerAtPosition } from "./getBestPlayerAtPosition";

/**
 * Performs substitutions in a game.
 * @param g - The game object.
 * @param t - The index of the team.
 * @returns True if substitutions were made, false otherwise.
 */
export function doSubs(g: Game, t: number): boolean {
    let didSubs = false;

    // Create a dictionary of player positions and their adjusted overalls based on fatigue.
    const subDict: { [position: number]: number } = {};
    for (let i = 0; i < 5; i++) {
        subDict[i + 1] = fatigueAdjOvr(g.teams[t].lineup[i], i + 1);
    }

    // Create a queue of player positions to be substituted, sorted by their adjusted overalls.
    const subQueue = Object.keys(subDict).sort((a, b) => subDict[a] - subDict[b]);

    const playerSet = new Set(g.teams[t].bench);

    // Substitute players in the lineup.
    for (const position of subQueue) {
        // Do not sub if player is the free throw man.
        const p = Number(position);
        if (t === g.o && Number(p) === g.shotTaker) {
            continue;
        }

        const subIn = getBestPlayerAtPosition(p, playerSet, true);
        const subOut = g.teams[t].lineup[Number(p) - 1];

        if (subIn && fatigueAdjOvr(subIn, p) > fatigueAdjOvr(subOut, p)) {
            g.teams[t].subPlayers(subIn, subOut);
            const index = g.teams[t].lineup.indexOf(subIn);
            g.teams[t].lineup[index].resetStat('benchTime');
            playerSet.delete(subIn);
            didSubs = true;
        }
    }

    return didSubs;
}