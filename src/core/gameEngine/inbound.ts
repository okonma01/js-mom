import { Game } from "../game";
import { GameState } from "../game/state";
import { timeForSub } from "../../util/timeForSub";
import { doSubs } from "../../util/doSubs";

export function inbound(g: Game) {
    g.swapTeams();
    g.resetVariables();
    if (timeForSub(g)) {
        doSubs(g, g.o);
        doSubs(g, g.d);
    }
    g.gameState = GameState.halfCourt;
    g.machine.makeAssist();

}