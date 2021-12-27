import React from "react";
import { ListOfSearchWord, SearchWord } from "../data/DataDefinition/SearchWordDD";

export interface Props {
    userInput: String,
    setUserInput: Function,
    losw: ListOfSearchWord,
    set_losw: Function,
}

export const SearchBar = ({ userInput, setUserInput, losw, set_losw }: Props) => {
  /**
   * removes space and inserts '/' at first digit of the str
   * @param {String} str
   * @returns {SearchWord}; i.e "CPSC 121"  -> "CPSC/121"
   */
  const clearnSearchWord = (str: String): SearchWord => {
    const removedSpace = str.replace(/\s/g, "");
    const pos = removedSpace.search(/\d/);
    return removedSpace.substring(0, pos) + "/" + removedSpace.substring(pos);
  };

/**
 * add cleaned user input to losw
 */
  const handleAdd = (): void => {
    set_losw([...losw, clearnSearchWord(userInput)])
  }


  return (
    <div className="d-flex">
      <input
        className="form-control"
        type="text"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button
        className="btn btn-large btn-dark"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default SearchBar;
