import { PlayerGameSim } from "../core/player";
import { getBestPlayerAtPosition } from "./getBestPlayerAtPosition";

/**
 * Sorts a list of players by position and returns the best player at each position
 * @param players - List of players to sort
 * @param depth - Total number of players to return
 * @returns List of players sorted by position
 */
export function sortPlayersByPosition(players: PlayerGameSim[], depth: number): PlayerGameSim[] {
    const sortedList: PlayerGameSim[] = [];

    // Get the best player for each starting position
    for (let i = 1; i <= 5; i++) {
        const playerSet = new Set(players.filter(p => !sortedList.includes(p)));
        sortedList.push(getBestPlayerAtPosition(i, playerSet));
    }

    // Get the best player for each bench position
    for (let i = 1; i < depth - 4; i++) {
        const playerSet = new Set(players.filter(p => !sortedList.includes(p)));
        sortedList.push(getBestPlayerAtPosition(i, playerSet, true));
    }

    return sortedList;
}
