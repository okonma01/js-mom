import { weightDict } from "../../globals";
import { PlayerGameSim } from "./index";
import { Position } from "./position";


export function overall(player: PlayerGameSim, position: Position): number {
    let ovr = 0;
    const positionName = String(position).toLowerCase();
    for (let i = 0; i < weightDict[positionName][0].length; i++) {
        const attr = weightDict[positionName][0][i];
        const wgt = weightDict[positionName][1][i] / 100;
        ovr += Math.round(player.getRating(attr) * wgt * 10000) / 10000;
    }
    return Math.round(ovr);
}

function fatigueAdjOvr(player: PlayerGameSim, position: number): number {
    if (!player) {
        return Infinity;
    }
    const ovr = player.getOvr(position);
    if (ovr === -1) {
        return -1;
    }
    return Math.round((player.getStat('energy') / 100) * ovr);
}
