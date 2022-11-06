import { useContext, useState } from "react";
import { Box, Paper } from "@mui/material";
import Generate from "./4. Generate";
import CourseSearchBar from "./2. SearchBar";
import { CourseColorContext } from "../../context/CourseColorContext";
import { Course } from "../../data/DataDefinition/SearchWordDD";
import { checkCourseCreditLimit, checkDuplicateCourse } from "./Exceptions";
import CourseInfo from "./3. CourseInfo";
import { SectionsContext } from "../../context/SectionsContext";
import { createURL, fetchSection } from "../../helpers/fetch";
import { DataProcessor } from "./DataProcessor";
import { Section } from "../../data/DataDefinition/SectionDD";

/**
 * delete function
 */

/**
 * terms, session, year move them to here.
 */

/**
 * Fetch
 * CourseSearchPaper: fetchedSections = [ [...121] [...110] [...210] ] ... 2DArray
 *  - CourseSearchBar : Trigger fetch
 *  - fetchedSections.map((idx, sections) =>  <ChosenCourse prop={...} >) ChosenCourse (Ryan)
 *  - Generate <- sectionsGlobal.flatMap(x => x), [ ...121 ...110 ...210 ]
 */

const CoursePanel = () => {

  const { setSections } = useContext(SectionsContext);

  /** courses that users looked up and want to get schedule */
  const [courses, setCourses] = useState<Course[]>([]);

  const [totalCredits, setTotalCredits] = useState<number>(0);

  const { addCourseColor, removeCourseColor } = useContext(CourseColorContext);

  // const [term, setTerm] = useState<string>("1");
  // const [session, setSession] = useState<string>("W");
  // const [year, SetYear] = useState<string>("2022");

  const addCourse = async(courseOption: any) => {
    if (courseOption === null) throw Error("NULL");
    checkCourseCreditLimit(courseOption, totalCredits);
    checkDuplicateCourse(courseOption, courses);
    addCourseColor(courseOption.key)
    const newCourse: Course = {
      department: courseOption.department,
      courseNumber: courseOption.courseNumber,
      courseName: courseOption.courseName,
      credit: courseOption.credit,
    };
    const searchWord = newCourse.department + "/" + newCourse.courseNumber
    const newSections = await fetchSection(createURL(searchWord, "W", "2022"))
    // setSections((sections:Section[]) => [...sections, newSections.sections])
    setCourses((courses:Course[]) => [...courses, newCourse]);
    setTotalCredits(totalCredits => totalCredits + newCourse.credit);
    
  };

  //TODO:
  const removeCourse = () => {
    //setRecommended <- should be handled in context api when sections state change
    //setSections()
    //setCourses()
    //setTotalCredits()
    //removeCourseColor()
  };

  return (
    <Paper
      className="Paper"
      elevation={0}
      style={{ minWidth: "20rem" }}
      sx={{ borderRadius: "20px" }}
    >
      <Box p={4}>
        
        <CourseSearchBar addCourse={addCourse} />

        {courses.map(
          (course) => (
            // sections.filter(section => ...section ...course)
            // send filtered sections data to DataProcessor
            // CourseInfo consumed clean sections data
            <DataProcessor>
              <CourseInfo key={course.courseName} course={course} />
            </DataProcessor>
          )
        )}

        <Generate loc={courses} />

      </Box>
    </Paper>
  );
};

export default CoursePanel;
