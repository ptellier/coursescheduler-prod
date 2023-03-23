import React, { useContext, createContext, Dispatch, SetStateAction, ReactNode, useState, FC, useCallback } from 'react'
import CourseInfo from '../components/coursesearch/2. CourseInfo'
import { tCoursesInfo, tCourseInfo } from '../data/DataDefinition/CourseInfoDD'

// Context
const CoursesInfoContext = createContext<tCoursesInfo>({ courses: [], term: '1', session: 'W', totalCredits: 0 })

type tCoursesInfoUpdateContext = {
    handleAddCourse: (newCourse: tCourseInfo) => void
    handleCheckCourseCreditLimit: (newCourse: tCourseInfo) => void
    handleCheckDuplicateCourse: (newCourse: tCourseInfo) => void
}

const CoursesInfoAddCourseContext = createContext<tCoursesInfoUpdateContext>({ handleAddCourse: () => {}, handleCheckCourseCreditLimit: () => {}, handleCheckDuplicateCourse: () => {} })

const CoursesInfoRemoveCourseContext = createContext<(courseToBeRemoved: tCourseInfo) => void>(() => {})

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

    const handleCheckCourseCreditLimit = useCallback(
        (newCourseCredits) => {
            if (coursesInfo.totalCredits + newCourseCredits >= 18) {
                throw Error('You exceeded maximum (18) credits per term. Remove some courses before adding more')
            }
        },
        [coursesInfo.totalCredits]
    )

    const handleCheckDuplicateCourse = useCallback(
        (newCourseOption: any) => {
            if (coursesInfo.courses.some((course) => course.department === newCourseOption.department && course.courseNumber === newCourseOption.courseNumber)) {
                throw Error('This course is already selected!')
            }
        },
        [coursesInfo.courses]
    )

    const handleRemoveCourse = useCallback((courseToBeRemoved: tCourseInfo) => {
        setCoursesInfo((coursesInfo: tCoursesInfo) => {
            const courses = coursesInfo.courses.filter((existingCourse: tCourseInfo) => {
                return existingCourse.department + ' ' + existingCourse.courseNumber !== courseToBeRemoved.courseName
            })
            const totalCredits = coursesInfo.totalCredits - courseToBeRemoved.credit

            return { ...coursesInfo, totalCredits, courses }
        })
    }, [])

    return (
        <CoursesInfoContext.Provider value={coursesInfo}>
            <CoursesInfoAddCourseContext.Provider value={{ handleAddCourse, handleCheckCourseCreditLimit, handleCheckDuplicateCourse }}>
                <CoursesInfoRemoveCourseContext.Provider value={handleRemoveCourse}>
                    <CoursesInfoSetStateContext.Provider value={setCoursesInfo}>{children}</CoursesInfoSetStateContext.Provider>
                </CoursesInfoRemoveCourseContext.Provider>
            </CoursesInfoAddCourseContext.Provider>
        </CoursesInfoContext.Provider>
    )
}
