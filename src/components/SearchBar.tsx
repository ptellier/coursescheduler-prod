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
   * add formatted user input search wrod into losw
   */
   const handleAdd = (): void => {
    set_losw([...losw, formatSearchWord(userInput)])
  }

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
