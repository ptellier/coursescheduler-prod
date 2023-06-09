import { Schedule } from "../data/DataDefinition/ScheduleDD";
import {
  Section,
  Timeslot,
  Time,
} from "../data/DataDefinition/SectionDD";
import { group5Days, groupTimeSlotsByDays } from "./groupby";
import { convertToTimeSlot } from "./time";


/**
 * recommends sections based on each of categories:
 * consistency, compactness, early and late start and end times, and free day
 * @param {Schedule[]} 
 * @returns 
 */
 export const recommend = (schedules: Schedule[]) => {
  const result = {
    compact: schedules.sort((sch1, sch2) => sch1.timeGap > sch2.timeGap ? 1 : -1)[0].sections,
    scatter: schedules.sort((sch1, sch2) => sch1.timeGap < sch2.timeGap ? 1 : -1)[0].sections,
    consistent: schedules.sort((sch1, sch2) => sch1.startVariance > sch2.startVariance ? 1 : -1)[0].sections,
    freeDay: schedules.sort((sch1, sch2) => sch1.numFreeDays < sch2.numFreeDays ? 1 : -1)[0].sections,
  }
  return result
}

/**
 * return the variance of an array of numbers
 * @param {number[]} arr
 * @returns {number}
 */
export const findVariance = (arr: number[]): number => {
  if (!arr.length) {
    throw new Error("cannot take variance of empty array");
  }
  const sum = arr.reduce((acc, val) => acc + val);
  const mean = sum / arr.length;
  let variance = 0;
  arr.forEach((num) => {
    variance += (num - mean) * (num - mean);
  });
  return variance / arr.length;
};

/**
 * return the earliest start time out of all timeslots
 * @param {Timeslot[]} lots
 */
export const findEarliestStart = (lots: Timeslot[]): Time => {
  if (!lots.length) {
    throw new Error("cannot find earliest start of empty array");
  }
  return lots.reduce((min: number, ts: Timeslot) => {
    return ts.start_time < min ? ts.start_time : min;
  }, Number.MAX_VALUE);
};

/**
 * return the latest end time out of all timeslots
 * @param {Timeslot[]} lots
 */
export const findLatestEnd = (lots: Timeslot[]): Time => {
  if (!lots.length) {
    throw new Error("cannot find latest end of empty array");
  }
  return lots.reduce((max: number, ts: Timeslot) => {
    return ts.end_time > max ? ts.end_time : max;
  }, Number.MIN_VALUE);
};

/**
 * return the variance in start times for a schedule
 * @param {Section[]} los - the schedule
 * @returns {number}
 */
export const findStartVariance = (los: Section[]): number => {
  const lolots: Timeslot[][] = groupTimeSlotsByDays(los.flatMap((sect) => sect.schedule));
  return findVariance(lolots.map(findEarliestStart));
};

/**
 * compare two possible scheduling solutions:
 * return the schedule with the lowest variance in start time (or first if same)
 * if one array is empty return the other
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
export const most_consistent = (los1: Section[], los2: Section[]): Section[] => {
  if (!los1.length) {return los2};
  if (!los2.length) {return los1};
  return findStartVariance(los1) <= findStartVariance(los2) ? los1 : los2;
};

/**
 * compare two possible scheduling solutions:
 * return the schedule with the lowest sum of time gaps between sections every day (or the first if same)
 * if one array is empty return the other
 * @param {Section[]} los1 ; Schedule
 * @param {Section[]} los2 ; Schedule
 * @returns {Section[]}
 */
export const most_compact = (los1: Section[], los2: Section[]): Section[] => {
  if (!los1.length) {return los2};
  if (!los2.length) {return los1};

  const los1_processed = convertToTimeSlot(los1)
  const los2_processed = convertToTimeSlot(los2)

  const time_gap1 = calculateTimeGap(los1_processed);
  const time_gap2 = calculateTimeGap(los2_processed); // You don't need this
  return time_gap1 <= time_gap2 ? los1 : los2;
};

/**
 * compare two possible scheduling solutions:
 * return the schedule with the highest sum of time gaps between sections every day (or the first if same)
 * if one array is empty return the other
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
 export const most_scatter = (los1: Section[], los2: Section[]): Section[] => {
  if (!los1.length) {return los2};
  if (!los2.length) {return los1};

  const los1_processed = convertToTimeSlot(los1)
  const los2_processed = convertToTimeSlot(los2)

  const time_gap1 = calculateTimeGap(los1_processed);
  const time_gap2 = calculateTimeGap(los2_processed);
  return time_gap1 >= time_gap2 ? los1 : los2;
};

/**
 * calculate total time gaps in los
 * @param {Section[]} los
 * @returns {number}
 */
export const calculateTimeGap = (los: Section[]): number => {
  const schedules = los.map((s: Section) => s.schedule);
  const schedules_deconstructed = schedules.reduce((sch, acc) => [...sch, ...acc],[]);
  // const schedules_deconstructed = schedules.flatMap(sch => sch);
  const schedules_grouped = groupTimeSlotsByDays(schedules_deconstructed);

  //5. for each group, sort by start time
  // CONSTRAINT: there are no overlaps
  const schedules_sorted = schedules_grouped.map((ts_group) => sort_timeslots(ts_group));

  //6. get groups of start and end times
  const start_times = schedules_sorted.map((ts_group) => ts_group.map((ts) => ts.start_time));
  const end_times = schedules_sorted.map((ts_group) => ts_group.map((ts) => ts.end_time));

  //7. remove min for start_times, max for end_times
  const removed_min = start_times.map((starts) => starts.splice(1));
  const removed_max = end_times.map((ends) => ends.splice(0, ends.length - 1));

  //8. sum up the times
  const sum_start = sum_times(removed_min);
  const sum_end = sum_times(removed_max);

  //9. sum_start - sum_end then get the sum
  const result_minutes = subtract_lists(sum_start, sum_end).reduce((x, acc) => x + acc, 0);
  return result_minutes / 60;
};

/**
 * sort given timeslots, lots (= schedule), by start_time
 * @param {Timeslot[]} lots
 * @returns {Timeslot[]}
 */
export const sort_timeslots = (lots: Timeslot[]) => {
  return lots.sort((ts1, ts2) => (ts1.start_time >= ts2.start_time ? 1 : -1));
};

/**
 * perform generic element wise subtraction 1ox1 - lox2
 * @param {number[]} lox1 
 * @param {number[]} lox2 
 * @returns {number[]}
 */
 const subtract_lists = (lox1: number[], lox2:number[]): number[] => {
  return lox1.map((n, i) => n - lox2[i])
};
/**
 * produce the sum for each list of time in llot, listof listof time
 * @param {Time[][]} llot
 * @returns {Time[]}
 */
const sum_times = (llot: Time[][]): Time[] => {
  return llot.map((lot) => lot.reduce((t, acc) => t + acc, 0));
};

/**
 * compare two possible scheduling solutions:
 * return schedule with earliest start time out of all days (or the first if same).
 * if one array is empty return the other
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
export const most_early_start = (
  los1: Section[],
  los2: Section[]
): Section[] => {
  if (!los1.length) {return los2};
  if (!los2.length) {return los1};
  const t1: Time = findEarliestStart(los1.flatMap((sect) => sect.schedule));
  const t2: Time = findEarliestStart(los2.flatMap((sect) => sect.schedule));
  return t1 <= t2 ? los1 : los2;
};

/**
 * compare two possible scheduling solutions:
 * return schedule with latest start time (or the first if same). That is...
 * for each schedule choose the time such that it is the earliest start time out of all days to do the comparison.
 * if one array is empty return the other
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
export const most_late_start = (
  los1: Section[],
  los2: Section[]
): Section[] => {
  if (!los1.length) {return los2};
  if (!los2.length) {return los1};
  const t1: Time = findEarliestStart(los1.flatMap((sect) => sect.schedule));
  const t2: Time = findEarliestStart(los2.flatMap((sect) => sect.schedule));
  return t1 >= t2 ? los1 : los2;
};

/**
 * compare two possible scheduling solutions:
 * return schedule with earliest end time (or the first if same). That is...
 * for each schedule choose the time such that it is the latest end time out of all days to do the comparison.
 * if one array is empty return the other
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
export const most_early_end = (los1: Section[], los2: Section[]): Section[] => {
  if (!los1.length) {return los2};
  if (!los2.length) {return los1};
  const t1: Time = findLatestEnd(los1.flatMap((sect) => sect.schedule));
  const t2: Time = findLatestEnd(los2.flatMap((sect) => sect.schedule));
  return t1 <= t2 ? los1 : los2;
};

/**
 * compare two possible scheduling solutions:
 * return schedule with latest end time out of all days (or the first if same).
 * if one array is empty return the other
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
export const most_late_end = (los1: Section[], los2: Section[]): Section[] => {
  if (!los1.length) {return los2};
  if (!los2.length) {return los1};
  const t1: Time = findLatestEnd(los1.flatMap((sect) => sect.schedule));
  const t2: Time = findLatestEnd(los2.flatMap((sect) => sect.schedule));
  return t1 >= t2 ? los1 : los2;
};

/**
 * return true if the list of sections has a day where no sections are scheduled
 * @param {Section[]} los
 * @returns {boolean}
 */
export const is_free_day = (los: Section[]): boolean => {
  const lots: Timeslot[] = los.flatMap((sect) => sect.schedule);
  let chk = { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true };
  for (let i = 0; i < lots.length; i++) {
    chk[lots[i].day] = false;
  }
  return chk.Mon || chk.Tue || chk.Wed || chk.Thu || chk.Fri;
};

/**
 * REQUIRES: los cannot be empty
 * EFFECTS: return the number of free days sections has
 * @param {Sectionp[]} los 
 * @returns {number}
 */
export const countFreeDays = (los:Section[]): number => {
  const losGroup = group5Days(los);
  return losGroup.filter(g => g.length === 0).length - 1;
}
