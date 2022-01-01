import React from "react";
import { Section,Schedule,Timeslot,Time,Day,Term } from "../src/data/DataDefinition/SectionDD";

//CONSTANTS:
const CRIT1: PredData = {pred: crit1_not_same_time, 
  isKey:false};
const CRIT2: PredData = {pred: crit2_not_bad_time, 
  isKey:true, optKey:"badTimes"};
const CRIT3: PredData = {pred: crit3_all_req, 
  isKey:true, optKey:"courseReq"};
const CRIT4: PredData = {pred: crit4_number_req, 
  isKey:true, optKey:"numReq"};

/*---------------------------------------------------------------------------*/
//DATA:

/**
 * Data for criteria of Solve() that solves schedule
 * @typedef {Object} SolveOptions
 * @property {Timeslot[]} [badTimes] - times that sections cannot be scheduled
 * @property {String[]} [coursesReq] - names of courses required
 * @property {number} [numReq] - number of courses required (numReqMin should be undefined)
 * @property {number} [numReqMin] - minimum number of courses required (numReq should be undefined)
 */
interface SolveOptions {
  badTimes?: Timeslot[],
  courseReq?: String[],
  numReq?: number,
  numReqMin?: number
}

/**
 * Predicate function to test criteria. 
 * @callback Pred
 * @param {Section[]} sections to test if criteria is met
 * @param {any} [optdata] data to test sections against depending on predicate
 */
type Pred = (arg1:Section[], arg2?:any) => boolean

/**
 * Criteria function and data to test against the sections. Passed to scheduling solver
 * @typedef {Object} PredData
 * @property {Pred} pred Predicate function to test criteria.
 * @property {boolean} isKey Specifies whether key is defined (which implies options data needed)
 * @property {string} [optKey] key to access data in SolveOptions to create a closure 
 *                                (or false if none)
 */
interface PredData {
  pred: Pred
  isKey: boolean
  optKey?: keyof SolveOptions
}

/*----------------------------------------------------------*/
//FUNCTIONS:

/**
 * make string of course subject, number, and activity e.g. "CPSC110Laboratory"
 * @param {Section} c
 * @returns {string}
 */
function get_course_name(c:Section): string {
  return (c.subject + c.course + c.activity);
}

/**
 * make Timeslot from start and end times in 24 hour time
 * @param {string} startTime - e.g. "15:00"
 * @param {string} endTime -  e.g. "16:30"
 * @returns {Timeslot}
 */
function make_timeslot(startTime: string, endTime:string, day:Day, term:Term): Timeslot {
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
function is_overlap_timeslots(ts1:Timeslot, ts2:Timeslot): boolean {
 let s1: Time = ts1.start_time; let e1: Time = ts1.end_time;
 let s2: Time = ts2.start_time; let e2: Time = ts2.end_time;
 return ((ts1.term === ts2.term) && 
          (ts1.day === ts2.day) &&
          (((e2 > e1) && (s2 < e1)) ||
           ((e2 <= e1) && (e2 > s1))));
}

/**
 * return true if two schedules overlap
 * @param {Schedule} sch1
 * @param {Schedule} sch2
 * @returns {boolean}
 */
 function is_overlap_schedules(sch1:Schedule, sch2:Schedule): boolean {
  for(let i=0; i<sch1.length; i++) {
    for(let j=i+1; j<sch2.length; j++) {
      if(is_overlap_timeslots(sch1[i], sch2[j])) {
        return false;
      }
    }
  }
  return true;
 }

/**
 * return true if two Sections have an overlapping timeslot in their schedules
 * @param {Section} c1
 * @param {Section} c2
 * @returns {boolean}
 */
function is_overlap_sections(c1:Section, c2:Section): boolean {
  return is_overlap_schedules(c1.schedule, c2.schedule)
}


/**
 * filter list of sections to only those available
 * @param {Section[]} sections - Array of sections to filter
 * @returns {Section[]} sections that are available
 */
function filter_not_full(sections:Section[]): Section[] {
  return sections.filter((sect) => 
    (sect.status !== "Full"));
}

/**
 * return true if no sections are at the same time
 * @param {Section[]} sections - Array of sections to check
 * @returns {boolean} 
*/
function crit1_not_same_time(sections:Section[]): boolean {
  for(let i=0; i<sections.length; i++) {
    for(let j=i+1; j<sections.length; j++) {
      if(is_overlap_sections(sections[i], sections[j])) {
        return false;
      }
    }
  }
  return true;
}

/**
 * return true if sections are not at the given time
 * @param {Section[]} sections - Array of sections to check
 * @param {Timeslot[]} badTimes - Array of times that don't work
 * @returns {boolean}
 */
 function crit2_not_bad_time(sections:Section[], badTimes:Timeslot[]): boolean {
  for(let i=0; i<sections.length; i++) {
    if(is_overlap_schedules(sections[i].schedule, badTimes)) {
      return false;
    }
  }
  return true;
}

/**
 * return true if all required classes are present
 * @param {Section[]} sections - Array of sections to check
 * @param {string[]} req - Names of required courses
 * @returns {boolean}
 */
 function crit3_all_req(sections:Section[], req: String[]): boolean {
  for(let i=0; i<req.length; i++) {
    let wasFound: boolean = false
    for(let j=0; j<sections.length; j++) {
      let sect: Section = sections[j];
      let courseName:string = sect.subject + sect.course + sect.activity;
      if(courseName === req[i]) {
        wasFound = true;
        break;
      }
    }
    if(!wasFound){
      return false;
    }
  }
  return true;
}

/**
 * return true if there is the required number of courses
 * @param {Section[]} sections - Array of sections to check
 * @param {number} numReq - number of courses required
 * @returns {boolean}
 */
 function crit4_number_req(sections:Section[], numReq: number): boolean {
  return sections.length === numReq;
}

/**
 * find the most optimized course based on criteria
 * @param {Section[]} sections - sections to schedule
 * @param {PredData[]} predData - the schedule criteria in order of priority
 * @param {SolveOptions} opt - specifies data and details for criteria
 * @todo
 */
function idea_for_solve(sections:Section[], predData:PredData[], opt:SolveOptions,) {

  let crits:Pred[] = predData.map((pd:PredData) => {
    if (typeof pd.optKey === "string"){
      let key = pd.optKey as keyof SolveOptions
      let closure:Pred = (loc:Section[]) => {return pd.pred(loc, opt[key])};
      return closure;
    } else {
      return pd.pred;
    }
  });

  const fn_for_btree = (picked:Section[], left:Section[]) => {

  };

  fn_for_btree(sections, []);
} 






module.exports = {
  get_course_name: get_course_name,
  make_timeslot: make_timeslot,
  is_overlap_timeslots: is_overlap_timeslots,
  is_overlap_schedules:is_overlap_schedules,
  is_overlap_sections: is_overlap_sections,
  filter_not_full: filter_not_full,
  crit1_not_same_time: crit1_not_same_time,
  crit2_not_bad_time: crit2_not_bad_time,
  crit3_all_req: crit3_all_req,
  crit4_number_req: crit4_number_req,
}