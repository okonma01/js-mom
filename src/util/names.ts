import * as fs from 'fs';
import * as path from 'path';

// Define the file paths for the name files
const files = {
    firstMale: path.resolve(__dirname, 'dist.male.first'),
    firstFemale: path.resolve(__dirname, 'dist.female.first'),
    last: path.resolve(__dirname, 'dist.all.last'),
};

/**
 * Get a random name from a file
 * @param filename - The path to the file containing the names
 * @returns A random name from the file
 */
function getName(filename: string): string {
    const selected = Math.random() * 90.483;
    const fileContent = fs.readFileSync(filename, 'utf8');
    const lines = fileContent.split('\n');

    for (const line of lines) {
        const [name, , cumulative] = line.split(/\s+/);
        if (parseFloat(cumulative) > selected) {
            return name;
        }
    }

    return '';  // Return an empty string if the file is empty
}

/**
 * Get a random first name
 * @param gender - The gender of the name to get. If null, a random gender will be selected
 * @returns A random first name
 */
function getFirstName(gender: string | null = null): string {
    if (gender === null) {
        gender = ['male', 'female'][Math.floor(Math.random() * 2)];
    }

    if (!['male', 'female'].includes(gender)) {
        throw new Error("Only 'male' and 'female' are supported as gender");
    }

    const firstGender = `first${gender.charAt(0).toUpperCase()}${gender.slice(1)}`;
    return getName(files[firstGender]);
}

/**
 * Get a random last name
 * @returns A random last name
 */
export function getLastName(): string {
    return getName(files.last).charAt(0).toUpperCase() +
        getName(files.last).slice(1);
}

/**
 * Get a random full name
 * @param gender - The gender of the name to get. If null, a random gender will be selected
 * @returns A random full name
 */
export function getFullName(gender: string | null = null): string {
    return `${getFirstName(gender)} ${getLastName()}`;
}

// Example usage:
// const randomFirstName = getFirstName(); // Random gender
// const randomLastName = getLastName();
// const randomFullName = getFullName();

// console.log('Random First Name:', randomFirstName);
// console.log('Random Last Name:', randomLastName);
// console.log('Random Full Name:', randomFullName);
