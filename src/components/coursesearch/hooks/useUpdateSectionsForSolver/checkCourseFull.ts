import { tSectionTypes } from '../../../../data/DataDefinition/CourseInfoDD'
import { Section } from '../../../../data/DataDefinition/SectionDD'

// If the course has "Lecture" sections check if they are full => if they are return true
// If the course DOES NOT have lectures check if all sections are full => if they are return true
export const checkCourseFull = (sectionTypes: tSectionTypes) => {
    if (sectionTypes['Lecture']) {
        return checkLecturesFull(sectionTypes['Lecture'])
    }
    return false
}

const checkLecturesFull = (lectureSections: Section[]) => {
    for (let i = 0; i < lectureSections.length; i++) {
        const section = lectureSections[i]

        if (section.status === 'Available' || section.selectedForScheduleSolver) {
            return false
        }
    }
    return true
}
