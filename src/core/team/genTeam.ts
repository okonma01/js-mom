import { getLastName } from '../../util/names';
import { genPlayer } from '../player/genPlayer';
import { TeamGameSim } from '../team';

/**
 * Generates a new team with a random name and 15 players
 * @returns {TeamGameSim} - The generated team
 */
export function genTeam(): TeamGameSim {
    const team = new TeamGameSim();
    let teamName = getLastName();

    // Pluralize team name if it ends with 'ch' or 'sh'
    if (teamName.slice(-2) === 'ch' || teamName.slice(-2) === 'sh') {
        teamName += 'es';
    } else if (teamName.slice(-1) !== 's') {
        teamName += 's';
    }

    // Capitalize 'Mc' in team name
    if (teamName.slice(0, 2) === 'Mc') {
        teamName = teamName.slice(0, 2) + teamName.charAt(2).toUpperCase() + teamName.slice(3);
    }

    // Add 'Los' to the beginning of the team name
    teamName = 'Los ' + teamName;

    // Generate 15 players for the team
    for (let i = 0; i < 15; i++) {
        team.addPlayer(genPlayer(Math.floor(i / 3) + 1));
    }

    // Build the team
    team.name = teamName;
    team.setLineup();

    return team;
}
