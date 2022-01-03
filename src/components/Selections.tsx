import React from "react";
import { SearchWord } from "../data/DataDefinition/SearchWordDD";

export interface Props {
  losw: SearchWord[];
  set_losw: Function
}

/**
 * Displays courses that a user has input so far
 * Note: Each key for <li> is randomized
 */

const Selections = ({ losw, set_losw }: Props) => {
  /**
   * removes "/" from sw for better presentation
   * @param {SearchWord} sw
   * @returns {string}
   */
  const formatSW = (sw: SearchWord): string => {
    return sw.replace(/\//g, "");
  };

  /**
   * removes search word from losw
   * @param sw
   */
  const removeSW = (sw: SearchWord) => {
    set_losw(losw.filter(sw_ => sw_ !== sw))
  };

  return (
    <div className="my-2">
      <h5>Selected Courses</h5>
      <ul>
        {losw.map((sw: SearchWord) => (
          <div className="d-flex my-2" key={Math.random().toString(36)}>
            <li>{formatSW(sw)}</li>
            <i
              className="fas fa-times btn btn-sm ml-auto"
              onClick={() => removeSW(sw)}
            ></i>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Selections;
