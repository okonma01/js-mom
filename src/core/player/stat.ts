/**
 * Represents the statistics of a basketball player.
 */
export interface PlayerStat {
    ast: number; // Assists
    benchTime: number; // Time spent on the bench
    blk: number; // Blocks
    courtTime: number; // Time spent on the court
    drb: number; // Defensive rebounds
    energy: number; // Energy level (0-100)
    fg: number; // Field goals made
    fgInside: number; // Inside field goals made
    fgMidrange: number; // Midrange field goals made
    fgThreepoint: number; // Three-point field goals made
    fga: number; // Field goals attempted
    fgaInside: number; // Inside field goals attempted
    fgaMidrange: number; // Midrange field goals attempted
    fgaThreepoint: number; // Three-point field goals attempted
    ft: number; // Free throws made
    fta: number; // Free throws attempted
    g: number; // Games played
    gs: number; // Games started
    mp: number; // Minutes played
    orb: number; // Offensive rebounds
    pf: number; // Personal fouls
    pts: number; // Points scored
    stl: number; // Steals
    tov: number; // Turnovers
}

/**
 * Represents the statistics of a basketball player.
 */
export class PlayerStat implements PlayerStat {
    ast = 0;
    benchTime = 0;
    blk = 0;
    courtTime = 0;
    drb = 0;
    energy = 100;
    fg = 0;
    fgInside = 0;
    fgMidrange = 0;
    fgThreepoint = 0;
    fga = 0;
    fgaInside = 0;
    fgaMidrange = 0;
    fgaThreepoint = 0;
    ft = 0;
    fta = 0;
    g = 0;
    gs = 0;
    mp = 0;
    orb = 0;
    pf = 0;
    pts = 0;
    stl = 0;
    tov = 0;
}

export default PlayerStat;
