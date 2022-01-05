import React from "react";
import { Section, Timeslot } from "../data/DataDefinition/SectionDD";

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
  