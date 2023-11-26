import { GameState } from './state';
import { pickPlayer, recordStat, getAssistMan, getStealMan, getShotTaker, getBoardMan, resetGame, roundMp, swapTeams, resetVariables, timeForSub, doSubs, clockOver, turnover, runClock, doFoul, doShot, scoresTied, resetClock } from './game_util';



export function takeShot(game) {
    // Set shooter (usage depends on game state; for now pick a random player)
    // Record stats (fga)
    runClock(game);
    game.shotTaker = getShotTaker(game);
    const shotType = random(['fga_threepoint', 'fga_midrange', 'fga_inside']);
    const shotMade = doShot();
    const foulCommitted = doFoul();
    recordStat(game, 'takeShot', { shotType });
    game.freeThrows = shotType === 'fga_threepoint' ? 3 : 2;
    if (shotMade) {
        recordStat(game, 'shotMade', { shotType, amount: game.freeThrows });
        if (foulCommitted) {
            game.toFreeThrow();
        } else {
            game.toInbound();
        }
    } else {
        if (foulCommitted) {
            game.toFreeThrow();
        } else {
            game.toRebound();
        }
    }
}

export function rebound(game) {
    if (clockOver(game)) {
        game.toEndOfQuarter();
        return;
    }
    const x = Math.random();
    if (x < 0.15) {
        // Offensive rebound
        game.boardMan = getBoardMan(game, game.offense);
        recordStat(game, 'offensiveRebound');
        resetVariables(game);
    } else {
        // Defensive rebound
        game.boardMan = getBoardMan(game, game.defense);
        recordStat(game, 'defensiveRebound');
        game.gameState = GameState.transition;
        swapTeams(game);
    }
    game.toMakeAssist();
}

export function freeThrow(game) {
    // Free throw mechanism here
    if (timeForSub(game)) {
        doSubs(game, game.offense);
        doSubs(game, game.defense);
    }
    for (let i = 0; i < game.freeThrows; i++) {
        recordStat(game, 'freeThrow');
        const x = Math.random();
        if (x < 0.75) {
            recordStat(game, 'shotMade', { shotType: 'freeThrow', amount: 1 });
            recordStat(game, 'freeThrowMade');
        }
        if (i === game.freeThrows - 1 && x < 0.75) {
            game.lastFreeThrowMade = true;
        }
    }
    if (game.lastFreeThrowMade) {
        game.toInbound();
    } else {
        game.toRebound();
    }
}

export function gameOver(game) {
    // For clean up
    roundMp(game, game.offense);
    roundMp(game, game.defense);
}

export function setWinner(game) {
    // Set game winner and loser
    if (game.teams[game.offense].stats.points > game.teams[game.defense].stats.points) {
        game.winner = game.teams[game.offense];
    } else {
        game.winner = game.teams[game.defense];
    }
}

export function restart(game) {
    resetGame(game);
}

export class GameEngine {
    endClock: number = 0;
}
