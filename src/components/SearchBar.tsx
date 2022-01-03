import React from "react";
import { SearchWord } from "../data/DataDefinition/SearchWordDD";

export interface Props {
  userInput: String;
  setUserInput: Function;
  losw: SearchWord[];
  set_losw: Function;
}

export const SearchBar = ({
  userInput,
  setUserInput,
  losw,
  set_losw,
}: Props) => {
  /**
   * add formatted user input search wrod into losw then clear the search box
   */
  const handleAdd = async(e: React.MouseEvent) => {
     // Accumulate user's searched courses so far
     set_losw([...losw, formatSearchWord(userInput)]);

     e.preventDefault();
    // DEPRECATED: fetch course simultaneously
    // This method is not huge improvement
    //  const sw_formatted = formatSearchWord(userInput)
    //  const data = await fetchSection(sw_formatted)
    //  set_all_sections([...all_sections, ...data.sections])
  };

  /**
   * removes space and inserts '/' at first digit of the str
   * resulting string will be inserted into url for fetch
   * @param {String} str
   * @returns {SearchWord}; i.e "CPSC 121"  -> "CPSC/121"
   */
  const formatSearchWord = (str: String): SearchWord => {
    const removedSpace = str.replace(/\s/g, "");
    const pos = removedSpace.search(/\d/);
    return removedSpace.substring(0, pos) + "/" + removedSpace.substring(pos);
  };

  return (
    <form className="d-flex">
      <input
        className="form-control"
        type="text"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button className="btn btn-large btn-dark" onClick={(e) => handleAdd(e)}>
        Add
      </button>
    </form>
  );
};

export default SearchBar;
