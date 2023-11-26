import StateMachine from 'javascript-state-machine';
import { TeamGameSim } from '../team';
import { GameState } from './state';
import * as gameEngine from '../gameEngine';
// import { tipOff } from '../gameEngine';

export class Game {
    private states = ['tipOff', 'inbound', 'endOfQuarter', 'gameOver', 'makeAssist', 'takeShot', 'freeThrow'];

    machine: StateMachine;
    gameClock: number = 720;
    quarterNo: number = 1;
    teams: TeamGameSim[] = [];
    assistMan: number = -1;
    shotTaker: number = -1;
    boardMan: number = -1;
    stealMan: number = -1;
    blockMan: number = -1;
    lastFtMade: boolean = false;
    fts: number = 0;
    o: number = 0;
    d: number = 1;
    winner: TeamGameSim | null = null;
    gameState: GameState = GameState.halfCourt;
    posPerSub = 6;

    constructor() {
        this.machine = new StateMachine({
            init: 'tipOff',
            transitions: [
                { name: 'tipOff', from: 'tipOff', to: 'inbound' },
                { name: 'endOfQuarter', from: 'makeAssist', to: 'endOfQuarter' },
                { name: 'gameOver', from: 'endOfQuarter', to: 'gameOver' },
                { name: 'inbound', from: 'endOfQuarter', to: 'inbound' },
                { name: 'makeAssist', from: 'inbound', to: 'makeAssist' },
                { name: 'turnover', from: 'makeAssist', to: 'makeAssist' },              // steal or turnover, swap
                { name: 'takeShot', from: 'makeAssist', to: 'takeShot' },
                { name: 'turnover', from: 'takeShot', to: 'inbound' },                  // shot-clock violation, swap
                { name: 'missShot', from: 'takeShot', to: 'makeAssist' },               // missed fga, swap
                { name: 'missShotOffRebound', from: 'takeShot', to: 'makeAssist' },     // missed fga + offensive reb
                { name: 'missShotFoul', from: 'takeShot', to: 'freeThrow' },       // missed fga + foul
                { name: 'makeShot', from: 'takeShot', to: 'inbound' },                  // made fga, swap
                { name: 'makeShotFoul', from: 'takeShot', to: 'freeThrow' },       // made fga + and1
                { name: 'missShot', from: 'freeThrow', to: 'makeAssist' },              // missed last fta, swap
                { name: 'missShotOffRebound', from: 'freeThrow', to: 'makeAssist' },     // missed last fta + offensive reb
                { name: 'makeShot', from: 'freeThrow', to: 'inbound' },                  // made last fta, swap
            ],
            methods: {
                onTipOff: () => gameEngine.tipOff(this),
                onInbound: () => gameEngine.inbound(this),
                onEndOfQuarter: () => gameEngine.endOfQuarter(this),
                onMakeAssist: () => gameEngine.makeAssist(this),
                onTakeShot: () => gameEngine.takeShot(this),
                onFreeThrow: () => gameEngine.freeThrow(this),
                onGameOver: () => gameEngine.setWinner(this),
            },
        });
    }

    /**
     * Play the game until it is over.
     */
    public playGame(): void {
        while (this.machine.state !== 'gameOver') {
            this.machine[this.machine.state]();
        }
        gameEngine.setWinner(this);
    }

    clockOver(): boolean {
        return this.gameClock <= 0;
    }
    
    resetClock(): void {
        if (this.quarterNo > 4) {       // overtime
            this.gameClock = 300;
        } else {
            this.gameClock = 720;
        }
    }

    /**
     * Restart the game.
     */
    public restartGame(): void {
        gameEngine.restart(this);
    }

    scoresTied(): boolean {
        return this.teams[0].stat.pts === this.teams[1].stat.pts;
    }

    swapTeams(): void {
        const temp = this.o;
        this.o = this.d;
        this.d = temp;
    }

    resetVariables(): void {
        this.assistMan = -1;
        this.shotTaker = -1;
        this.boardMan = -1;
        this.stealMan = -1;
        this.blockMan = -1;
        this.fts = 0;
        this.lastFtMade = false;
    }

    /**
     * Get the current score of the game.
     * @returns The score in the format "Team1Score - Team2Score".
     */
    public getScore(): string {
        const team1Score = `${this.teams[0].name} ${this.teams[0].stat.pts}`;
        const team2Score = `${this.teams[1].stat.pts} ${this.teams[1].name}`;
        return `${team1Score} - ${team2Score}`;
    }
}
