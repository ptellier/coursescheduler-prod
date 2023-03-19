import { Section } from '../../../data/DataDefinition/SectionDD'

// Organize Sections
export const organizeSections = (listAllSections) => {
    // See all types of sections commented out below
    let oSectionTypes = {}

    listAllSections.forEach((oNewSection) => {
        // set Available and Restricted Sections to selected for Schedule Solver
        if (oNewSection.status === 'Available' || oNewSection.status === 'Restricted') {
            oNewSection.selectedForScheduleSolver = true
        } else {
            oNewSection.selectedForScheduleSolver = false
        }

        // Add section to section types object
        if (!oSectionTypes[oNewSection.activity]) {
            oSectionTypes[oNewSection.activity] = [oNewSection]
        } else {
            oSectionTypes[oNewSection.activity].push(oNewSection)
        }
    })
    return oSectionTypes
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
