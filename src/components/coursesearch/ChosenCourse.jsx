import {IconButton} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { red, pink, green, lime, lightGreen, lightBlue, grey, purple, yellow, orange, brown, teal, deepOrange } from '@mui/material/colors';
import { CourseColorContext } from "../../context/CourseColorContext";
import { useContext } from "react";

const ChosenCourse = ({subject, courseNum, description, credits, deleteSelfFunc}) => {
    
    const courseName = `${subject} ${courseNum}`
    const {getColor, getBackgroundColor} = useContext(CourseColorContext)

    return (<div className="chosen-course">
        <span className="chosen-course-start" style={{
            color:getColor(courseName), 
            backgroundColor:getBackgroundColor(courseName)
            }}>
            <div className="chosen-course-start-top">{subject}</div>
            <div className="chosen-course-start-bottom">{courseNum}</div>
        </span>
        <span className="chosen-course-mid">
            <div className="chosen-course-mid-top">{description}</div>
            <div className="chosen-course-mid-bottom">{credits + " Credits"}</div>
        </span>
        <span className="chosen-course-end">
            <IconButton aria-label="delete" onClick={deleteSelfFunc}>
                <ClearIcon />
            </IconButton>
        </span>
    </div>);
}


export default ChosenCourse;