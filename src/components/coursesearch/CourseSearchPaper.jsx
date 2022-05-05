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
    
    const [courseOptions, setCourseOptions] = useState([]);
    const [coursesChosen, setCoursesChosen] = useState([]);
    const [totalCredits, setTotalCredits] = useState(0);
    
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


      /**
   * push user selected course option to coursesChosen and keep track of
   * total credits. If exceed, raise warning.
   * Note: this function is triggered when user clicks the course option in popover box
   * @param option
   */
    const handleChange = (option) => {
        console.log(option);
        if (exceededCredLimit(option)) {
        alert("You exceeded maximum (18) credits per term. Remove some courses");
        } else if (selectedDuplicate(option)) {
        alert(`You already selected ${option.sw}`);
        } else {
        selectCourseDesc(option.sw, option.cred, option.desc);
        setTotalCredits(totalCredits + option.cred);
        }
    };

  const exceededCredLimit = (option) => {
    return totalCredits + option.cred >= 18;
  };
  const selectedDuplicate = (option) => {
    return coursesChosen.some((c) => c.sw === formatSearchWord(option.sw));
  };

    /**
   * create course with search word, credit, description then accumulate it in coursesChosen
   * @param sw
   * @param cred
   * @param desc
   */
     const selectCourseDesc = (sw, cred, desc) => {
        const new_course = {
        //   sw: formatSearchWord(sw),
            sw: sw,
            cred: cred,
            desc: desc,
        };
        setCoursesChosen([...coursesChosen, new_course]);
        console.log("what")
        console.log(coursesChosen)
      };
    
      /**
       * removes space and inserts '/' at first digit of the str
       * resulting string will be inserted into url for fetch
       * @param {string} str
       * @returns {SearchWord}; i.e "CPSC 121"  -> "CPSC/121"
       */
      const formatSearchWord = (str) => {
        const removedSpace = str.replace(/\s/g, "");
        const pos = removedSpace.search(/\d/);
        return removedSpace.substring(0, pos) + "/" + removedSpace.substring(pos);
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
                onInputChange={(event) => loadCourseOptions(event.target.value)}
                onChange={(event, values) => handleChange(values)}
            />
            {coursesChosen.map((courseChosen) => (
                <ChoosenCourse 
                    courseNum={courseChosen.key} 
                    subject={"blahh"} 
                    description={courseChosen.desc} 
                    credits={courseChosen.cred} 
                />
            ))}
            
            <ChoosenCourse courseNum={"STAT"} subject={"302"} description={"probability intro"} credits={3} />
            <ChoosenCourse courseNum={"CPSC"} subject={"110"} description={"programs, computers"} credits={4} />
        </Box>
    </Paper>);
}

export default CourseSearchPaper;