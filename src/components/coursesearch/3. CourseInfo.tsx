import { Box, IconButton, Paper } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { red, pink, green, lime, lightGreen, lightBlue, grey, purple, yellow, orange, brown, teal, deepOrange } from '@mui/material/colors'
import { CourseColorContext } from '../../context/CourseColorContext'
import { memo, useContext, useState } from 'react'
import { Course } from '../../data/DataDefinition/SearchWordDD'
import { SectionsContext } from '../../context/SectionsContext'
import { checkIfLectureTutorialLab } from '../../helpers/checkIfLectureTutorialLab'
import ClassInfo from './5. ClassInfo'

type CourseInfoProp = {
    course: Course
}

const CourseInfo = memo(({ course }: CourseInfoProp) => {
    const [status, setStatus] = useState<string[]>(['Available', 'Full', 'Blocked', 'Restricted', 'STT'])
    const [mode, setMode] = useState<string[]>(['In-Person', 'Online', 'Hybrid'])
    const { sections } = useContext(SectionsContext)
    const name = `${course.department} ${course.courseNumber}`
    const { getColor, getBackgroundColor } = useContext(CourseColorContext)
    const classTypes = checkIfLectureTutorialLab(sections, course)

    return (
        // <Paper
        //   className="Paper"
        //   elevation={0}
        //   style={{ minWidth: "20rem" }}
        //   sx={{ borderRadius: "20px" }}
        // >
        <Paper style={{ minWidth: '20rem', background: '#FFFFF', fontSize: '1rem', border: '1px solid #C4C4C4', fontFamily: "M PLUS 1p', 'Helvetica', 'Arial', sans-serif" }}>
            {/* {classTypes.lecture &&  */}
            <div style={{ backgroundColor: getBackgroundColor(name), overflow: 'hidden' }}>
                {course.department} {course.courseNumber}
            </div>
            <Box>
                {classTypes.lecture && <ClassInfo classType={'Lecture'} />}
                {classTypes.lab && <ClassInfo classType={'Lab'} />}
                {classTypes.tutorial && <ClassInfo classType={'Tutorial'} />}
            </Box>
        </Paper>
    )
})

// <div className="chosen-course">
//         <span className="chosen-course-start" style={{
//             color:getColor(name),
//             backgroundColor:getBackgroundColor(name)
//             }}>
//             <div className="chosen-course-start-top">{course.department}</div>
//             <div className="chosen-course-start-bottom">{course.courseNumber}</div>
//         </span>
//         <span className="chosen-course-mid">
//             <div className="chosen-course-mid-top">{course.courseName}</div>
//             <div className="chosen-course-mid-bottom">{course.credit + " Credits"}</div>
//         </span>
//         <span className="chosen-course-end">
//             {/* TODO: need delete function here */}
//             <IconButton aria-label="delete">
//                 <ClearIcon />
//             </IconButton>
//         </span>
//     </div>);
// <FormControl fullWidth>
// <InputLabel style={{marginTop:20}} id="status-choice-field">Status</InputLabel>
// <Select
//   id="status-choice-field"
//   multiple
//   label="Status"
//   value={status}
//   onChange={(event) => setStatus(event.target.value as string[])}
//   sx={{
//     [`& fieldset`]: { borderRadius: "10px" },
//     marginTop: "20px",
//     width: "100%"
//   }}
// >
//   <MenuItem disabled key={5} value={"Available"}>Available</MenuItem>
//   <MenuItem key={6} value={"Full"}>Full</MenuItem>
//   <MenuItem key={7} value={"Blocked"}>Blocked</MenuItem>
//   <MenuItem key={8} value={"Restricted"}>Restricted</MenuItem>
//   <MenuItem key={9} value={"STT"}>STT</MenuItem>
// </Select>
// </FormControl>

// <FormControl fullWidth>
// <InputLabel style={{marginTop:20}} id="mode-choice-field">Mode</InputLabel>
// <Select
//   id="mode-choice-field"
//   multiple
//   label="Mode"
//   value={mode}
//   onChange={(event) => setMode(event.target.value as string[])}
//   sx={{
//     [`& fieldset`]: { borderRadius: "10px" },
//     marginTop: "20px",
//   }}
// >
//   <MenuItem key={10} value={"In-Person"}>In-Person</MenuItem>
//   <MenuItem key={11} value={"Online"}>Online</MenuItem>
//   <MenuItem key={12} value={"Hybrid"}>Hybrid</MenuItem>
// </Select>
// </FormControl>

export default CourseInfo
