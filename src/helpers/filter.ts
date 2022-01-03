import React from "react";
import {
  Section,
  Time,
  Schedule,
  Timeslot,
  Day,
  Term,
} from "../data/DataDefinition/SectionDD";

/** filter out sections with !=term, waiting list, full - currently turned off for test
 * @param {Section[]} los
 * @returns {Section[]}
 */
export const filter_term_avail_waitlist = (
  los: Section[],
  term: string
): Section[] => {
  return los.filter(
    (c) =>
      //c.status !== "Full" &&
      c.term === term && c.activity !== "Waiting List"
  );
};

/**
 * remove duplicated sections from los by subject && course && activity && schedule,
 * @param {*} los
 * @returns
 */
export const filter_duplicate_schedules = (los: Section[]): Section[] => {
  return los.filter(
    (s1, index, self) =>
      index ===
      self.findIndex(
        (s2) =>  s2.subject  ===  s1.subject  &&
                 s2.course   ===  s1.course   &&
                 s2.activity ===  s1.activity &&
                 JSON.stringify(s2.schedule.map((s:Timeslot) => {
                    return {start_time: s.start_time, end_time: s.end_time, day: s.day, term: s.term}
                  }
                ))
                 === 
                 JSON.stringify(s1.schedule.map((s:Timeslot) => {
                  return {start_time: s.start_time, end_time: s.end_time, day: s.day, term: s.term}
                }
                 )) 
      
      )
  );
};

/**
 * filter out sections that conflicts in time with rest of sections
 * @param node
 * @returns
 */
const filter_timeconflict = (node: Node) => {
  //TODO: Implement
  return true;
};
