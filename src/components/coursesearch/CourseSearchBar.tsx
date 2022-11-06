import { Autocomplete, debounce, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { CourseColorContext } from '../../context/CourseColorContext';
import { SectionsContext } from '../../context/SectionsContext';
import { fetchCourseDesc } from '../../helpers/fetch';

interface CourseSearchBarProps {
  handleChange: Function;
}

const CourseSearchBar = ({handleChange} : CourseSearchBarProps) => {
  const [courseOptions, setCourseOptions] = useState([]);
  const {addCourseColor} = useContext(CourseColorContext)

  const handleUserSelectCourse = (event:any, option:any) => {
    //fetch

    //change state
    // setSections()

    //handleChange
    handleChange(option)
    addCourseColor(option.key)
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

export default CourseSearchBar