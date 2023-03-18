import { Section } from '../../../data/DataDefinition/SectionDD'

// Organize Sections
export const organizeSections = (allSections: Section[]) => {
    let sectionTypes = {
        'Directed Studies': [],
        Discussion: [],
        'Essay/Report': [],
        'Exchange Program': [],
        Experiential: [],
        'Field Trip': [],
        'Flexible Learning': [],
        'Independent Study': [],
        'Lab-Seminar': [],
        Laboratory: [],
        Lecture: [],
        'Lecture-Discussion': [],
        'Lecture-Laboratory': [],
        'Lecture-Seminar': [],
        'Optional Section': [],
        Practicum: [],
        'Problem Session': [],
        Project: [],
        Rehearsal: [],
        Research: [],
        'Reserved Section': [],
        Seminar: [],
        Studio: [],
        Thesis: [],
        Tutorial: [],
        'Waiting List': [],
        'Web-Oriented Course': [],
        'Work Placement': [],
        Workshop: [],
    }
    allSections.forEach((newSection: Section) => {
        // @ts-ignore
        sectionTypes[newSection.activity].push(newSection)
    })
    return sectionTypes
}
