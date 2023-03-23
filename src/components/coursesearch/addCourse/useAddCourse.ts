import { getSections } from '../../../api/APIWebCrawler'
import { tCourseInfo, tCoursesInfo, tCourseOption, tCourseColors } from '../../../data/DataDefinition/CourseInfoDD'
// import { checkCourseCreditLimit, checkDuplicateCourse } from '../generateSchedule/Exceptions'
import { Section } from '../../../data/DataDefinition/SectionDD'
import { organizeSections } from './organizeSections'
import { tCourseRestrictedOrFullProps } from '../../../data/DataDefinition/CourseInfoDD'
import { checkCourseFull } from './checkCourseFull'
import { useCallback, useContext } from 'react'
import { SectionsContext } from '../../../context/SectionsContext'
import { CourseColorContext } from '../../../context/CourseColorContext'
import { useCoursesInfoAddCourse } from '../../../context/CoursesInfoContext'

type AddCourseProps = {
    setClearInputBox: React.Dispatch<React.SetStateAction<number>>
    setCourseRestrictedOrFull: React.Dispatch<React.SetStateAction<tCourseRestrictedOrFullProps>>
}

export const useAddCourse = ({ setClearInputBox, setCourseRestrictedOrFull }: AddCourseProps) => {
    const { setSections } = useContext(SectionsContext)
    const { addCourseColor } = useContext(CourseColorContext)
    const { handleAddCourse, handleCheckCourseCreditLimit, handleCheckDuplicateCourse } = useCoursesInfoAddCourse()

    const addCourse = useCallback(async (courseOption: any, term: string, session: string) => {
        try {
            // Error Handling
            if (courseOption === null) throw Error('NULL')
            handleCheckCourseCreditLimit(courseOption.credit)
            handleCheckDuplicateCourse(courseOption)

            // Get Course Colors
            const courseColors: tCourseColors = addCourseColor(courseOption.key)

            // Get Course Sections
            const newSections = await getSections(courseOption.department, courseOption.courseNumber, term, session)

            // If there are no sections in that semester the course isn't offered
            if (newSections.length === 0) {
                throw Error("This Course isn't offered in this term ")
            }

            // Context of all sections for current courses
            setSections((sections: Section[]) => [...sections, ...newSections])

            // Clear "Search Course" Input Box -> Does this by rerendering Autocomplete Component
            setClearInputBox((prevState) => (prevState === 1 ? 0 : 1))

            // Sort Sections into labs, lectures, tutorial etc...
            // @returnValue hasRestrictedSections  Boolean
            // @returnValue sectionTypes           {"Lectures": sections[], "Lab": sections[] ....}
            // @returnValue restrictedSectionTypes {"Lectures": sections[], "Lab": sections[] ....}
            const { sectionTypes, hasRestrictedSections, restrictedSectionTypes } = organizeSections(newSections)

            // Checks to see if course is full => returns boolean
            const isCourseFull = checkCourseFull(sectionTypes, newSections)

            // If Course is full or restricted => Dialog pops up
            setCourseRestrictedOrFull({ full: isCourseFull, restricted: hasRestrictedSections, courseName: courseOption.department + ' ' + courseOption.courseNumber, restrictedSectionTypes: restrictedSectionTypes })

            // Create New Course
            const newCourse: tCourseInfo = {
                department: courseOption.department,
                courseNumber: courseOption.courseNumber,
                courseDescription: courseOption.courseDescription,
                credit: courseOption.credit,
                courseColors: courseColors,
                courseSections: sectionTypes,
                courseTerm: term,
                courseSession: session,
                courseName: courseOption.department + ' ' + courseOption.courseNumber,
            }

            // Add New Course to Courses that will be passed to CourseInfo State
            handleAddCourse(newCourse)
        } catch (e: any) {
            if (e.message === 'NULL') return
            alert(e)
        }
    }, [])

    return addCourse
}
