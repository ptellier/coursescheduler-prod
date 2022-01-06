import {
  Section,
  Timeslot,
  Time,
  Schedule,
  Term,
  Day,
} from "../data/DataDefinition/SectionDD";
import { groupDays } from "./groupby";

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
  console.log(los);
  const lolots: Timeslot[][] = groupDays(los.flatMap((sect) => sect.schedule));
  console.log(lolots);
  return findVariance(lolots.map(findEarliestStart));
};

/**
 * compare two possible scheduling solutions:
 * return the schedule with the lowest variance in start time (or first if same)
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
export const most_consistent = (
  los1: Section[],
  los2: Section[]
): Section[] => {
  return findStartVariance(los1) <= findStartVariance(los2) ? los1 : los2;
};

/**
 * compare two possible scheduling solutions:
 * return the schedule with the lowest sum of time gaps between sections every day (or the first if same)
 * @param {Section[]} los1 ; Schedule
 * @param {Section[]} los2 ; Schedule
 * @returns {Section[]}
 */
export const most_compact = (los1: Section[], los2: Section[]): Section[] => {
  //1. los = [CPSC121, CPSC110]
  const time_gap1 = calculate_timegap(los1);
  const time_gap2 = calculate_timegap(los2);
  return time_gap1 >= time_gap2 ? los1 : los2;
};

/**
 * calculate total time gaps in los
 * @param {Section[]} los
 * @returns {number}
 */
export const calculate_timegap = (los: Section[]): number => {
  //2. schedules = [[mon-11~12, wed-11~12, fri-11~12], [mon-13~14, wed-13~14, fri-13~14]]
  const schedules = los.map((s: Section) => s.schedule);

  //3. destructured_schedules = [mon-11~12, wed-11~12, fri-11~12, mon-13~14, wed-13~14, fri-13~14]
  const schedules_deconstructed = schedules.reduce(
    (sch, acc) => [...sch, ...acc],
    []
  );

  //4. group_schedules_by_day = [[mon-11~12, mon-13~14], [wed-11~12, wed-13~14,], [fri-11~12, fri-13~14]]
  const schedules_grouped = groupDays(schedules_deconstructed);

  //5. for each group, sort by start time ** test this
  // CONSTRAINT: there are no overlaps
  const schedules_sorted = schedules_grouped.map((ts_group) =>
    sort_timeslots(ts_group)
  );

  //6. get groups of start times
  const start_times = schedules_sorted.map((ts_group) =>
    ts_group.map((ts) => ts.start_time)
  );
  const end_times = schedules_sorted.map((ts_group) =>
    ts_group.map((ts) => ts.end_time)
  );
  //7. remove min for start_times, max for end_times
  const removed_min = start_times.map((starts) => starts.splice(1));
  const removed_max = end_times.map((ends) => ends.splice(0, ends.length - 1));

  //8. sum up the times
  const sum_start = removed_min.map((starts) =>
    starts.reduce((s, acc) => s + acc, 0)
  );
  const sum_end = removed_max.map((ends) =>
    ends.reduce((e, acc) => e + acc, 0)
  );

  //9. subtract element wise substraction: sum_start - sum_end
  //   calculates (e1 - s2) + (e2 - s3) + ...  = (e1 + e2 + ...) + (-s2 + s3 + ...)
  const result = sum_start.map((n, i) => n - sum_end[i])

  return result.reduce((x, acc) => x + acc, 0);
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
 * compare two possible scheduling solutions:
 * return the schedule with the highest sum of time gaps between sections every day (or the first if same)
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
export const most_scatter = (los1: Section[], los2: Section[]): Section[] => {
  return [];
};

/**
 * compare two possible scheduling solutions:
 * return schedule with earliest start time out of all days (or the first if same).
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
export const most_early_start = (
  los1: Section[],
  los2: Section[]
): Section[] => {
  const t1: Time = findEarliestStart(los1.flatMap((sect) => sect.schedule));
  const t2: Time = findEarliestStart(los2.flatMap((sect) => sect.schedule));
  return t1 <= t2 ? los1 : los2;
};

/**
 * compare two possible scheduling solutions:
 * return schedule with latest start time (or the first if same). That is...
 * for each schedule choose the time such that it is the earliest start time out of all days to do the comparison
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
export const most_late_start = (
  los1: Section[],
  los2: Section[]
): Section[] => {
  const t1: Time = findEarliestStart(los1.flatMap((sect) => sect.schedule));
  const t2: Time = findEarliestStart(los2.flatMap((sect) => sect.schedule));
  return t1 >= t2 ? los1 : los2;
};

/**
 * compare two possible scheduling solutions:
 * return schedule with earliest end time (or the first if same). That is...
 * for each schedule choose the time such that it is the latest end time out of all days to do the comparison
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
export const most_early_end = (los1: Section[], los2: Section[]): Section[] => {
  const t1: Time = findLatestEnd(los1.flatMap((sect) => sect.schedule));
  const t2: Time = findLatestEnd(los2.flatMap((sect) => sect.schedule));
  return t1 <= t2 ? los1 : los2;
};

/**
 * compare two possible scheduling solutions:
 * return schedule with latest end time out of all days (or the first if same).
 * @param {Section[]} los1
 * @param {Section[]} los2
 * @returns {Section[]}
 */
export const most_late_end = (los1: Section[], los2: Section[]): Section[] => {
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
