import { Section } from '../../../data/DataDefinition/SectionDD'
import { tSectionTypes } from '../../../data/DataDefinition/CourseInfoDD'
// Organize Sections

// Sort Sections into labs, lectures, tutorial etc...
// @returnValue hasRestrictedSections  Boolean
// @returnValue sectionTypes           {"Lectures": sections[], "Lab": sections[] ....}
// @returnValue restrictedSectionTypes {"Lectures": sections[], "Lab": sections[] ....}
export const organizeSections = (listAllSections: Section[]) => {
    let sectionTypes: tSectionTypes = {}
    let restrictedSectionTypes: tSectionTypes = {}
    let hasRestrictedSections = false

    listAllSections.forEach((newSection) => {
        // Set Available and Restricted Sections to `selectedForScheduleSolver = true`
        newSection.selectedForScheduleSolver = newSection.status === 'Available' || newSection.status === 'Restricted'

        // create restrictedSectionsTypes Obj => {"Lectures": sections[], "Lab": sections[] ....}
        if (!restrictedSectionTypes[newSection.activity] && newSection.status === 'Restricted') {
            hasRestrictedSections = true
            restrictedSectionTypes[newSection.activity] = [newSection]
        } else if (restrictedSectionTypes[newSection.activity] && newSection.status === 'Restricted') {
            restrictedSectionTypes[newSection.activity].push(newSection)
        }

        // create sectionsTypes Obj => {"Lectures": sections[], "Lab": sections[] ....}
        if (!sectionTypes[newSection.activity]) {
            sectionTypes[newSection.activity] = [newSection]
        } else {
            sectionTypes[newSection.activity].push(newSection)
        }
    })

    return { sectionTypes, hasRestrictedSections, restrictedSectionTypes }
}

// 'Directed Studies': [],
// Discussion: [],
// 'Essay/Report': [],
// 'Exchange Program': [],
// Experiential: [],
// 'Field Trip': [],
// 'Flexible Learning': [],
// 'Independent Study': [],
// 'Lab-Seminar': [],
// Laboratory: [],
// Lecture: [],
// 'Lecture-Discussion': [],
// 'Lecture-Laboratory': [],
// 'Lecture-Seminar': [],
// 'Optional Section': [],
// Practicum: [],
// 'Problem Session': [],
// Project: [],
// Rehearsal: [],
// Research: [],
// 'Reserved Section': [],
// Seminar: [],
// Studio: [],
// Thesis: [],
// Tutorial: [],
// 'Waiting List': [],
// 'Web-Oriented Course': [],
// 'Work Placement': [],
// Workshop: [],
