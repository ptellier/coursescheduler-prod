import { Autocomplete, debounce, TextField } from '@mui/material';
import { useState } from 'react'
import { fetchCourseDesc } from '../../helpers/fetch';

interface SearchBarProps {
  addCourse: Function;
}

const SearchBar = ({addCourse} : SearchBarProps) => {
  const [courseOptions, setCourseOptions] = useState([]);

  const handleUserSelectCourse = async(event:any, courseOption:any) => {
    try {
      await addCourse(courseOption)
    } catch (e: any) {
      if (e.message === "NULL") return;
      alert(e)
    }
  }

  /**
   * parse user's raw input of search word then fetch course description data
   * Note1: course description data includes course code, name, description, credits
   * Note2: course description data are options available for user to choose
   * Note3: course data are different from section data
   * Note4: fetches from Ben Cheung's API (so much more efficient than Liang's)
   * @param searchWord
   */
     let loadCourseOptions = async (event:any) => {
      if (event.nativeEvent.type === "input") {
        const searchWord = event.target.value;
        const data = await fetchCourseDesc(searchWord);
        const options = data.map((c:any) => ({
          key: c.code,
          label: c.code + " - " + c.name,
          department: c.dept,
          courseNumber: c.code.split(" ")[1],
          courseName: c.name,
          credit: c.cred,
        }));
        setCourseOptions(options);
      }
    };

  /**
   * Debounce 
   */
   const debounceLoadCourseOptions = debounce((e) => {loadCourseOptions(e)}, 500)

  return (
    <Autocomplete
      options={courseOptions}
      sx={{ [`& fieldset`]: { borderRadius: "10px" } }}
      renderInput={(params) => (
        <TextField {...params} label="Search Courses" />
      )}
      onChange={(e, option) => handleUserSelectCourse(e, option)}
      onInputChange={(e) => debounceLoadCourseOptions(e)}
    />

  )
}

export default SearchBar