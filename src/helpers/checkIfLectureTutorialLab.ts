import { Course } from '../data/DataDefinition/SearchWordDD'

/**
 * Check if this course section has a lab lecture or tutorial
 * @param {*} sections
 * @param {course} course info
 * @returns {lecture: false, lab: false, tutorial: false}
 */
export const checkIfLectureTutorialLab = (sections: any, course: Course) => {
    let classTypes = { lecture: false, lab: false, tutorial: false }

    for (let i: number = 0; i < sections.length; i++) {
        // Check if this course has a lecture, lab or tutorial
        // Check if this is the correct course
        if (sections[i].activity === 'Lecture' && course.department === sections[i].subject && course.courseNumber === sections[i].course) {
            classTypes.lecture = true
        }
        if (sections[i].activity === 'Laboratory' && course.department === sections[i].subject && course.courseNumber === sections[i].course) {
            classTypes.lab = true
        }
        if (sections[i].activity === 'Tutorial' && course.department === sections[i].subject && course.courseNumber === sections[i].course) {
            classTypes.tutorial = true
        }
    }
    return classTypes
}
