import { Course } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import { fetchParallel,fetchSections } from "../helpers/fetch";
import {
  filter_term_avail_waitlist,
  filter_duplicate_schedules,
} from "../helpers/filter";
import { solve } from "../helpers/solve_newengine";
import { groupSections } from "../helpers/groupby";
import { useState } from "react";
import { recommend } from "../helpers/recommend";

export interface Props {
  loc: Course[];
  set_recommended: Function;
  userTerm: string;
  setUserTerm: Function;
}

export const TriggerAPI = ({ loc, set_recommended, userTerm, setUserTerm}: Props) => {
  /** If true, show loading icon (pulse) on the generate schedule btn */
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Run")


  const [fetching, setFectching] = useState(false);
  const [generating, setGenerating] = useState(false);

  /**
   * update los with fetched data when a user clicks Generate Schedule btn
   */
  const handleGenerate = async () => {
    setLoading(true); // turns on loading icon
    // setFectching(true)


    setStatus("Fetching")
    console.log("fetching")
    // 1) Fetch sections data from API
    const sections_api = await fetchSections(loc.map((c) => c.sw));
    // Warning:fast, but too much load on the server
    // const sections_api = await fetchParallel(loc.map((c) => c.sw)); 

    // setFectching(false)
    // setGenerating(true)

    // TODO  1.1) take note of required sections (lecs, labs, tuts); are they all present?

    // 2) Prepare sections data for solve
    const prep = (sections: Section[]) => {
      const prep1 = filter_term_avail_waitlist(sections, userTerm);
      const prep2 = filter_duplicate_schedules(prep1);
      const prep3 = groupSections(prep2);
      return prep3;
    };
    const sections_prepped = prep(sections_api);

    setStatus("Solving")
    console.log("solving")
    // 3) Solve and return combinations
    const sections_solved = solve(sections_prepped);
    console.log("solved: ", sections_solved);

    setStatus("Recommending")
    console.log("recommending")
    // 4) Categorize the schedules
    const sections_recommended = recommend(sections_solved);
    console.log(sections_recommended)

    set_recommended(sections_recommended);  // pass recommended data for UI
    
    setStatus("Run")
    setLoading(false); // turns off loading icon
  };

  return (
    <div className="form-group my-4">
      <select
        onChange={(e) => setUserTerm(e.target.value)}
        className="form-control text-center"
        aria-label="Default select example"
      >
        <option value="1">Select Term</option>
        <option value="1">Term: 1</option>
        <option value="2">Term: 2</option>
      </select>
      <button
        className="form-control btn btn-large btn-primary"
        onClick={handleGenerate}
      >
        <span> {status} </span> 
        {loading && <i className="ml-2 fas fa-spinner fa-pulse" />}
      </button>
    </div>
  );
};

export default TriggerAPI;
