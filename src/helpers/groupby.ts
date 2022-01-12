import React from "react";
import { Section, Schedule, Timeslot } from "../data/DataDefinition/SectionDD";

const ALL_DAY_NAMES:string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

/**
 * create subgroups of sections by course and activity
 * @example
 * [
 *  [110Lectures], 
 *  [110Labs], 
 *  [121lectures...], 
 *  [121labs...], 
 *  [121tutorials...]
 * ]
 * @param {Section[]} los 
 * @returns {Section[][]}
 */
export const groupSections = (los: Section[]): Section[][] => {
  const result = groupBy(los, function (section:Section) {
      return [section.subject, section.course, section.activity];
  })
  return result
}

/**
 * create subgroups of timeslots by day
 * @param {Timteslot[]} lots 
 * @returns {Timeslot[][]}
 */
export const groupDays = (lots: Timeslot[]): Timeslot[][] => {
  const result = groupBy(lots, (timeslot: Timeslot) => {
    return [timeslot.day];
  });
  return result
};

/**
 * Splits sections in a list into more sections with only one timeslot per schedule
 * @param {Section[]} los 
 * @returns {Section[]}
 * @todo
 */
export const splitSectionSchedule = (los:Section[]): Section[] => {
  const mylos:Section[] = los
  let rsf:Section[][] = [];
  for(const sect of mylos) {
    const nlos:Section[] = sect.schedule.map((ts:Timeslot) => {
      let nsect:Section = Object.assign({}, sect)
      nsect.schedule = [ts];
      return nsect as Section;
    })
    rsf.push(nlos);
  }
  return rsf.flat(1);
}

/**
 * create 5 subgroups of sections, one for each day
 * @param {Section[]} los
 * @returns {Section[][]}
 */
export const group5Days = (los: Section[]): Section[][] => {
  const losSplit = splitSectionSchedule(los);
  let rsf:Section[][] = [];
  for (const day in ALL_DAY_NAMES) {
    rsf.push(losSplit.filter((sect:Section) => sect.schedule[0].day === day));
  }
  return rsf;
};


/**
 * group sections in an array into an array several arrays by given conditions, fn
 * @param {any[]} array
 * @param {(any) => any} f
 * @returns {any[][]}
 */
const groupBy = (array: any[], f: Function): any[][] => {
  let groups: any = {};
  array.forEach(function (o) {
    let group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map((group) => groups[group]);
};
  