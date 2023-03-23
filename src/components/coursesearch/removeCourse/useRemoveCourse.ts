import { Section } from '../../../data/DataDefinition/SectionDD'
import { Recommendation } from '../../../data/DataDefinition/Recommendation'
import { tCourseInfo, tCoursesInfo } from '../../../data/DataDefinition/CourseInfoDD'
import { useCoursesInfoRemoveCourse } from '../../../context/CoursesInfoContext'
import { useCallback, useContext } from 'react'
import { SectionsContext } from '../../../context/SectionsContext'
import { UndoRedoContext } from '../../../context/UndoRedoContext'
import { CourseColorContext } from '../../../context/CourseColorContext'

export const useRemoveCourse = () => {
    const { setSections, recommended, setRecommended, changeCurrentSections } = useContext(SectionsContext)
    const { clearUndoRedo } = useContext(UndoRedoContext)
    const { removeCourseColor } = useContext(CourseColorContext)
    const handleRemoveCourse = useCoursesInfoRemoveCourse()

    const removeCourse = useCallback(
        (course: tCourseInfo) => {
            // Get Course Name Course
            const courseName = course.department + ' ' + course.courseNumber

            // Filter Removed Course from Sections
            setSections((sections: Section[]) => sections.filter((section) => section.subject + ' ' + section.course !== courseName))

            // Set New Recommended Sections
            let newRecommendation: Recommendation = { compact: [], consistent: [], scatter: [], freeDay: [] }
            for (let [key, value] of Object.entries(recommended as Recommendation)) {
                let sections: Section[] = value
                const newSections = sections.filter((section: Section) => section.subject + ' ' + section.course !== courseName)
                newRecommendation[key as 'compact' | 'consistent' | 'scatter' | 'freeDay'] = newSections
            }

            setRecommended(newRecommendation)
            changeCurrentSections(newRecommendation)

            // Set Courses Info -> local state
            // 1. Get new total credits
            // 2. Get filter out removed course
            handleRemoveCourse(course)

            // Remove Course Color
            removeCourseColor(courseName)

            clearUndoRedo()
        },
        [setRecommended, setSections, clearUndoRedo, changeCurrentSections, handleRemoveCourse, recommended, removeCourseColor]
    )
    return removeCourse
}
