import * as React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SchoolIcon from '@mui/icons-material/School';
import {
    Autocomplete,
    Avatar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemAvatar, ListItemText,
    Paper,
    TextField
} from "@mui/material";
import ChoosenCourse from "./ChosenCourse";

const AutoCompleteOptions = [
    { label: 'STAT 302', year: 1994 , key:1},
    { label: 'CPSC 121', year: 1972 , key:2},
    { label: 'CPSC 110', year: 1974 , key:3},
    { label: 'CPSC 210', year: 1974 , key:4},
]

function generateCourseListItems() {
    return AutoCompleteOptions.map((autocompleteOption) =>
        React.cloneElement(CourseListItem(autocompleteOption.label), {
            key: autocompleteOption.key
        })
    );
}

const CourseListItem = (primaryText) => {
    return (
    <ListItem
        secondaryAction={
            <IconButton edge="end" aria-label="delete">
                <ClearIcon />
            </IconButton>
        }
    >
        <ListItemAvatar>
            <Avatar>
                <SchoolIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={primaryText}
            //secondary={secondary ? 'Secondary text' : null}
        />
    </ListItem>
    )
}

const CourseSearchPaper = () => {
    return (
    <Paper className="Paper" elevation={0} sx={{borderRadius:"20px"}}>
        <Box p={4}>
            <Autocomplete
                disablePortal
                options={AutoCompleteOptions}
                sx={{[`& fieldset`]:{borderRadius:"10px"}}}
                renderInput={(params) =>
                    <TextField {...params} label="Search Courses" />}
            />
            <ChoosenCourse courseNum={"MATH"} subject={"200"} description={"vector calculus"} credits={3} />
            <ChoosenCourse courseNum={"STAT"} subject={"302"} description={"probability intro"} credits={3} />
            <ChoosenCourse courseNum={"CPSC"} subject={"110"} description={"programs, computers"} credits={4} />
        </Box>
    </Paper>);
}

export default CourseSearchPaper;