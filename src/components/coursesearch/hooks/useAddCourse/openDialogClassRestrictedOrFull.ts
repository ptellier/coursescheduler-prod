import { checkCourseFull } from './checkCourseFull'
import { tSectionTypes, tCourseRestrictedOrFullProps } from '../../../../data/DataDefinition/CourseInfoDD'
import { Dispatch, SetStateAction } from 'react'

type OpenDialogClassRestrictedOrFullProps = {
    setCourseRestrictedOrFull: Dispatch<SetStateAction<tCourseRestrictedOrFullProps>>
    hasRestrictedSections: boolean
    sectionTypes: tSectionTypes
    restrictedSectionTypes: tSectionTypes
    courseName: string
}

export const openDialogClassRestrictedOrFull = ({ sectionTypes, restrictedSectionTypes, hasRestrictedSections, courseName, setCourseRestrictedOrFull }: OpenDialogClassRestrictedOrFullProps) => {
    // Checks to see if course is full => returns boolean
    const isCourseFull = checkCourseFull(sectionTypes)

    // CASE 1: Lectures are full and restrict lectures exist => Restricted Lectures Dialog pops up
    //          Choose Add Restricted Lectures => No More Pop Up
    //          Choose Don't Add Restricted Lectures => Full Lectures Pop Up
    // CASE 2: Lectures are NOT full and restrict lectures exist => Restricted Lectures Dialog pops up
    //          Choose Add Restricted Lectures => No More Pop Up
    //          Choose Don't Add Restricted Lectures => No More Pop Up
    if (isCourseFull && restrictedSectionTypes['Lecture']?.length > 0) {
        setCourseRestrictedOrFull({ full: isCourseFull, restricted: hasRestrictedSections, courseName: courseName, restrictedSectionTypes: restrictedSectionTypes })
    }
    // CASE 3: Lectures are full and NO restricted lecture => Full Dialog pops up
    //          Choose Remove Course
    //          Choose Add Full Classes
    else if (isCourseFull) {
        setCourseRestrictedOrFull({ full: isCourseFull, restricted: hasRestrictedSections, courseName: courseName, restrictedSectionTypes: restrictedSectionTypes })
    }
}
