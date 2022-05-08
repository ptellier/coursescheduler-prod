import {useState} from 'react';
import {
    Autocomplete,
    Box,
    Paper,
    TextField
} from "@mui/material";
import ChosenCourse from "./ChosenCourse";
import { fetchCourseDesc } from '../../helpers/fetch';
import TriggerAPI from "../TriggerAPI";


const CourseSearchPaper = ({ coursesToFetch, setCoursesToFetch,
                               set_recommended, userTerm, setUserTerm, setSections}) => {
      
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
       */
      const loadCourseOptions = async (event) => {
        if (event.nativeEvent.type === "input") {
          const searchWord = event.target.value;
          const data = await fetchCourseDesc(searchWord);
          const options = data.map((c) => ({
              key: c.code,
              label: c.code + " - " + c.name,
              cred: c.cred,
              desc: c.desc,
          }));
          setCourseOptions(options);
        }
      };


      /**
       * push user selected course option to coursesChosen and keep track of
       * total credits. If exceed, raise warning.
       * Note: this function is triggered when user clicks the course option in popover box
       * @param option
       */
        const handleChange = (event, option) => {
            console.log(option);
            if (option === null) {
                return
            } else if (exceededCredLimit(option)) {
                alert("You exceeded maximum (18) credits per term. Remove some courses");
            } else if (selectedDuplicate(option)) {
                alert(`You already selected ${option.key}`);
            } else {
                selectCourseDesc(option.key, option.cred, option.desc);
                setTotalCredits(totalCredits + option.cred);
            }
        };

      const exceededCredLimit = (option) => {
        return totalCredits + option.cred >= 18;
      };
      const selectedDuplicate = (option) => {
        return coursesChosen.some((c) => c.sw === formatSearchWord(option.key));
      };

      /**
     * create course with search word, credit, description then accumulate it in coursesChosen
     * @param sw
     * @param cred
     * @param desc
     */
     const selectCourseDesc = (key, cred, desc) => {
        const newCourse = {
            sw: formatSearchWord(key),
            cred: cred,
            desc: desc,
        };
        setCoursesChosen([...coursesChosen, newCourse]);
        setCoursesToFetch([...coursesToFetch, newCourse]);
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
                // disablePortal
                options={courseOptions}
                sx={{[`& fieldset`]:{borderRadius:"10px"}}}
                renderInput={(params) =>
                    <TextField {...params} label="Search Courses" />
                }
                onChange={handleChange}
                onInputChange={loadCourseOptions}
            />
            {coursesChosen.map((courseChosen) => (
                <ChosenCourse
                    key={courseChosen.key+courseChosen.desc+"choosen_course"}
                    subject={courseChosen.sw.split("/")[0]}
                    courseNum={courseChosen.sw.split("/")[1]}
                    description={courseChosen.desc} 
                    credits={courseChosen.cred} 
                />
            ))}
            
            {/* <ChoosenCourse courseNum={"STAT"} subject={"302"} description={"probability intro"} credits={3} />
            <ChoosenCourse courseNum={"CPSC"} subject={"110"} description={"programs, computers"} credits={4} /> */}

            <TriggerAPI
                loc={coursesToFetch}
                set_recommended={set_recommended}
                setSections={setSections}
                userTerm={userTerm}
                setUserTerm={setUserTerm}
            />

        </Box>
    </Paper>);
}

export default CourseSearchPaper;