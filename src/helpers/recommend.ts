import { Section, Timeslot, Time, Schedule, Term, Day } from "../data/DataDefinition/SectionDD";
import { groupDays } from "./groupby";

/**
 * return the variance of an array of numbers
 * @param {number[]} arr
 * @returns {number}
 */
export const findVariance = (arr:number[]):number => {
  if(!arr.length){
    throw new Error("cannot take variance of empty array");
  };
  const sum = arr.reduce((acc, val) => acc + val);
  const mean = sum / arr.length;
  let variance = 0;
  arr.forEach(num => {
    variance += ((num - mean) * (num - mean));
  });
  return variance / arr.length;
};

/**
 * return the earliest start time out of all timeslots
 * @param {Timeslot[]} lots 
 */
export const findEarliestStart = (lots:Timeslot[]): Time => {
  if(!lots.length){
    throw new Error("cannot find earliest start of empty array");
  };
  return lots.reduce((min:number, ts:Timeslot) => {
    return (ts.start_time < min) ? ts.start_time : min
  },
  Number.MAX_VALUE)
}

/**
 * return the latest end time out of all timeslots
 * @param {Timeslot[]} lots
 */
 export const findLatestEnd = (lots:Timeslot[]): Time => {
  if(!lots.length){
    throw new Error("cannot find latest end of empty array");
  };
  return lots.reduce((max:number, ts:Timeslot) => {
    return (ts.end_time > max) ? ts.end_time :  max
  },
  Number.MIN_VALUE)
}

/**
 * return the variance in start times for a schedule
 * @param {Section[]} los - the schedule
 * @returns {number}
 */
export const findStartVariance = (los:Section[]): number => {
  console.log(los)
  const lolots:Timeslot[][] = groupDays(los.flatMap((sect) => sect.schedule));
  console.log(lolots)
  return findVariance(lolots.map(findEarliestStart));
}

/**
 * compare two possible scheduling solutions:
 * return the schedule with the lowest variance in start time (or first if same)
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_consistent = (los1: Section[], los2: Section[]): Section[] => {
  return (findStartVariance(los1) <= findStartVariance(los2)) ? los1 : los2;
}

/**
 * compare two possible scheduling solutions:
 * return the schedule with the lowest sum of time gaps between sections every day (or the first if same)
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_compact = (los1: Section[], los2: Section[]): Section[] => {
    return []
}

/**
 * compare two possible scheduling solutions:
 * return the schedule with the highest sum of time gaps between sections every day (or the first if same)
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
 export const most_scatter = (los1: Section[], los2: Section[]): Section[] => {
    return []
 }

/**
 * compare two possible scheduling solutions:
 * return schedule with earliest start time out of all days (or the first if same).
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_early_start = (los1: Section[], los2: Section[]): Section[] => {
  const t1:Time = findEarliestStart(los1.flatMap(sect => sect.schedule));
  const t2:Time = findEarliestStart(los2.flatMap(sect => sect.schedule));
  return (t1 <= t2) ? los1 : los2;
}

/**
 * compare two possible scheduling solutions:
 * return schedule with latest start time (or the first if same). That is...
 * for each schedule choose the time such that it is the earliest start time out of all days to do the comparison
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_late_start = (los1: Section[], los2: Section[]): Section[] => {
  const t1:Time = findEarliestStart(los1.flatMap(sect => sect.schedule));
  const t2:Time = findEarliestStart(los2.flatMap(sect => sect.schedule));
  return (t1 >= t2) ? los1 : los2;
}

/**
 * compare two possible scheduling solutions:
 * return schedule with earliest end time (or the first if same). That is...
 * for each schedule choose the time such that it is the latest end time out of all days to do the comparison
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_early_end = (los1: Section[], los2: Section[]): Section[] => {
  const t1:Time = findLatestEnd(los1.flatMap(sect => sect.schedule));
  const t2:Time = findLatestEnd(los2.flatMap(sect => sect.schedule));
  return (t1 <= t2) ? los1 : los2;
}

/**
 * compare two possible scheduling solutions:
 * return schedule with latest end time out of all days (or the first if same).
 * @param {Section[]} los1 
 * @param {Section[]} los2
 * @returns {Section[]} 
 */
export const most_late_end = (los1: Section[], los2: Section[]): Section[] => {
  const t1:Time = findLatestEnd(los1.flatMap(sect => sect.schedule));
  const t2:Time = findLatestEnd(los2.flatMap(sect => sect.schedule));
  return (t1 >= t2) ? los1 : los2;
}


/**
 * return true if the list of sections has a day where no sections are scheduled
 * @param {Section[]} los
 * @returns {boolean} 
 */
export const is_free_day = (los: Section[]): boolean => {
  const lots:Timeslot[] = los.flatMap(sect => sect.schedule);
  let chk = {Mon:true,Tue:true,Wed:true,Thu:true,Fri:true};
  for(let i=0; i<lots.length; i++) {
    chk[lots[i].day] = false
  }
  return chk.Mon || chk.Tue || chk.Wed || chk.Thu || chk.Fri;
}