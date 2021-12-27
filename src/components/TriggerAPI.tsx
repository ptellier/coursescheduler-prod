import {ListOfSearchWord,
} from "../data/DataDefinition/SearchWordDD";
import { ListOfSection } from "../data/DataDefinition/SectionDD";
import { fetchSection } from "../helpers/fetch";
import { solve } from "../helpers/solve";

export interface Props {
  losw: ListOfSearchWord;
  set_los: Function;
  userTerm: String;
  setUserTerm: Function;
}

export const TriggerAPI = ({ losw, set_los, userTerm, setUserTerm }: Props) => {
  /**
   * fetch and filter for available sections
   * @param {ListOfSearchWord} losw
   * @returns {ListOfSection}
   */
  const fetchSections = async (losw: ListOfSearchWord): Promise<ListOfSection> => {
    let acc: ListOfSection = [];
    for (let sw of losw) {
      const data = await fetchSection(sw);
      const sections_avail = filterAvailSections(data.sections);
      acc.push(...sections_avail);
    }
    return acc;
  };

  /** filter for sections that are not "full"
   * @param {ListOfSection} los
   * @returns {ListOfSection}
   */
  const filterAvailSections = (los: ListOfSection): ListOfSection => {
    return los.filter((c) => c.status !== "Full" && c.term === userTerm);
  };
 
  /**
   * update los with fetched data when 
   * a user clicks Generate Schedule btn
   */
  const handleGenerate = async() => {
    set_los(solve(await fetchSections(losw)));
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
