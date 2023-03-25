import React, { useState } from 'react'
import { Box, Paper } from '@mui/material'
import SearchPanel from './1. SearchPanel'
import CourseInfo from './2. CourseInfo'
import { tCoursesInfo } from '../../data/DataDefinition/CourseInfoDD'
import { useCoursesInfo } from '../../context/CoursesInfoContext'

const LeftPanel = () => {
    /** courses that users looked up and want to get schedule */
    // {term: "1", session: "W", courses: [], totalCredits: 0, }
    console.log('Left Panel')
    const coursesInfo = useCoursesInfo()
    return (
        <div style={{ minWidth: '23rem' }}>
            <SearchPanel coursesInfo={coursesInfo} />
            {coursesInfo.courses.length > 0 && (
                <Paper className="Paper" sx={{ borderRadius: '20px', marginTop: 2 }}>
                    <Box p={3}>
                        {coursesInfo.courses.map((course, index) => (
                            <CourseInfo key={course.department + course.courseNumber} isFirstCouseRendered={index === 0} course={course} />
                        ))}
                    </Box>
                </Paper>
            )}
        </div>
    )
}
export default LeftPanel
