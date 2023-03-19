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
import { tCoursesInfo, tCourseInfo } from '../../data/DataDefinition/CourseInfoDD'
import { removeCourse } from './removeCourse/removeCourse'

type CourseInfoProps = {
    course: tCourseInfo
    setCoursesInfo: React.Dispatch<React.SetStateAction<tCoursesInfo>>
}

const CourseInfo = memo(({ course, setCoursesInfo }: CourseInfoProps) => {
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

type RemoveCourseButtonProps = {
    course: tCourseInfo
    setCoursesInfo: React.Dispatch<React.SetStateAction<tCoursesInfo>>
}

const RemoveCourseButton = memo(({ course, setCoursesInfo }: RemoveCourseButtonProps) => {
    const sectionsContextValues = useContext(SectionsContext)
    const undoRedoContextValues = useContext(UndoRedoContext)
    const courseColorContextValues = useContext(CourseColorContext)

    return (
        <IconButton onClick={() => removeCourse({ course, setCoursesInfo, sectionsContextValues, undoRedoContextValues, courseColorContextValues })} aria-label="delete">
            <ClearIcon fontSize="small" />
        </IconButton>
    )
})
