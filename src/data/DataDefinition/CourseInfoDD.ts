import { Course } from './SearchWordDD'
import { Section } from './SectionDD'

export type tCourseColors = {
    backgroundColor: string
    color: string
    colorName: string
}

export type tSectionTypes = {
    [key: string]: Section[]
}

export interface tCourseInfo extends Course {
    courseColors: tCourseColors
    courseTerm: string
    courseSession: string
    credit: number
    courseDescription: string
    courseNumber: string
    courseSections: tSectionTypes
    department: string
    courseName: string
}

export type tCoursesInfo = {
    courses: tCourseInfo[]
    term: string
    session: string
    totalCredits: number
}

export type tCourseOption = {
    key: string
    label: string
    department: string
    courseNumber: string
    courseDescription: string
    credit: number
}

export type tCourseRestrictedOrFullProps = {
    full: boolean
    restricted: boolean
    courseName: string
    restrictedSectionTypes: tSectionTypes
}
