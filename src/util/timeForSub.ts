import { Game } from "../core/game";

export function timeForSub(g: Game) {
    if (g.posPerSub <= 0) {
        g.posPerSub = 6;
        return true;
    } else {
        g.posPerSub -= 1;
        return false;
    }
}