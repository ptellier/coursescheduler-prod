import {IconButton} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { red, pink, green, lime, lightGreen, lightBlue, grey, purple, yellow, orange, brown, teal, deepOrange } from '@mui/material/colors';
import { CourseColorContext } from "../../context/CourseColorContext";
import { useContext } from "react";

const CourseInfo = ({course}) => {
    
    const name = `${course.department} ${course.courseNumber}`
    const {getColor, getBackgroundColor} = useContext(CourseColorContext)

    return (<div className="chosen-course">
        <span className="chosen-course-start" style={{
            color:getColor(name), 
            backgroundColor:getBackgroundColor(name)
            }}>
            <div className="chosen-course-start-top">{course.department}</div>
            <div className="chosen-course-start-bottom">{course.courseNumber}</div>
        </span>
        <span className="chosen-course-mid">
            <div className="chosen-course-mid-top">{course.courseName}</div>
            <div className="chosen-course-mid-bottom">{course.credit + " Credits"}</div>
        </span>
        <span className="chosen-course-end">
            {/* TODO: need delete function here */}
            <IconButton aria-label="delete">
                <ClearIcon />
            </IconButton>
        </span>
    </div>);
}


export default CourseInfo;