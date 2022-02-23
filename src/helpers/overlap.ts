import { Section, Timeslot, Time, Term, Day } from "../data/DataDefinition/SectionDD";
import { groupTimeSlotsByDays } from "./groupby";

/**
 * make Timeslot from start and end times in 24 hour time
 * @param {string} startTime - e.g. "15:00"
 * @param {string} endTime -  e.g. "16:30"
 * @returns {Timeslot}
 */
export const make_timeslot = (startTime: string, endTime:string, day:Day, term:Term): Timeslot => {
  let startArr: number[] = startTime.split(":").map((s) => parseInt(s));
  let endArr: number[] = endTime.split(":").map((s) => parseInt(s));
  let nstart: number = (startArr[0]*60)+startArr[1];
  let nend: number = (endArr[0]*60)+endArr[1];
  return {start_time: nstart, end_time: nend, day:day, term:term};
}

/**
 * return true if two timeslots overlap
 * @param {Timeslot} ts1
 * @param {Timeslot} ts2
 * @returns {boolean}
 */
export const is_overlap_timeslots = (ts1:Timeslot, ts2:Timeslot): boolean => {
 let s1: Time = ts1.start_time; let e1: Time = ts1.end_time;
 let s2: Time = ts2.start_time; let e2: Time = ts2.end_time;
 return ((ts1.term === ts2.term) && 
          (ts1.day === ts2.day) &&
          (((e2 > e1) && (s2 < e1)) ||
           ((e2 <= e1) && (e2 > s1))));
}

/**
 * return true if two schedules overlap
 * @param {TImeslot[]} sch1
 * @param {TImeslot[]} sch2
 * @returns {boolean}
 */
export const is_overlap_schedules = (sch1:Timeslot[], sch2:Timeslot[]): boolean => {
  for(let i=0; i<sch1.length; i++) {
    for(let j=0; j<sch2.length; j++) {
      if(is_overlap_timeslots(sch1[i], sch2[j])) {
        return true;
      }
    }
  }
  return false;
}

/**
 * return true if two Sections have an overlapping timeslot in their schedules
 * @param {Section} c1
 * @param {Section} c2
 * @returns {boolean}
 */
export const is_overlap_sections = (c1:Section, c2:Section): boolean => {
  return is_overlap_schedules(c1.schedule, c2.schedule)
}


/**
 * return true if no timeslots in array are at the same time
 * @param {Timeslot[]} timeSlots - Array of TimeSlots to check
 * @returns {boolean} 
*/
export const is_overlap_lotimeslots = (timeSlots:Timeslot[]): boolean => {
  const sortedTimeSlots = timeSlots.slice().sort((ts_a, ts_b) => ts_a.start_time - ts_b.start_time);

  for(let i=0; i<sortedTimeSlots.length-1; i++) {
    if(is_overlap_timeslots(sortedTimeSlots[i], sortedTimeSlots[i+1])) return false;
  }
  return true;
}


/**
 * return true if no sections in array are at the same time
 * @param {Section[]} sections - Array of sections to check
 * @returns {boolean} 
 * REQUIRES: timeslots in the schedule of each individual section do NOT overlap
*/
export const is_overlap_losections = (sections:Section[]): boolean => {
  let timeSlots = sections.reduce(
    (lots:Timeslot[], sect:Section) => lots.concat(sect.schedule),
     []
  );
  return is_overlap_lotimeslots(timeSlots);
}


/**
 * return true if sections are not at the given bad times
 * @param {Section[]} sections - Array of sections to check
 * @param {Timeslot[]} badTimes - Array of times that don't work
 * @returns {boolean}
 * REQUIRES: sections do not overlap
 */
 export const is_overlap_bad_times = (sections:Section[], badTimes:Timeslot[]): boolean => {
  let timeSlots = sections.reduce(
    (lots:Timeslot[], sect:Section) => lots.concat(sect.schedule),
     []
  );
  timeSlots = timeSlots.concat(badTimes);
  return is_overlap_lotimeslots(timeSlots);
}