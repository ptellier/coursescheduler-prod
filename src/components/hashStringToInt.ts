import {Section} from "../data/DataDefinition/SectionDD";

export async function hashStringToInt(str:string): Promise<number> {
    // Convert the string to an ArrayBuffer
    const encoder = new TextEncoder();
    const data: Uint8Array = encoder.encode(str);

    // Generate the hash using the SubtleCrypto API
    const hashBuffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash ArrayBuffer to a Uint8Array
    const hashArray: number[] = Array.from(new Uint8Array(hashBuffer));

    // Convert the Uint8Array to a hexadecimal string
    const hashHex: string = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // Convert the hexadecimal string to an integer
    const hashInt: number = parseInt(hashHex, 16);

    return hashInt;
}

export async function hashSectionToInt(sect:Section): Promise<number> {
    return hashStringToInt(sect.subject+sect.course+sect.activity+sect.term);
}

/**
 * UBC Course section
 * @typedef  {Object}   Section
 * @property {string}   name        - "CPSC 221 101"
 * @property {string}   subject     - "CPSC"
 * @property {string}   section     - "101"
 * @property {string}   course      - "221"
 * @property {Status}   status      - "Restricted", "Available", "Full"
 * @property {Activity} activity    - "Laboratory", "Lecture" "Tutorial", "Seminar"
 * @property {Term}     term        - "1", "2"
 * @property {Timeslot[]} schedule    - "List of timeslots for all meetings of the section"
 */