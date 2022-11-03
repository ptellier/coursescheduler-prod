import { useCallback, useState } from "react";
import {Autocomplete,Box,Paper,TextField,useTheme} from "@mui/material";
import ChosenCourse from "./ChosenCourse";
import { fetchCourseDesc } from "../../helpers/fetch";
import Generate from "./Generate";
import { CourseColorMap } from "../../data/DataDefinition/CourseColorMap";
import { debounce } from "../../helpers/debounce";

const CourseSearchPaper = ({coursesToFetch, setCoursesToFetch, setRecommended, setSections}) => {
  const theme = useTheme();
  const chosenCourseBackgroundColors = theme.palette.calendarTimeSlotBackgroundColors;
  
  function getThemeBackgroundColor(index) {
    return chosenCourseBackgroundColors[
      index % chosenCourseBackgroundColors.length
    ];
  }
  const chosenCourseTextColors = theme.palette.calendarTimeSlotTextColors;
  function getThemeTextColor(index) {
    return chosenCourseTextColors[index % chosenCourseTextColors.length];
  }

  const [courseOptions, setCourseOptions] = useState([]);
  const [coursesChosen, setCoursesChosen] = useState(new CourseColorMap(chosenCourseBackgroundColors.length));
  const [totalCredits, setTotalCredits] = useState(0);

  /**
   * parse user's raw input of search word then fetch course description data
   * Note1: course description data includes course code, name, description, credits
   * Note2: course description data are options available for user to choose
   * Note3: course data are different from section data
   * Note4: fetches from Ben Cheung's API (so much more efficient than Liang's)
   * @param searchWord
   */
  let loadCourseOptions = async (event) => {
    //TODO: Debounce
    if (event.nativeEvent.type === "input") {
      const searchWord = event.target.value;
      const data = await fetchCourseDesc(searchWord);
      console.log({data});
      const options = data.map((c) => ({
        key: c.code,
        label: c.code + " - " + c.name,
        cred: c.cred,
        desc: c.desc,
        name: c.name,
      }));
      setCourseOptions(options);
    }
  };

  /**
   * Debounce 
   */
  const debounceLoadCourseOptions = debounce((e) => {loadCourseOptions(e)}, 500)


  /**
   * push user selected course option to coursesChosen and keep track of
   * total credits. If exceed, raise warning.
   * Note: this function is triggered when user clicks the course option in popover box
   * @param option
   */
  const handleChange = (event, option) => {
    if (option === null) {
      return;
    } else if (exceededCredLimit(option)) {
      alert("You exceeded maximum (18) credits per term. Remove some courses before adding more");
    } else if (selectedDuplicate(option)) {
      alert(`You already selected ${option.key}`);
    } else {
      selectCourseDesc(option.key, option.cred, option.name);
      setTotalCredits(totalCredits + option.cred);
    }
  };

  const exceededCredLimit = (option) => {
    return totalCredits + option.cred >= 18;
  };
  const selectedDuplicate = (option) => {
    return coursesChosen.courseColors.some(
      (ccp) => ccp.course.sw === formatSearchWord(option.key)
    );
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
    coursesChosen.insert(newCourse);
    setCoursesChosen(coursesChosen);
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
  console.log({coursesChosen})
  return (
    <Paper className="Paper" elevation={0} style={{minWidth:'20rem'}} sx={{ borderRadius: "20px" }}>
      <Box p={4}>
        <Autocomplete
          options={courseOptions}
          sx={{ [`& fieldset`]: { borderRadius: "10px" } }}
          renderInput={(params) => (
            <TextField {...params} label="Search Courses" />
          )}
          onChange={handleChange}
          onInputChange={(e) => debounceLoadCourseOptions(e)}
        />
        {coursesChosen.courseColors.map((courseColorPair) => {
          const deleteSelf = () => {
            coursesChosen.delete(courseColorPair.course);
            setCoursesChosen(coursesChosen);
            setTotalCredits(totalCredits - courseColorPair.course.cred);
            // find course in array and remove
            for (let i = 0; i < coursesToFetch.length; i++) {
              if (coursesToFetch[i].sw === courseColorPair.course.sw) {
                coursesToFetch.splice(i, 1);
                setCoursesToFetch(coursesToFetch);
                return;
              }
            }
            throw new Error(
              "Could not find course in coursesToFetch to delete"
            );
          };

          return (
            <ChosenCourse
              color={getThemeTextColor(courseColorPair.color)}
              backgroundColor={getThemeBackgroundColor(courseColorPair.color)}
              key={
                courseColorPair.course.key +
                courseColorPair.course.desc +
                "chosen_course"
              }
              subject={courseColorPair.course.sw.split("/")[0]}
              courseNum={courseColorPair.course.sw.split("/")[1]}
              description={courseColorPair.course.desc}
              credits={courseColorPair.course.cred}
              deleteSelfFunc={deleteSelf}
            />
          );
        })}
        <Generate
          loc={coursesToFetch}
          setRecommended={setRecommended}
          setSections={setSections}
        />
      </Box>
    </Paper>
  );
};

export default CourseSearchPaper;
