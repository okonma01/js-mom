import { CompositeRating } from '../player/compositeRating';

// Define Rating class
export class Rating {
    hgt = 0;
    stre = 0;
    stam = 15;
    spd = 0;
    jmp = 0;
    ins = 0;
    mid = 0;
    tp = 0;
    ft = 0;
    pss = 0;
    hndl = 0;
    reb = 0;
    oiq = 0;
    diq = 0;
    dur = 1;    // durability (1 to 5)
    cons = 1;   // consistency (1 to 5)
    composite: CompositeRating;

    constructor() {
        // Initialize composite rating
        this.composite = new CompositeRating();
    }

    // Get attribute value
    get(attr: string): number {
        return this[attr];
    }

    // Update composite rating
    updateComposite(): void {
        this.composite.compose(this);
    }
}


// Get ratings as a string
export function getRatings(r: Rating): string {
    let result = '';
    for (let i = 1; i < 2; i++) {
        result = '\nATHLETICISM:\n';
        result += `Strength: ${r.stre}\n`;
        result += `Stamina: ${r.stam}\n`;
        result += `Speed: ${r.spd}\n`;
        result += `Jumping: ${r.jmp}\n`;
        result += `Durability: ${r.dur}\n`;
        result += '\nOFFENSE:\n';
        result += `Inside shot: ${r.ins}\n`;
        result += `Mid range: ${r.mid}\n`;
        result += `Three point: ${r.tp}\n`;
        result += `Free throw: ${r.ft}\n`;
        result += `Passing: ${r.pss}\n`;
        result += `Ball handle: ${r.hndl}\n`;
        result += '\nDEFENSE:\n';
        result += `Rebound: ${r.reb}\n`;
        result += '\nIQ:\n';
        result += `Offensive IQ: ${r.oiq}\n`;
        result += `Defensive IQ: ${r.diq}\n`;
    }
    return result;
}
