import React from "react";
import { ListOfSearchWord, SearchWord } from "../data/DataDefinition/SearchWordDD";

export interface Props {
  losw: ListOfSearchWord;
}

/**
 * Displays courses that a user has input so far
 * Note: Each key for <li> is randomized
 */

const Selections = ({ losw }: Props) => {

  /**
   * removes "/" from sw for better presentation
   * @param {SearchWord} sw 
   * @returns {String}
   */
  const formatSW = (sw:SearchWord): String => {
    return sw.replace(/\//g, "") 
  }
  
  return (
    <div className="my-2">
      <h5>Selected Courses</h5>
        {losw.map((sw: SearchWord) =>
         <li key={Math.random().toString(36)}>{formatSW(sw)}</li>)}
    </div>
  );
};

export default Selections;
