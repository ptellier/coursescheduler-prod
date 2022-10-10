import {
  Section,
  Timeslot,
} from "../data/DataDefinition/SectionDD";

/** filter out sections with !=term, waiting list, full - currently turned off for test
 * @param {Section[][]} groupOfSections
 * @returns {Section[][]}
 */
export const filterByTermStatusActivity = (
  groupOfSections: Section[][],
  term: string
): Section[][] => {
  let acc = []
  for (let sections of groupOfSections) {
    const filtered = sections.filter(
      (s) =>
        // s.status !== "Full" &&
        s.term === term &&
        s.activity !== "Waiting List"
    );
    acc.push(filtered)
  }

  return acc
};

/**
 * remove duplicated sections from los by subject && course && activity && schedule,
 * @param {*} los
 * @returns
 */
export const filterDuplicatedSchedules = (los: Section[]): Section[] => {
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
