import React from "react";
import { Section } from "../data/DataDefinition/SectionDD";

/** filter out sections with !=term, waiting list, full - currently turned off for test
 * @param {Section[]} los
 * @returns {Section[]}
 */
export const filter_term_avail_waitlist = (los: Section[], term: string): Section[] => {
  return los.filter((c) => c.term === term && c.activity !== "Waiting List");
};

/**
 * removes duplicated sections from los by schedule
 * @param {*} los
 * @returns
 */
export const filter_duplicate_schedules = (los: Section[]): Section[] => {
  return los.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.schedule === value.schedule)
  );
};

/**
 * TODO
 * @param node
 * @returns
 */
 const filter_timeconflict = (node: Node) => {
    return true;
  };