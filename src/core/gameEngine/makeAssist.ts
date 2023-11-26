import { Game } from "../game";

export function makeAssist(g: Game) {
    if (g.clockOver()) {
        g.machine.toEndOfQuarter();
        return;
    }
    // Set assist man (for now, pick a random player)
    g.assistMan = getAssistMan(g);
    if (turnover(game)) {
        // Set steal man (for now, pick a random player)
        runClock(game, true);
        if (clockOver(game)) {
            game.toEndOfQuarter();
            return;
        }
        game.stealMan = getStealMan(game);
        recordStat(game, 'turnover');
        game.gameState = GameState.transition;
        swapTeams(game);
        game.toMakeAssist();
    } else {
        game.toTakeShot();
    }
}