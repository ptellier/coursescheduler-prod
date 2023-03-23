import { tSectionTypes } from '../../../data/DataDefinition/CourseInfoDD'
import { Section } from '../../../data/DataDefinition/SectionDD'

// If the course has "Lecture" sections check if they are full => if they are return true
// If the course DOES NOT have lectures check if all sections are full => if they are return true
export const checkCourseFull = (sectionTypes: tSectionTypes, allSections: Section[]) => {
    if (sectionTypes['Lecture']) {
        return checkLecturesFull(sectionTypes['Lecture'])
    } else {
        return checkAllSectionsFull(allSections)
    }
}

const checkLecturesFull = (lectureSections: Section[]) => {
    lectureSections.forEach((section) => {
        if (section.status === 'Available') {
            return false
        }
    })
    return true
}

const checkAllSectionsFull = (allSections: Section[]) => {
    allSections.forEach((section) => {
        if (section.status === 'Available') {
            return false
        }
    })
    return true
}
