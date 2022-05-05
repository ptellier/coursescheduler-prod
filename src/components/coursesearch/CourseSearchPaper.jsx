import {useState} from 'react';
import {
    Autocomplete,
    Box,
    Paper,
    TextField
} from "@mui/material";
import ChoosenCourse from "./ChosenCourse";
import { fetchCourseDesc } from '../../helpers/fetch';


const CourseSearchPaper = () => {
    
    const [courseOptions, setCourseOptions] = useState(
        [
            { label: 'STAT 302', year: 1994 , key:1},
            { label: 'CPSC 121', year: 1972 , key:2},
            { label: 'CPSC 110', year: 1974 , key:3},
            { label: 'CPSC 210', year: 1974 , key:4},
        ]
    );
    
    /**
     * parse user's raw input of search word then fetch course description data
     * Note1: course description data includes course code, name, description, credits
     * Note2: course description data are options available for user to choose
     * Note3: course data are different from section data
     * Note4: fetches from Ben Cheung's API (so much more efficient than Liang's)
     * @param searchWord
     * @returns
     */
    const loadCourseOptions = async (searchWord) => {
        const data = await fetchCourseDesc(searchWord);
        const options = data.map((c) => ({
            key: c.code,
            label: c.code + " - " + c.name,
            cred: c.cred,
            desc: c.desc,
        }));
        setCourseOptions(options);
    };

    return (
    <Paper className="Paper" elevation={0} sx={{borderRadius:"20px"}}>
        <Box p={4}>
            <Autocomplete
                disablePortal
                options={courseOptions}
                sx={{[`& fieldset`]:{borderRadius:"10px"}}}
                renderInput={(params) =>
                    <TextField {...params} label="Search Courses" />
                }
                onInputChange={() => loadCourseOptions()}
            />
            <ChoosenCourse courseNum={"MATH"} subject={"200"} description={"vector calculus"} credits={3} />
            <ChoosenCourse courseNum={"STAT"} subject={"302"} description={"probability intro"} credits={3} />
            <ChoosenCourse courseNum={"CPSC"} subject={"110"} description={"programs, computers"} credits={4} />
        </Box>
    </Paper>);
}

export default CourseSearchPaper;