import React from "react";
import { Section } from "../data/DataDefinition/SectionDD";

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
 * group sections in an array into an array several sections by given conditions, fn
 * @param {Section[]} array 
 * @param {(Section) => keyof Section} f
 * @returns {Section[][]}
 */
const groupBy = (los:Section[], f: Function): Section[][] => {
    let groups:any = {};
    los.forEach(function (sect) {
        let group = JSON.stringify(f(sect));
        groups[group] = groups[group] || [];
        groups[group].push(sect);
    });
    return Object.keys(groups).map(group => groups[group])
}
