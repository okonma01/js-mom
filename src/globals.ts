import { generateWeights } from './util/weights';
import { Position } from './core/player/position';

export const posDict = {
    1: [Position.G],
    2: [Position.G, Position.GF],
    3: [Position.GF, Position.F],
    4: [Position.F, Position.FC, Position.C],
    5: [Position.FC, Position.C]
};

export type DepthDict = {
    [key in Position]: number;
};

export const depthDict: DepthDict = {
    [Position.G]: 2, // g + gf
    [Position.GF]: 3, // g + gf
    [Position.F]: 4, // gf + f
    [Position.FC]: 3, // f + fc
    [Position.C]: 3, // fc + c
};

export type WeightDict = {
    [key in Position]: [string[], number[]];
}

export const weightDict: WeightDict = {
    [Position.G]: [
        ['spd', 'pss', 'mid', 'ins', 'diq', 'jmp', 'reb', 'ft', 'hndl', 'tp'],
        generateWeights(10, 100, 0.9),
    ],
    [Position.GF]: [
        ['pss', 'spd', 'ins', 'mid', 'tp', 'diq', 'oiq', 'reb', 'jmp', 'ft'],
        generateWeights(10, 100, 0.7),
    ],
    [Position.F]: [
        ['hgt', 'mid', 'diq', 'jmp', 'ins', 'spd', 'oiq', 'tp'],
        [30].concat(generateWeights(7, 70, 1.3)),
    ],
    [Position.FC]: [
        ['hgt', 'reb', 'ins', 'jmp', 'stre', 'diq', 'oiq', 'stam'],
        [38].concat(generateWeights(7, 62, 0.7)),
    ],
    [Position.C]: [
        ['hgt', 'diq', 'reb', 'ins', 'jmp', 'stre'],
        [26].concat(generateWeights(5, 74, 1.1))
    ],
};


export interface CompositeRatingDict {
    [key: string]: [string[], number[]];
}

export const compositeRatingDict: CompositeRatingDict = {
    jumpBall: [['hgt', 'jmp'], [1, 0.25]],
    halfcourtUsage: [['pss', 'hndl', 'oiq'], [1.5, 0.5, 0.5]],
    fastbreakUsage: [['spd', 'hndl', 'pss', 'oiq'], [1, 1, 1.5, 0.5]],
    shotUsage: [['ins', 'mid', 'tp', 'spd', 'hgt', 'reb', 'oiq'], [2.5, 1, 1, 0.5, 0.5, 0.5, 0.5]],
    blocking: [['hgt', 'jmp', 'diq'], [2.5, 1.5, 0.5]],
    fouling: [['10', 'hgt', 'diq', 'spd'], [3, 1, -1, -1]],
    rebounding: [['hgt', 'stre', 'jmp', 'reb', 'oiq', 'diq'], [2, 0.1, 0.1, 2, 0.5, 0.5]],
    stealing: [['10', 'spd', 'diq'], [1, 1, 2]],
    drawingFoul: [['hgt', 'spd', 'hndl', 'ins', 'oiq'], [1, 1, 1, 0.5, 1]],
    defenseInside: [['hgt', 'stre', 'spd', 'jmp', 'diq'], [2.5, 1, 0.5, 0.5, 2]],
    defensePerimeter: [['hgt', 'stre', 'spd', 'jmp', 'diq'], [0.5, 0.5, 2, 0.5, 1]],
};


// Define the list of archetypes
export const archetypeList: string[] = [
    'playmaker',
    'slasher',
    'slashAndSplash',
    'shootingSpecialist',
    '3AndD',
    'perimeterDefender',
    'reboundSpecialist',
    'playmakingBig',
    'stretchBig',
    'rollingBig',
    'rimProtector'
];

// Define the archetype dictionary
export type ArchetypeDict = {
    [key in Position]: [string[], number[]];
};

export const archetypeDict: ArchetypeDict = {
    [Position.G]: [
        ['playmaker', 'slasher', 'slashAndSplash', 'shootingSpecialist', 'perimeterDefender'],
        [0.30, 0.15, 0.15, 0.15, 0.25]
    ],
    [Position.GF]: [
        ['playmaker', 'slasher', 'slashAndSplash', 'shootingSpecialist', 'perimeterDefender'],
        [0.10, 0.30, 0.20, 0.20, 0.20]
    ],
    [Position.F]: [
        ['slasher', 'slashAndSplash', 'shootingSpecialist', 'perimeterDefender', 'reboundSpecialist'],
        [0.25, 0.15, 0.20, 0.15, 0.25]
    ],
    [Position.FC]: [
        ['slasher', 'reboundSpecialist', 'playmakingBig', 'stretchBig'],
        [0.15, 0.30, 0.10, 0.45]
    ],
    [Position.C]: [
        ['playmakingBig', 'stretchBig', 'rollingBig', 'rimProtector'],
        [0.15, 0.40, 0.25, 0.20]
    ]
};


// ratings array format: [spd, stre, jmp, ins, mid, tp, ft, pss, hndl, reb, oiq, diq]
// Define the interface
export interface ArchetypeRatings {
    playmaker: number[];
    slasher: number[];
    slashAndSplash: number[];
    shootingSpecialist: number[];
    '3AndD': number[];
    perimeterDefender: number[];
    reboundSpecialist: number[];
    playmakingBig: number[];
    stretchBig: number[];
    rollingBig: number[];
    rimProtector: number[];
}

// Implement the interface with the archetypeRatings object
export const archetypeRatings: ArchetypeRatings = {
    playmaker: [7, 4, 6, 7, 10, 5, 10, 14, 14, 6, 14, 6],
    slasher: [12, 4, 14, 13, 6, 4, 9, 7, 11, 6, 10, 6],
    slashAndSplash: [12, 4, 14, 13, 9, 14, 11, 7, 11, 6, 10, 6],
    shootingSpecialist: [7, 4, 6, 7, 14, 14, 14, 5, 6, 5, 10, 6],
    '3AndD': [13, 10, 8, 7, 4, 11, 7, 4, 6, 12, 10, 11],
    perimeterDefender: [14, 10, 10, 4, 4, 4, 6, 4, 6, 12, 6, 16],
    reboundSpecialist: [8, 12, 14, 4, 4, 4, 6, 4, 6, 16, 7, 11],
    playmakingBig: [6, 10, 8, 6, 6, 4, 8, 13, 10, 6, 12, 6],
    stretchBig: [6, 10, 8, 6, 12, 12, 11, 5, 6, 6, 10, 6],
    rollingBig: [6, 13, 11, 13, 8, 3, 5, 3, 4, 9, 10, 6],
    rimProtector: [4, 16, 14, 5, 3, 3, 3, 3, 3, 14, 6, 15],
};


// Define TypeFactors interface
export type TypeFactors = {
    [key in Position]: {
        [key: string]: number;
    };
}

// Define the type factors for each position
export const typeFactors: TypeFactors = {
    [Position.G]: { spd: 1.05, ft: 1.1, hndl: 1.05, oiq: 1.05 },
    [Position.GF]: { ft: 1.05, mid: 1.05, hndl: 1.05, oiq: 1.05 },
    [Position.F]: { jmp: 1.05, diq: 1.05 },
    [Position.FC]: { reb: 1.05, diq: 1.05 },
    [Position.C]: { stre: 1.05, ins: 1.05, ft: 0.95, reb: 1.05, diq: 1.05 },
};
