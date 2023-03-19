import React, { useState } from 'react'
import { Box, Paper } from '@mui/material'
import SearchPanel from './1. SearchPanel'
import CourseInfo from './2. CourseInfo'
import { tCoursesInfo } from '../../data/DataDefinition/CourseInfoDD'

const LeftPanel = () => {
    /** courses that users looked up and want to get schedule */
    // {term: "1", session: "W", courses: [], totalCredits: 0, }
    const [coursesInfo, setCoursesInfo] = useState<tCoursesInfo>({ courses: [], term: '1', session: 'W', totalCredits: 0 })
    return (
        <div style={{ minWidth: '23rem' }}>
            <SearchPanel coursesInfo={coursesInfo} setCoursesInfo={setCoursesInfo} />
            {coursesInfo.courses.length > 0 && (
                <Paper className="Paper" sx={{ borderRadius: '20px', marginTop: 2 }}>
                    <Box p={3}>
                        {coursesInfo.courses.map((course) => (
                            <CourseInfo key={course.department + course.courseNumber} course={course} setCoursesInfo={setCoursesInfo} />
                        ))}
                    </Box>
                </Paper>
            )}
        </div>
    )
}
export default LeftPanel
