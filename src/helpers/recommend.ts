import { Section, Timeslot, Time, Schedule, Term, Day } from "../data/DataDefinition/SectionDD";


/**
 * compare two possible scheduling solutions:
 * return the schedule with the lowest variance in start time (or first if same)
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_consistent = (los1: Section[], los2: Section[]): Section[] => {}

/**
 * compare two possible scheduling solutions:
 * return the schedule with the lowest sum of time gaps between sections every day (or the first if same)
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_compact = (los1: Section[], los2: Section[]): Section[] => {}

/**
 * compare two possible scheduling solutions:
 * return the schedule with the highest sum of time gaps between sections every day (or the first if same)
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
 export const most_scatter = (los1: Section[], los2: Section[]): Section[] => {}

/**
 * compare two possible scheduling solutions:
 * return schedule with earliest start time out of all days (or the first if same).
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_early_start = (los1: Section[], los2: Section[]): Section[] => {}

/**
 * compare two possible scheduling solutions:
 * return schedule with latest start time (or the first if same). That is...
 * for each schedule choose the time such that it is the earliest start time out of all days to do the comparison
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_late_start = (los1: Section[], los2: Section[]): Section[] => {}

/**
 * compare two possible scheduling solutions:
 * return schedule with earliest end time (or the first if same). That is...
 * for each schedule choose the time such that it is the latest end time out of all days to do the comparison
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_early_end = (los1: Section[], los2: Section[]): Section[] => {}

/**
 * compare two possible scheduling solutions:
 * return schedule with latest end time out of all days (or the first if same).
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_late_end = (los1: Section[], los2: Section[]): Section[] => {}


/**
 * return true if the list of sections has a day where no sections are scheduled
 * @param {Section[]} los
 * @returns {boolean} 
 */
export const is_free_day = (los1: Section[], los2: Section[]): Section[] => {}