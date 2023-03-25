import { Course } from '../../../../data/DataDefinition/SearchWordDD'
import { Section } from '../../../../data/DataDefinition/SectionDD'

export const checkCourseCreditLimit = (newCredits: number, totalCredits: number) => {
    if (totalCredits + newCredits >= 18) {
        throw Error('You exceeded maximum (18) credits per term. Remove some courses before adding more')
    }
}

export const checkDuplicateCourse = async (option: any, courses: Course[]) => {
    console.log(option, courses)
    if (courses.some((course) => course.department === option.department && course.courseNumber === option.courseNumber)) {
        throw Error('This course is already selected!')
    }
}

// If there are no sections in that semester the course isn't offered
export const checkCourseIsOfferedThisTerm = (sections: Section[]) => {
    if (sections.length === 0) {
        throw Error("This Course isn't offered in this term ")
    }
}
