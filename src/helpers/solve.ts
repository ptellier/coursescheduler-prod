import React from 'react'
import { ListOfSection, Section } from '../data/DataDefinition/SectionDD'

/**
 * A timeslot for a course with start and end time
 * @typedef {Object} Node
 * @property {ListOfSection} assigned; listof Section that are assigned
 * @property {ListOfSection} remain; listof Section remainng to be assigned
 */
interface Node {
    assigned: ListOfSection
    remain: ListOfSection
}

/**
 * produce all of the valid (listof sections) that can be taken
 * valid schedule means:
 * 1. All sections in assigned are unique
 * 2. All sections in assinged satisfy user's required courses
 * @param {ListOfSection} los 
 * @returns {ListOfSection[]}
 */
export const solve = (los: ListOfSection): ListOfSection[] => {
    const og_los = los
    const fn_for_node = (node: Node): ListOfSection[] => {
        if (finished(node)) {
            if (goodSchedule(node)) {
                return [node.assigned]
            } else {
                return []
            }
        } else {
            return fn_for_node(pick(node)).concat(fn_for_node(skip(node)))
        }
    }
    /**
     * produce true if given node's remain is empty
     * @param {Node} node 
     * @returns {Boolean}
     */
    const finished = (node:Node): Boolean => {
        return empty(node.remain)
    }

    /**
     * produce true if given' node's assigned satisfy conditions
     * @param {Node} node 
     * @returns {Boolean}
     */
    const goodSchedule = (node:Node): Boolean => {
        return !(alreadyContains(node.assigned)) &&
                complete(node.assigned, og_los)
    }

    /**
     * pick the first section of remain and place it in assigned
     * @param {Node} node 
     * @returns {Node}
     */
    const pick = (node:Node): Node => {
        const [first, ...rest] = node.remain
        return { "assigned": [first, ...node.assigned], "remain": rest }
    }
    /**
     * skip the first section of remain
     * @param {Node} node 
     * @returns {Node}
     */
    const skip = (node:Node): Node => {
        const [first, ...rest] = node.remain
        return { "assigned": node.assigned, "remain": rest }
    }

    return fn_for_node({ "assigned": [], "remain": los })
}


/**
 * produce true if sections have duplicate, false otherwise
 * CPSC121 Lecture101, CPSC121 Lecture102 will produce true
 * CPSC121 Lecture101, CPSC210 Lecture102 will produce false
 * @param {ListOfSection} los 
 * @returns {Boolean}
 */
export const alreadyContains = (los: ListOfSection):Boolean => {
    const alreadyContains = (los: ListOfSection):Boolean => {
        const [first, ...rest] = los
        if (empty(los)) { return false }
        else {
            if (rest.some(s => matchCourse(s, first))) {
                return true
            } else {
                return alreadyContains(rest)
            }
        }

    }
    if (empty(los)) {
        return true
    } else {
        return alreadyContains(los)
    }
}

/**
 * produce true if all necessary lectures are included in assigned
 * @param {ListOfSection} assigned 
 * @param {ListOfSection} og_los 
 * @returns {Boolean}
 */
export const complete = (assigned:ListOfSection, og_los:ListOfSection): Boolean => {
    const included = (og_s: Section) => {
        return !(assigned.some(a => matchCourse(a, og_s)))
    }
    return empty(og_los.filter(og_s => included(og_s)))
}

/**
 * produce true if s1 and s2 equal in subject, course, ...TODO more items
 * @param {Section} s1 
 * @param {Section} s2 
 * @returns {Boolean}
 */
export const matchCourse = (s1:Section, s2:Section): Boolean => {
    return s1.subject === s2.subject &&
           s1.course == s2.course
}



/**
 * produce true if given array is empty
 */
export const empty = (l: any[]): Boolean => {
    return l.length === 0
}