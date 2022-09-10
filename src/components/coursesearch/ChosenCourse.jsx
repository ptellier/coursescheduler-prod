import {IconButton} from "@mui/material";
import * as React from "react";
import ClearIcon from "@mui/icons-material/Clear";

const ChosenCourse = ({subject, courseNum, description, credits, 
    backgroundColor, color, deleteSelfFunc}) => {
    return (<div className="chosen-course">
        <span className="chosen-course-start" style={{color:color, backgroundColor:backgroundColor}}>
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