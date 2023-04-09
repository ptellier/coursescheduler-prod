import React, { useContext, createContext, Dispatch, SetStateAction, ReactNode, useState, FC, useCallback } from 'react'
import CourseInfo from '../components/coursesearch/2. CourseInfo'
import { tCoursesInfo, tCourseInfo } from '../data/DataDefinition/CourseInfoDD'

// Context
const CoursesInfoContext = createContext<tCoursesInfo>({ courses: [], term: '1', session: 'W', totalCredits: 0 })

const CoursesInfoAddCourseContext = createContext<(newCourse: tCourseInfo) => void>(() => {})

const CoursesInfoRemoveCourseContext = createContext<(courseNameDeleted: string) => void>(() => {})

const CoursesInfoSetStateContext = createContext<Dispatch<SetStateAction<tCoursesInfo>>>(() => {})

// Hooks
export const useCoursesInfo = () => useContext(CoursesInfoContext)

export const useCoursesInfoAddCourse = () => useContext(CoursesInfoAddCourseContext)

export const useCoursesInfoRemoveCourse = () => useContext(CoursesInfoRemoveCourseContext)

export const useCoursesInfoSetState = () => useContext(CoursesInfoSetStateContext)

// Providers

interface Props {
    children: ReactNode
}

export const CoursesInfoProvider: FC<Props> = ({ children }) => {
    const [coursesInfo, setCoursesInfo] = useState<tCoursesInfo>({ courses: [], term: '1', session: 'W', totalCredits: 0 })

    const handleAddCourse = useCallback((newCourse: tCourseInfo) => {
        // Add New Course to Courses that will be passed to CourseInfo State
        setCoursesInfo((coursesInfo) => {
            const totalCredits = coursesInfo.totalCredits + newCourse.credit
            const courses = [...coursesInfo.courses, newCourse]
            return { ...coursesInfo, courses, totalCredits }
        })
    }, [])

    //eg. CPSC 110
    const handleRemoveCourse = useCallback((courseNameDeleted: string) => {
        setCoursesInfo((coursesInfo: tCoursesInfo) => {
            let removedCredit = 0

            const courses = coursesInfo.courses.filter((existingCourse: tCourseInfo) => {
                // Get Deleted Courses Credit
                if (existingCourse.courseName === courseNameDeleted) {
                    removedCredit = existingCourse.credit
                }
                return existingCourse.courseName !== courseNameDeleted
            })
            const totalCredits = coursesInfo.totalCredits - removedCredit

            return { ...coursesInfo, totalCredits, courses }
        })
    }, [])

    return (
        <CoursesInfoContext.Provider value={coursesInfo}>
            <CoursesInfoAddCourseContext.Provider value={handleAddCourse}>
                <CoursesInfoRemoveCourseContext.Provider value={handleRemoveCourse}>
                    <CoursesInfoSetStateContext.Provider value={setCoursesInfo}>{children}</CoursesInfoSetStateContext.Provider>
                </CoursesInfoRemoveCourseContext.Provider>
            </CoursesInfoAddCourseContext.Provider>
        </CoursesInfoContext.Provider>
    )
}
