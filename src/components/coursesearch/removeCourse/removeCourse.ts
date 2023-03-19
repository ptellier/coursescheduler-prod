import { Section } from '../../../data/DataDefinition/SectionDD'
import { Recommendation } from '../../../data/DataDefinition/Recommendation'
import { tCourseInfo, tCoursesInfo } from '../../../data/DataDefinition/CourseInfoDD'

type RemoveCourseProps = {
    course: tCourseInfo
    setCoursesInfo: React.Dispatch<React.SetStateAction<tCoursesInfo>>
    sectionsContextValues: any
    undoRedoContextValues: any
    courseColorContextValues: any
}

export const removeCourse = ({ course, setCoursesInfo, sectionsContextValues, undoRedoContextValues, courseColorContextValues }: RemoveCourseProps) => {
    const { setSections, recommended, setRecommended, changeCurrentSections } = sectionsContextValues
    const { clearUndoRedo } = undoRedoContextValues
    const { removeCourseColor } = courseColorContextValues
    // Get Course Name Course
    const courseName = course.department + ' ' + course.courseNumber

    // Filter Removed Course from Sections
    setSections((sections: Section[]) => sections.filter((section) => section.subject + ' ' + section.course !== courseName))

    // Set New Recommended Sections
    let newRecommendation: Recommendation = { compact: [], consistent: [], scatter: [], freeDay: [] }
    for (let [key, value] of Object.entries(recommended as Recommendation)) {
        // @ts-ignore
        let sections: Section[] = value
        const newSections = sections.filter((section: Section) => section.subject + ' ' + section.course !== courseName)
        // @ts-ignore
        newRecommendation[key] = newSections
    }

    setRecommended(newRecommendation)
    changeCurrentSections(newRecommendation)

    // Set Courses Info -> local state
    // 1. Get new total credits
    // 2. Get filter out removed course
    setCoursesInfo((coursesInfo: tCoursesInfo) => {
        const courses = coursesInfo.courses.filter((existingCourse: tCourseInfo) => {
            return existingCourse.department + ' ' + existingCourse.courseNumber !== courseName
        })
        const totalCredits = coursesInfo.totalCredits - course.credit

        return { ...coursesInfo, totalCredits, courses }
    })

    // Remove Course Color
    removeCourseColor(courseName)

    clearUndoRedo()
}
