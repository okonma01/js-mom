import { PlayerGameSim } from "../core/player";
import { Position } from "../core/player/position";
import { posDict } from "../globals";

/**
 * Returns the number of players at a given position
 * @param pos - Position to check
 * @param playerList - List of players to check
 * @returns Number of players at the given position
 */
export function getPositionDepth(pos: Position, playerList: PlayerGameSim[]): number {
    return playerList.filter(p => posDict[pos].includes(p.pos)).length;
}