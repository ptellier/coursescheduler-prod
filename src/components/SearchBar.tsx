import { useState } from "react";
import { Course, SearchWord } from "../data/DataDefinition/SearchWordDD";
import AsyncSelect from "react-select/async";
import { fetchCourseDesc } from "../helpers/fetch";

export interface SearchBarProps {
  loc: Course[];
  set_loc: Function;
}

export const SearchBar = ({ loc, set_loc }: SearchBarProps) => {
  /** Keeps track of total credits limitation */
  const [total_credits, set_total_credits] = useState(0);

  /**
   * parse user's raw input of search word then fetch course description data
   * Note1: course description data includes course code, name, description, credits
   * Note2: course description data are options available for user to choose
   * Note3: course data are different from section data
   * Note4: fetches from Ben Cheung's API (so much more efficient than Liang's)
   * @param sw
   * @returns
   */
  const loadCourseOptions = async (sw: string) => {
    const data = await fetchCourseDesc(sw);
    const options = data.map((c: any) => ({
      sw: c.code,
      label: c.code + " - " + c.name,
      cred: c.cred,
      desc: c.desc,
    }));
    console.log(options);
    return options;
  };

  /**
   * push user selected course option to loc and keep track of
   * total credits. If exceed, raise warning.
   * Note: this function is triggered when user clicks the course option in popover box
   * @param option
   */
  const handleChange = (option: any) => {
    if (exceeded_cred_limit(option)) {
      alert("You exceeded maximum (18) credits per term. Remove some courses");
    } else if (selected_duplicate(option)) {
      alert(`You already selected ${option.sw}`);
    } else {
      selectCourseDesc(option.sw, option.cred, option.desc);
      set_total_credits(total_credits + option.cred);
    }
  };

  const exceeded_cred_limit = (option: any) => {
    return total_credits + option.cred >= 18;
  };
  const selected_duplicate = (option: any) => {
    return loc.some((c) => c.sw === formatSearchWord(option.sw));
  };


  /**
   * create course with search word, credit, description then accumulate it in loc
   * @param sw
   * @param cred
   * @param desc
   */
  const selectCourseDesc = (sw: SearchWord, cred: number, desc: string) => {
    const new_course: Course = {
      sw: formatSearchWord(sw),
      cred: cred,
      desc: desc,
    };
    set_loc([...loc, new_course]);
  };

  /**
   * removes space and inserts '/' at first digit of the str
   * resulting string will be inserted into url for fetch
   * @param {string} str
   * @returns {SearchWord}; i.e "CPSC 121"  -> "CPSC/121"
   */
  const formatSearchWord = (str: string): SearchWord => {
    const removedSpace = str.replace(/\s/g, "");
    const pos = removedSpace.search(/\d/);
    return removedSpace.substring(0, pos) + "/" + removedSpace.substring(pos);
  };

  return (
    <div className="d-flex">
      <AsyncSelect
        loadOptions={(sw: string) => loadCourseOptions(sw)}
        onChange={handleChange}
        placeholder={"Search Course ..."}
        className="w-100 text-left"
      />
    </div>
  );
};

export default SearchBar;
