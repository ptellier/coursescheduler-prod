import { filterDuplicatedSchedules } from "../../helpers/filter";
import { solve } from "../../helpers/solve_newengine";
import { groupSections } from "../../helpers/groupby";
import { useContext, useState } from "react";
import { recommend } from "../../helpers/recommend";
import { LoadingButton } from '@mui/lab';
import { SectionsContext } from "../../context/SectionsContext";
import { UndoRedoContext } from "../../context/UndoRedoContext";
import { CircularProgress } from "@mui/material";

type GenerateProp = {
  fetchReady: boolean
}


export const Generate = ({fetchReady}: GenerateProp) => {
  const { sections, setSections, setRecommended } = useContext(SectionsContext);
  const { clearUndoRedo } = useContext(UndoRedoContext);
  const [loading, setLoading] = useState(false);

  /** Update 'los' state with fetched data when a user generates schedule
   * @setLoading (true): turns on loading icon
   * @setLoading (false): turns off loading icon
   */
  const handleGenerate = () => {
    const sectionsNoDuplicate = filterDuplicatedSchedules(sections);
    const sectionsGroup = groupSections(sectionsNoDuplicate);
    const sectionsSolved = solve(sectionsGroup);
    const sectionsRecommended = recommend(sectionsSolved);
    setSections(sectionsGroup.flatMap((section) => section));
    setRecommended(sectionsRecommended);
    clearUndoRedo()
  };

  const operateLoading = () => {
    setLoading((prev) => !prev);
  }

  return (
    <>
      <LoadingButton
        disabled={!fetchReady}
        className="w-100"
        variant="contained"
        color="primary"
        onClick={handleGenerate}
        loading={loading}
      >
        Run
      </LoadingButton>
    </>
  );
};

export default Generate;
