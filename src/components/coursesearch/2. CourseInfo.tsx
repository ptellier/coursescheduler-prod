import { Box, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { memo } from 'react'
import ClassInfo from './3. ClassInfo'
import ScienceIcon from '@mui/icons-material/Science'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import ClassIcon from '@mui/icons-material/Class'
import { tCourseInfo } from '../../data/DataDefinition/CourseInfoDD'
import { useRemoveCourse } from './hooks/useRemoveCourse/useRemoveCourse'

type CourseInfoProps = {
    course: tCourseInfo
    isFirstCouseRendered: boolean
}

const CourseInfo = memo(({ course, isFirstCouseRendered }: CourseInfoProps) => {
    const name = `${course.department} ${course.courseNumber}`
    return (
        <div style={{ paddingBottom: 15 }}>
            <div style={{ backgroundColor: course.courseColors.backgroundColor }} className="flex-space-between">
                <div style={{ maxWidth: 250, padding: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '80%', fontSize: '1rem', fontFamily: "M PLUS 1p', 'Helvetica', 'Arial', sans-serif" }}>
                    {course.department} {course.courseNumber} - <span>{course.courseDescription}</span>
                </div>
                <RemoveCourseButton courseName={course.courseName} />
            </div>
            <Box>
                {/* Display Lecture Section First */}
                {course?.courseSections['Lecture'].length > 0 && <ClassInfo key={'Lecture' + name} isFirstSectionRendered={isFirstCouseRendered} classType={'Lecture'} course={course} icon={<MenuBookIcon />} />}
                {/* Display Lab, Tutorial, etc*/}
                {Object.entries(course.courseSections).map(([key, value]) => {
                    // If the course isn't a lab, lecture or tutorial display <ClassIcon/>
                    let icon = <ClassIcon />
                    if (key === 'Laboratory') icon = <ScienceIcon />
                    if (key === 'Tutorial') icon = <CoPresentIcon />

                    if (value.length > 0 && key !== 'Lecture') {
                        return <ClassInfo key={key + name} isFirstSectionRendered={false} classType={key} course={course} icon={icon} />
                    }
                })}
            </Box>
        </div>
    )
})

export default CourseInfo

type RemoveCourseButtonProps = {
    courseName: string
}

const RemoveCourseButton = memo(({ courseName }: RemoveCourseButtonProps) => {
    const removeCourse = useRemoveCourse()

    return (
        <IconButton onClick={() => removeCourse(courseName)} aria-label="delete">
            <ClearIcon fontSize="small" />
        </IconButton>
    )
})
