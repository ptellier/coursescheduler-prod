import { useContext, useState } from "react";
import { Box,Paper,useTheme} from "@mui/material";
import ChosenCourse from "./ChosenCourse";
import Generate from "./Generate";
import { CourseColorMap } from "../../data/DataDefinition/CourseColorMap";
import CourseSearchBar from "./CourseSearchBar";
import { CourseColorContext } from "../../context/CourseColorContext";

const CourseSearchPaper = ({coursesToFetch, setCoursesToFetch}) => {
  const {removeCourseColor} = useContext(CourseColorContext)
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

  const [coursesChosen, setCoursesChosen] = useState(new CourseColorMap(chosenCourseBackgroundColors.length));
  const [totalCredits, setTotalCredits] = useState(0);


  /**
   * push user selected course option to coursesChosen and keep track of
   * total credits. If exceed, raise warning.
   * Note: this function is triggered when user clicks the course option in popover box
   * @param option
   */
  const handleChange = (option) => {
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
      courseName: key,
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
  
  return (
    <Paper className="Paper" elevation={0} style={{minWidth:'20rem'}} sx={{ borderRadius: "20px" }}>
      <Box p={4}>

        {/* SearchBar */}
        <CourseSearchBar handleChange={handleChange} />
        {/* SelectedCourses */}
        {coursesChosen.courseColors.map((courseColorPair) => {

          const deleteSelf = () => {
            // TODO1: clear off all sections states:
            // remove course from [sections] and [recommended]
            // console.log(courseColorPair)

            // TODO2: remove course color:
            removeCourseColor(courseColorPair.course.courseName)
            
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
          };

          return (
            <ChosenCourse
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

        {/* Generate Button */}
        <Generate loc={coursesToFetch} />
      </Box>
    </Paper>
  );
};

export default CourseSearchPaper;
