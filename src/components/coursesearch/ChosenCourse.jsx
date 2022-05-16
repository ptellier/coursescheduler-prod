import {Autocomplete, Box, IconButton, List, Paper, TextField} from "@mui/material";
import * as React from "react";
import ClearIcon from "@mui/icons-material/Clear";

const ChosenCourse = ({subject, courseNum, description, credits, 
    backgroundColor, color}) => {
    return (<div className="chosen-course">
        <span className="chosen-course-start" style={{color:color, backgroundColor:backgroundColor}}>
            <div className="chosen-course-start-top">{subject}</div>
            <div className="chosen-course-start-bottom">{courseNum}</div>
        </span>
        <span className="chosen-course-mid">
            <div className="chosen-course-mid-top">{description}</div>
            <div className="chosen-course-mid-bottom">{credits + " Credit"}</div>
        </span>
        <span className="chosen-course-end">
            <IconButton aria-label="delete" onClick={() => console.log("Delete")}>
                <ClearIcon />
            </IconButton>
        </span>
    </div>);
}


export default ChosenCourse;