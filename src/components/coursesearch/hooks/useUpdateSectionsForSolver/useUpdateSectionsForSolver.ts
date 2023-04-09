import { useCallback } from 'react'
import { tSectionTypes } from '../../../../data/DataDefinition/CourseInfoDD'
import { Section } from '../../../../data/DataDefinition/SectionDD'
import { checkCourseFull } from './checkCourseFull'
import { FormCheckBoxData } from '../../4. DialogClassesRestricted'
import { useCoursesInfoSetState } from '../../../../context/CoursesInfoContext'

type UpdateSectionsForSolverProps = {
    courseName: string
    fnCreateNewSection: (section: Section, fnData: any) => Section
    fnData: any
}

// Main Function - Modify State
// Modify Course's Sections property {selectedForScheduleSolver: boolean}
export const useUpdateSectionsForSolver = () => {
    const setCoursesInfo = useCoursesInfoSetState()

    const updateSectionsforSolver = useCallback(({ courseName, fnCreateNewSection, fnData }: UpdateSectionsForSolverProps) => {
        let isClassFull = false

        setCoursesInfo((coursesInfo) => {
            // Get Current Course
            const index = coursesInfo.courses.findIndex((course) => course.courseName === courseName)
            let currentCourse = coursesInfo.courses[index]

            // tSectionTypes == {"Lectures": Sections[] , "Labs": Sections, ...}
            let newSectionTypes: tSectionTypes = {}

            // iterate: --- ["Lectures" , Sections[]] --- ["Labs" , Sections[]] ....
            Object.entries(currentCourse.courseSections).map(([courseActivity, sections]) => {
                const newSections = sections.map((section) => {
                    // If section was modified in Input Data -> Modify State
                    const newSection = fnCreateNewSection(section, fnData)
                    return newSection
                })
                // recreate this object {"Lectures": Sections[] , "Labs": Sections, ...}
                newSectionTypes[courseActivity] = newSections
            })
            isClassFull = checkCourseFull(newSectionTypes)
            let newCourse = { ...currentCourse, courseSections: newSectionTypes }

            // Filter Out Current course from coursesInfo
            let oldCourses = coursesInfo.courses.filter((course) => course.courseName !== courseName)

            // Add New Course with new sections
            return { ...coursesInfo, courses: [...oldCourses, newCourse] }
        })

        return isClassFull
    }, [])

    return updateSectionsforSolver
}

// Helper Function
// Selects All Sections
export const selectAllSectionsForScheduleSolver = (section: Section, _: any) => {
    return { ...section, selectedForScheduleSolver: true }
}

// Helper Function
// Updates Restricted Section -> Based on Checkbox Data
export const selectSpecificRestrictedSectionsForScheduleSolver = (section: Section, data: any) => {
    // formInputData {"CPSC 110 L1" : {selectedForScheduleSolver: true}, "CPSC 110 L2" : {selectedForScheduleSolver: true} ...}
    const formInputDataObject: FormCheckBoxData = data

    // if restricted section was selected in FormCheckBoxData then modify selectedForScheduleSolver: boolean
    if (formInputDataObject[section.name]) {
        return { ...section, selectedForScheduleSolver: formInputDataObject[section.name].selectedForScheduleSolver } as Section
    }
    return section
}
