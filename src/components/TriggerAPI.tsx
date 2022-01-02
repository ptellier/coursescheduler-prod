import { ListOfSearchWord } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import { fetchSections } from "../helpers/fetch";
import { filter_term_avail_waitlist, filter_duplicate_schedules } from "../helpers/filter";
import { solve } from "../helpers/solve_newengine";
import { groupSections } from "../helpers/groupby";

export interface Props {
  losw: ListOfSearchWord;
  set_los: Function;
  userTerm: string;
  setUserTerm: Function;
}

export const TriggerAPI = ({ losw, set_los, userTerm, setUserTerm }: Props) => {
  /**
   * update los with fetched data when 
   * a user clicks Generate Schedule btn
   */
  const handleGenerate = async() => {

    // 1) Fetch sections data from API
    const sections_api = await fetchSections(losw)

    // 2) Prepare sections data for solve
    const prep = (sections: Section[]) => {
      const prep1 = filter_term_avail_waitlist(sections, userTerm)
      const prep2 = filter_duplicate_schedules(prep1)
      const prep3 = groupSections(prep2)
      return prep3
    }
    const sections_prepped = prep(sections_api)
    
    // 3) Solve and return combinations
    const sections_solved = solve(sections_prepped)

    console.log(sections_solved)
    // set_los(sections_solved);

    // 4) 
  };

  return (
    <div className="form-group">
      <label htmlFor="">Select Term</label>
      <select
        onChange={(e) => setUserTerm(e.target.value)}
        className="form-control"
        aria-label="Default select example"
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <button className="form-control btn btn-large btn-primary" onClick={handleGenerate}>
        Generate schedules
      </button>
    </div>
  );
};

export default TriggerAPI;
