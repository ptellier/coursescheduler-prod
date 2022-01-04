import { ListOfSearchWord } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import { fetchSections } from "../helpers/fetch";
import {
  filter_term_avail_waitlist,
  filter_duplicate_schedules,
} from "../helpers/filter";
import { solve } from "../helpers/solve_newengine";
import { groupSections } from "../helpers/groupby";
import { useState } from "react";

export interface Props {
  losw: ListOfSearchWord;
  set_los: Function;
  userTerm: string;
  setUserTerm: Function;
}

export const TriggerAPI = ({ losw, set_los, userTerm, setUserTerm }: Props) => {
  /** If true, show loading icon (pulse) on the generate schedule btn */
  const [loading, setLoading] = useState(false);

  /**
   * update los with fetched data when
   * a user clicks Generate Schedule btn
   */
  const handleGenerate = async () => {
    setLoading(true); // turns on loading icon

    // 1) Fetch sections data from API
    const sections_api = await fetchSections(losw);

    // TODO: 1.1) if n > 300, then raise warning

    // 2) Prepare sections data for solve
    const prep = (sections: Section[]) => {
      const prep1 = filter_term_avail_waitlist(sections, userTerm);
      const prep2 = filter_duplicate_schedules(prep1);
      const prep3 = groupSections(prep2);
      return prep3;
    };
    const sections_prepped = prep(sections_api);    
    // console.log(sections_prepped);

    // 3) Solve and return combinations
    const sections_solved = solve(sections_prepped)
    console.log(sections_solved)

    // TODO: 3.1) Solve for optional courses

    // TODO: 4) Categorize the schedules

    // set_los(sections_solved);  // pass data for recommendation
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
        Generate Schedules
        {loading && <i className="ml-2 fas fa-spinner fa-pulse" />}
      </button>
    </div>
  );
};

export default TriggerAPI;

