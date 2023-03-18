import { Box, IconButton, Paper } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { red, pink, green, lime, lightGreen, lightBlue, grey, purple, yellow, orange, brown, teal, deepOrange } from '@mui/material/colors'
import { CourseColorContext } from '../../context/CourseColorContext'
import { memo, useCallback, useContext, useMemo, useState } from 'react'
import { Course } from '../../data/DataDefinition/SearchWordDD'
import { SectionsContext } from '../../context/SectionsContext'
import ClassInfo from './3. ClassInfo'
import ScienceIcon from '@mui/icons-material/Science'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import ClassIcon from '@mui/icons-material/Class'
import { Section } from '../../data/DataDefinition/SectionDD'
import { UndoRedoContext } from '../../context/UndoRedoContext'

// type CourseInfoProp = {
//     course: Course
//     removeCourse: Function
// }

const CourseInfo = memo(({ course, setCoursesInfo }) => {
    const name = `${course.department} ${course.courseNumber}`
    return (
        <div style={{ paddingBottom: 15 }}>
            <div style={{ backgroundColor: course.courseColors.backgroundColor }} className="flex-space-between">
                <div style={{ maxWidth: 250, padding: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '80%', fontSize: '1rem', fontFamily: "M PLUS 1p', 'Helvetica', 'Arial', sans-serif" }}>
                    {course.department} {course.courseNumber} - <span>{course.courseDescription}</span>
                </div>
                <RemoveCourseButton course={course} setCoursesInfo={setCoursesInfo} />
            </div>
            <Box>
                {/* Display Lecture Section First */}
                {course?.courseSections['Lecture'].length > 0 && <ClassInfo key={'Lecture' + name} classType={'Lecture'} course={course} icon={<MenuBookIcon />} />}
                {/* Display Lab, Tutorial, etc*/}
                {Object.entries(course.courseSections).map(([key, value]) => {
                    // If the course isn't a lab, lecture or tutorial display <ClassIcon/>
                    let icon = <ClassIcon />
                    if (key === 'Laboratory') icon = <ScienceIcon />
                    if (key === 'Tutorial') icon = <CoPresentIcon />

                    if (value.length > 0 && key != 'Lecture') {
                        return <ClassInfo key={key + name} classType={key} course={course} icon={icon} />
                    }
                })}
            </Box>
        </div>
    )
})

export default CourseInfo

const RemoveCourseButton = memo(({ course, setCoursesInfo }) => {
    const { setSections, recommended, setRecommended, changeCurrentSections } = useContext(SectionsContext)
    const { clearUndoRedo } = useContext(UndoRedoContext)
    const { removeCourseColor } = useContext(CourseColorContext)

    const removeCourse = (course) => {
        // Get Course Name Course
        const courseName = course.department + ' ' + course.courseNumber

        // Filter Removed Course from Sections
        setSections((sections) => sections.filter((section) => section.subject + ' ' + section.course !== courseName))

        // Set New Recommended Sections
        let recommended_ = { compact: [], consistent: [], scatter: [], freeDay: [] }
        for (let [t, sections] of Object.entries(recommended)) {
            const newSections = sections.filter((section) => section.subject + ' ' + section.course !== courseName)
            recommended_[t] = newSections
        }

        setRecommended(recommended_)
        changeCurrentSections(recommended_)

        // Set Courses Info -> local state
        // 1. Get new total credits
        // 2. Get filter out removed course
        setCoursesInfo((coursesInfo) => {
            const courses = coursesInfo.courses.filter((existingCourse) => {
                return existingCourse.department + ' ' + existingCourse.courseNumber !== courseName
            })
            const totalCredits = coursesInfo.credits - course.credit

            return { ...coursesInfo, totalCredits, courses }
        })

        // Remove Course Color
        removeCourseColor(courseName)

        clearUndoRedo()
    }

    return (
        <IconButton onClick={() => removeCourse(course)} aria-label="delete">
            <ClearIcon fontSize="small" />
        </IconButton>
    )
})
