import { pickPlayer } from "../../util/pickPlayer";
import { Game } from "../game";
import { GameState } from "../game/state";


/**
 * Performs the tip-off to start the game.
 * @param g - The game object.
 */
export function tipOff(g: Game): void {
    // Jump ball - (for now, pick a random player)
    // Set offense and defense teams
    // Set quarter number to 1, game clock to 12:00
    // Set game state to HALF_COURT

    // Get teams' best jump ball players
    const team1Players = g.teams[0].lineup.map((player) => player.rating.composite['jumpBall']);
    const player1Index = team1Players.indexOf(Math.max(...team1Players));
    const team2Players = g.teams[1].lineup.map((player) => player.rating.composite['jumpBall']);
    const player2Index = team2Players.indexOf(Math.max(...team2Players));

    const ratios = [player1Index, player2Index];
    const winnerOfTipOff = pickPlayer(ratios, 2);

    if (winnerOfTipOff === 0) {
        g.o = 0;
        g.d = 1;
    } else {
        g.o = 1;
        g.d = 0;
    }

    if (g.quarterNo <= 4) {
        g.quarterNo = 1;
    }

    g.gameClock = 720;
    g.gameState = GameState.halfCourt;
    g.machine.toMakeAssist();
}
