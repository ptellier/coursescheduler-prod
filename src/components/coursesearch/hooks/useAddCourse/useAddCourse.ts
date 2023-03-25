import { getSections } from '../../../../api/APIWebCrawler'
import { tCourseInfo, tCoursesInfo, tCourseOption, tCourseColors } from '../../../../data/DataDefinition/CourseInfoDD'
// import { checkCourseCreditLimit, checkDuplicateCourse } from '../generateSchedule/Exceptions'
import { Section } from '../../../../data/DataDefinition/SectionDD'
import { organizeSections } from './organizeSections'
import { tCourseRestrictedOrFullProps } from '../../../../data/DataDefinition/CourseInfoDD'
import { checkCourseFull } from './checkCourseFull'
import { useCallback, useContext } from 'react'
import { SectionsContext } from '../../../../context/SectionsContext'
import { CourseColorContext } from '../../../../context/CourseColorContext'
import { useCoursesInfoAddCourse, useCoursesInfo } from '../../../../context/CoursesInfoContext'
import { checkCourseCreditLimit, checkCourseIsOfferedThisTerm, checkDuplicateCourse } from './Exceptions'
import { openDialogClassRestrictedOrFull } from './openDialogClassRestrictedOrFull'

type AddCourseProps = {
    setClearInputBox: React.Dispatch<React.SetStateAction<number>>
    setCourseRestrictedOrFull: React.Dispatch<React.SetStateAction<tCourseRestrictedOrFullProps>>
}

export const useAddCourse = ({ setClearInputBox, setCourseRestrictedOrFull }: AddCourseProps) => {
    const { setSections } = useContext(SectionsContext)
    const { addCourseColor } = useContext(CourseColorContext)
    const coursesInfo = useCoursesInfo()
    const handleAddCourse = useCoursesInfoAddCourse()

    const addCourse = useCallback(
        async (courseOption: any, term: string, session: string) => {
            try {
                // Error Handling
                if (courseOption === null) throw Error('NULL')
                checkCourseCreditLimit(courseOption.credit, coursesInfo.totalCredits)
                checkDuplicateCourse(courseOption, coursesInfo.courses)

                // Get Course Sections
                const newSections = await getSections(courseOption.department, courseOption.courseNumber, term, session)

                checkCourseIsOfferedThisTerm(newSections)

                // Sort Sections into labs, lectures, tutorial etc...
                // @returnValue sectionTypes           {"Lectures": sections[], "Lab": sections[] ....}
                // @returnValue hasRestrictedSections  Boolean
                // @returnValue restrictedSectionTypes {"Lectures": sections[], "Lab": sections[] ....}
                const { sectionTypes, hasRestrictedSections, restrictedSectionTypes } = organizeSections(newSections)

                const courseName = courseOption.department + ' ' + courseOption.courseNumber

                openDialogClassRestrictedOrFull({ sectionTypes, restrictedSectionTypes, hasRestrictedSections, courseName, setCourseRestrictedOrFull })

                // Get Course Colors
                const courseColors: tCourseColors = addCourseColor(courseOption.key)

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
                    courseName: courseName,
                }

                // Add New Course to Courses that will be passed to CourseInfo State
                handleAddCourse(newCourse)

                // Context of all sections for current courses
                setSections((sections: Section[]) => [...sections, ...newSections])
            } catch (e: any) {
                if (e.message === 'NULL') return
                alert(e)
            }
            // Clear "Search Course" Input Box -> Causes Rerendering of Autocomplete Component
            setClearInputBox((prevState) => (prevState === 1 ? 0 : 1))
        },
        [coursesInfo]
    )

    return addCourse
}
