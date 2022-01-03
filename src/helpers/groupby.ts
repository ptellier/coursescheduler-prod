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
 * @param los 
 * @returns 
 */
 export const groupSections = (los: Section[]): Section[][] => {
    const result = groupBy(los, function (section:Section) {
        return [section.subject, section.course, section.activity];
    })
    return result
}

/**
 * group array into several sections by given conditions, fn
 * @param array 
 * @param f 
 * @returns 
 */
const groupBy = (array:Section[], f: Function) => {
    let groups:any = {};
    array.forEach(function (o) {
        let group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(group => groups[group])
}
