import { Course } from '../../../data/DataDefinition/SearchWordDD'

export const checkCourseCreditLimit = (option: any, totalCredits: number) => {
    if (totalCredits + option.cred >= 18) {
        throw Error('You exceeded maximum (18) credits per term. Remove some courses before adding more')
    }
}

export const checkDuplicateCourse = (option: any, courses: Course[]) => {
    if (courses.some((course) => course.department === option.department && course.courseNumber === option.courseNumber)) {
        throw Error('This course is already selected!')
    }
}
