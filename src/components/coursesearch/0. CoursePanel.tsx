import { useContext, useState } from "react";
import { Box, Paper } from "@mui/material";
import Generate from "./4. Generate";
import CourseSearchBar from "./2. SearchBar";
import { CourseColorContext } from "../../context/CourseColorContext";
import { Course } from "../../data/DataDefinition/SearchWordDD";
import { checkCourseCreditLimit, checkDuplicateCourse } from "./Exceptions";
import CourseInfo from "./3. CourseInfo";
import { SectionsContext } from "../../context/SectionsContext";
import { Section } from "../../data/DataDefinition/SectionDD";
import { Term } from "./1. Term";
import { getSectionData } from "../../api/GetSectionData";


/**
 * Fetch
 * CourseSearchPaper: fetchedSections = [ [...121] [...110] [...210] ] ... 2DArray
 *  - CourseSearchBar : Trigger fetch
 *  - fetchedSections.map((idx, sections) =>  <ChosenCourse prop={...} >) ChosenCourse (Ryan)
 *  - Generate <- sectionsGlobal.flatMap(x => x), [ ...121 ...110 ...210 ]
 */

/**
 * delete function
 */


const CoursePanel = () => {
  /** courses that users looked up and want to get schedule */
  const [term, setTerm] = useState<string>("1");
  const [session, setSession] = useState<string>("W");
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const { setSections } = useContext(SectionsContext);
  const { addCourseColor, removeCourseColor } = useContext(CourseColorContext);
  

  const addCourse = async(courseOption: any) => {
    if (courseOption === null) throw Error("NULL");
    checkCourseCreditLimit(courseOption, totalCredits);
    checkDuplicateCourse(courseOption, courses);
    addCourseColor(courseOption.key)
    const newCourse = createNewCourse(courseOption);
    const newSections = await getSectionData(newCourse, term, session)
    setSections((sections:Section[]) => [...sections, newSections])
    setCourses((courses:Course[]) => [...courses, newCourse]);
    setTotalCredits(totalCredits => totalCredits + newCourse.credit);
    
  };

  const createNewCourse = (courseOption: any) => {
    return {
        department: courseOption.department,
        courseNumber: courseOption.courseNumber,
        courseName: courseOption.courseName,
        credit: courseOption.credit,
    };
  }

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
        <Term term={term} setTerm={setTerm} session={session} setSession={setSession} />
        <CourseSearchBar addCourse={addCourse} />
        {courses.map(
          (course) => (
            // Analyze.ts +
            <CourseInfo key={course.courseName} course={course} />
          )
        )}
        <Generate />
      </Box>
    </Paper>
  );
};

export default CoursePanel;
