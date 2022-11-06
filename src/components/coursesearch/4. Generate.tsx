import { Course } from "../../data/DataDefinition/SearchWordDD";
import { filterDuplicatedSchedules} from "../../helpers/filter";
import { solve } from "../../helpers/solve_newengine";
import { groupSections } from "../../helpers/groupby";
import { useContext, useState } from "react";
import { recommend } from "../../helpers/recommend";
import LoadingButton from "@mui/lab/LoadingButton";
import { SectionsContext } from "../../context/SectionsContext";



export const Generate = () => {

  const {sections, setSections, setRecommended} = useContext(SectionsContext);
  const [loading, setLoading] = useState(false);

  /** Update 'los' state with fetched data when a user generates schedule
   * @sectionsNoDuplicate : ...
   * @sectionsGroup : ...
   * @sectionsSolved : ...
   * @sectionsRecommended : ...
   * @setLoading (true): turns on loading icon
   * @setLoading (false): turns off loading icon
   */
  const handleGenerate = async() => {
      setLoading(true);
      const sectionsNoDuplicate = filterDuplicatedSchedules(sections);
      const sectionsGroup = groupSections(sectionsNoDuplicate);
      const sectionsSolved = solve(sectionsGroup);
      const sectionsRecommended = recommend(sectionsSolved);

      setSections(sectionsGroup.flatMap((section) => section));
      setRecommended(sectionsRecommended);
      setLoading(false);
    }

  return (
      <div className="d-flex justify-content-center">
        <LoadingButton
          className="w-100"
          variant="contained"
          color="primary"
          onClick={handleGenerate}
          loading={loading}
        >
          Run
        </LoadingButton>
      </div>
    
  );
};

export default Generate;
