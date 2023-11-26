import { PlayerGameSim } from "../player";
import { Position } from "../player/position";
import { fatigueAdjOvr, overall } from "../player/overall";
import { getBestPlayerAtPosition } from "../../util/getBestPlayerAtPosition";
import { getPositionDepth } from "../../util/getPositionDepth";
import { TeamStat } from "./stat";
import { depthDict } from "../../globals";

export class TeamGameSim {
    static count = 0;
    id: string;
    name: string;
    players: PlayerGameSim[];
    lineup: PlayerGameSim[];
    bench: PlayerGameSim[];
    stat: TeamStat;

    constructor() {
        TeamGameSim.count += 1;
        this.id = `team_${TeamGameSim.count}`;
        this.name = "";
        this.players = [];
        this.lineup = [];
        this.bench = [];
        this.stat = new TeamStat();
    }

    // Clears all stats for the team
    clearStat(): void {
        for (const s in this.stat) {
            this.stat[s as keyof TeamStat] = 0;
        }
    }

    addPlayer(p: PlayerGameSim): void {
        this.players.push(p);
    }

    subPlayers(subIn: PlayerGameSim, subOut: PlayerGameSim) {
        const inIndex = this.bench.indexOf(subIn);
        const outIndex = this.lineup.indexOf(subOut);
        this.lineup[outIndex] = subIn;
        this.bench[inIndex] = subOut;
    }

    // Sets the lineup for the team
    setLineup(): void {
        const sortedList: PlayerGameSim[] = [];
        let playerSet = new Set(this.players);
        for (let i = 1; i <= 5; i++) {
            playerSet = new Set(this.players.filter((p) => !sortedList.includes(p)));
            sortedList.push(getBestPlayerAtPosition(i, playerSet));
        }

        const depths: Record<Position, number> = {
            [Position.G]: 0,
            [Position.GF]: 0,
            [Position.F]: 0,
            [Position.FC]: 0,
            [Position.C]: 0,
        };
        for (const pos in depths) {
            const position = pos as unknown as Position;
            depths[position] = getPositionDepth(position, sortedList);
            while (depths[position] < depthDict[position]) {
                playerSet = new Set(this.players.filter((p) => !sortedList.includes(p)));
                const nthMan = getBestPlayerAtPosition(position, playerSet);
                if (nthMan) {
                    sortedList.push(nthMan);
                    depths[position] += 1;
                } else {
                    break;
                }
            }
        }

        this.lineup = sortedList.slice(0, 5);
        this.bench = sortedList.slice(5);
    }

    // Prints the roster for the team
    printRoster(x = 0, fatigue = false): string[] {
        if (fatigue) {
            if (x === 0) {
                return this.lineup.map(
                    (p) => `${p.pos} ${fatigueAdjOvr(p, p.pos)}`
                );
            } else {
                return this.bench.map(
                    (p) => `${p.pos} ${fatigueAdjOvr(p, p.pos)}`
                );
            }
        } else {
            if (x === 0) {
                return this.lineup.map(
                    (p) => `${p.pos} ${overall(p, p.pos)}`
                );
            } else {
                return this.bench.map(
                    (p) => `${p.pos} ${overall(p, p.pos)}`
                );
            }
        }
    }
}
