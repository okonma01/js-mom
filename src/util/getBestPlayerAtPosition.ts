import { PlayerGameSim } from "../core/player";
import { posDict } from "../globals";
import { Position } from "../core/player/position";



/**
 * Returns the best player at a given position
 * @param pos - Position to check
 * @param playerSet - Set of players to check
 * @param sub - Whether to check for a bench player or a starter
 * @returns Best player at the given position
 */
export function getBestPlayerAtPosition(pos: number, playerSet: Set<PlayerGameSim>, sub = false): PlayerGameSim {
    if (playerSet.size === 0) {
        // return null;
    }

    // Filter out injured players
    const pool = Array.from(playerSet).filter(p => !p.injured);

    // Filter out players who are not eligible for the given position
    const eligiblePlayers = pool.filter(p => posDict[p.pos].includes(pos));

    // Filter out players who are not eligible to be a sub (if applicable)
    const benchEligiblePlayers = sub ? eligiblePlayers.filter(p => p.stat.benchTime > 0) : eligiblePlayers;

    // Sort the remaining players by overall rating and return the best one
    const bestPlayer = benchEligiblePlayers.sort((a, b) => b.getOvr(pos) - a.getOvr(pos))[0];

    // if (bestPlayer.getOvr(pos) !== -1) {
    // }
    return bestPlayer;
    // return null;
}
