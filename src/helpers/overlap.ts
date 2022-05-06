import { Section, Timeslot, Time, Term, Day } from "../data/DataDefinition/SectionDD";
import { groupTimeSlotsByDays } from "./groupby";
import { Cell_display } from "./time";

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
 * return true if no timeslots in array are at the same time
 * @param {Timeslot[]} timeSlots - Array of TimeSlots to check
 * @returns {boolean} 
*/
export const is_overlap_lotimeslots = (timeSlots:Timeslot[]): boolean => {
  let sortedByDays:Timeslot[][] = groupTimeSlotsByDays(timeSlots).slice();
  sortedByDays.forEach((lots:Timeslot[]) => lots.sort((ts_a, ts_b) => ts_a.start_time - ts_b.start_time));
  let sortedByTimeNDays:Timeslot[] = sortedByDays.flat();

  for(let i=0; i<sortedByTimeNDays.length-1; i++) {
    if(is_overlap_timeslots(sortedByTimeNDays[i], sortedByTimeNDays[i+1])) return true;
  }
  return false;
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





// EFFECTS: create a subgroup of non-overlapping cells
//          within the given overlap group
// TODO: fix duplicate bug [121-L1V, 110-L1S, 121-L1B, 121-L1L]
export const subGroupByNonOverlap = (group: Cell_display[]) => {
  let rsf = [];
  let worklist = [...group];

  for (const cell of group) {
    if (worklist.length === 0) {break}
    // console.log(worklist)
      let list = [cell];
      for (const wrk of worklist) {
        if (list.every(l => !overlapCells(l, wrk))) {
            list.push(wrk)
            worklist = worklist.filter(x => x !== wrk && x !== cell)
        } 
      }
      worklist = worklist.filter(x => x !== cell)
      rsf.push(list)
  }
  return rsf;
}

//EFFECTS: return true if two cells overlap each other
export const overlapCells = (c1: Cell_display, c2: Cell_display) => {
  let s1: Time = c1.start; let e1: Time = c1.end;
  let s2: Time = c2.start; let e2: Time = c2.end;
  return (((e2 > e1) && (s2 < e1)) || ((e2 <= e1) && (e2 > s1)))
}



// export const subGroupByNonOverlap = (group: Cell_display[]) => {
//   group.forEach(g => console.log(g))
//   console.log('-------')
//   let rsf = [];
//   let worklist = group;

//   for (const cell of group) {
//     let l = [cell]
//     worklist.forEach(g => {
//       if (l.every(item => !overlapCells(item, g))) {
//         l.push(g)
//         const indx_g = worklist.indexOf(g);
//         worklist.splice(indx_g, 1)
//       }
//     })
//     rsf.push(l);   
//   }
//   return rsf;
// }