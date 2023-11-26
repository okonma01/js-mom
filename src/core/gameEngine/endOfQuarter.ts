import { Game } from "../game";

export function endOfQuarter(g: Game) {
    if (g.quarterNo === 4) {
        // End of regulation
        if (g.scoresTied()) {
            // Go to overtime
            g.machine.toInbound();
        } else {
            g.machine.toGameOver();
        }
    } else {
        // We are not at quarter 4 yet
        g.quarterNo += 1;
        g.resetClock();
        g.machine.toInbound();
    }
}